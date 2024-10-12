import InventoryList from "../../components/InventoryList/InventoryList.jsx";
import "./InventoryListPage.scss";
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import Modal from "../../components/Modal/Modal.jsx";
import "react-toastify/dist/ReactToastify.css";

function InventoryListPage() {
	const [inventoriesList, setInventoriesList] = useState([]);
    const [warehouseMap, setWarehouseMap] = useState({});
	const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const url = import.meta.env.VITE_API_URL;

	const [modalOpen, setModalOpen] = useState(false),
        [modalItem, setModalItem] = useState(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);
        const getInventoriesList = async () => {
            try {
                const {data} = await axios.get(`${url}/api/inventories/`);
                setInventoriesList(data);
            } catch (error){
                console.error(error);
                setIsError(true);
                console.log(`Could not fetch inventories list ${error}`)
            }
        };
        const getWarehouseList = async () => {
            try {
                const response = await axios.get(`${url}/api/warehouses/`);

                const map = {};
                response.data.forEach(warehouse => {
                    map[warehouse.id] = warehouse.warehouse_name;
                });
                setWarehouseMap(map);
            } catch (error) {
                console.error(error);
                console.error("Error fetching warehouses name:", error);
            }
        };
        await Promise.all([getInventoriesList(), getWarehouseList()]);
        setIsLoading(false);
    }, [url]);

	useEffect(() => {
        fetchData();
    }, [fetchData]);

	function showDeleteModal(item) {
		setModalItem(item);
		setModalOpen(true);
	}

    async function deleteInventoryItem(id) {
        if (!id) { return; }
        try {
            await axios.delete(`${url}/api/inventories/${id}`);
            toast.success("Item deleted.");
            fetchData();
        } catch (error) {
            console.error(error);
			let errorMessage;
			if (error.response) {
				if (error.response.status === 404) {
					errorMessage = "Item not found.";
				} else {
					errorMessage =
					`Error: ${error.response.data.message || "Unknown error"}`;
				}
			} else if (error.request) {
				errorMessage =
					"No response from the server. Please check your network connection.";
			} else {
				errorMessage = `Error: ${error.message}`;
			}
			toast.error(errorMessage);
        }
    }

	return (<>
        {isError && <h1>Sorry, there was some error in fetching the list</h1>}

        {isLoading && !isError && <h1>Loading list...</h1>}

        {!isLoading && !isError
        && <InventoryList data={inventoriesList} warehouseMap={warehouseMap} showFlag={true} deleteItemFn={showDeleteModal}/>}

        <Modal
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            title={`Delete ${modalItem?.item_name} inventory item?`}
            content={`Please confirm that you'd like to delete ${
                modalItem?.item_name
            } from the inventory list. You won't be able to undo this action.`}
            onDelete={async () => await deleteInventoryItem(modalItem?.id)} />
        <ToastContainer/>
	</>);
}

export default InventoryListPage;