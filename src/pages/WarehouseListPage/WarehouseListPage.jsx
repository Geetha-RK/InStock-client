import "./WarehouseListPage.scss";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import Modal from "../../components/Modal/Modal";
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

function WarehouseListPage() {
	const [warehouseList, setWarehouseList] = useState([]);
	const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
	const url = import.meta.env.VITE_API_URL;

	const [modalOpen, setModalOpen] = useState(false),
        [modalItem, setModalItem] = useState(null);

    const getWarehouseList = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const {data} = await axios.get(`${url}/api/warehouses/`);
            setWarehouseList(data);
            setIsLoading(false);
        } catch (error){
            console.log(`Could not fetch warehouse list ${error}`);
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
			getWarehouseList();
		} catch (error) {
            console.error(error);
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