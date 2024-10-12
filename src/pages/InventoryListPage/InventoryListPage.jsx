import InventoryList from "../../components/InventoryList/InventoryList.jsx";
import "./InventoryListPage.scss";
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

function InventoryListPage() {
	const [inventoriesList, setInventoriesList] = useState([]);
    const [warehouseList, setWarehouseList] = useState([]);
    const [warehouseMap, setWarehouseMap] = useState({});
	const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        const url = import.meta.env.VITE_API_URL;
        const getInventoriesList = async () => {
            try {
                const {data} = await axios.get(`${url}/api/inventories/`);
                setInventoriesList(data);
                setIsLoading(false);
            } catch (error){
                console.error(error);
                setIsError(true);
                console.log(`Could not fetch inventories list ${error}`)
            }
        };
        const getWarehouseList = async () => {
            try {
                const response = await axios.get(`${url}/api/warehouses/`);
                setWarehouseList(response.data);

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
    }, []);

	useEffect(() => {
        fetchData();
    }, [fetchData]);

    if(isError) {
        return <h1>Sorry, there was some error in fetching the list</h1>
    }

    if(isLoading) {
        return <h1>Loading list...</h1>
    }

	return (
		<InventoryList data={inventoriesList} warehouseMap={warehouseMap}></InventoryList>
	);
}

export default InventoryListPage;