import "./WarehouseListPage.scss";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import Modal from "../../components/Modal/Modal";
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WarehouseListPage() {
	const [warehouseList, setWarehouseList] = useState([]);
	const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
	const url = import.meta.env.VITE_API_URL;

	const [modalOpen, setModalOpen] = useState(false),
        [modalItem, setModalItem] = useState(null);

	// Track if the component is mounted or not, so we know if we can update
	// state after asynchronous operations or not.
	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => isMounted.current = false;
	}, []);

    const getWarehouseList = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const {data} = await axios.get(`${url}/api/warehouses/`);
            if (!isMounted.current) { return; }
            setWarehouseList(data);
            setIsLoading(false);
        } catch (error){
            console.log(`Could not fetch warehouse list ${error}`);
            if (!isMounted.current) { return; }
            setIsError(true);
        }
    }, [url]);

	useEffect(() => {
        getWarehouseList();
    }, [getWarehouseList]);

	function showDeleteModal(warehouse) {
		setModalItem(warehouse);
		setModalOpen(true);
	}

	async function deleteWarehouse(id) {
		if (!id) { return; }
		try {
			await axios.delete(
				`${import.meta.env.VITE_API_URL}/api/warehouses/${id}`
			);
			if (!isMounted.current) { return; }
			toast.success("Warehouse deleted.");
			getWarehouseList();
		} catch (error) {
            console.error(error);
			if (!isMounted.current) { return; }
			let errorMessage;
			if (error.response) {
				if (error.response.status === 404) {
					errorMessage = "Warehouse not found.";
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

    if(isError) {
        return <h1>Sorry, there was some error in fetching the list</h1>
    }

    if(isLoading) {
        return <h1>Loading list...</h1>
    }

	return (<>
		<WarehouseList data={warehouseList} deleteItemFn={showDeleteModal}/>
        <Modal
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            title={`Delete ${modalItem?.warehouse_name} warehouse?`}
            content={`Please confirm that you'd like to delete the ${
                modalItem?.warehouse_name
            } from the list of warehouses. You won't be able to undo this action.`}
            onDelete={async () => await deleteWarehouse(modalItem?.id)} />
        <ToastContainer/>
	</>);
}

export default WarehouseListPage;