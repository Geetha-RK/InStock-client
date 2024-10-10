import WarehouseList from "../../components/WarehouseList/WarehouseList";
import "./WarehouseListPage.scss";
import { useEffect, useState } from 'react'
import axios from 'axios';

function WarehouseListPage() {
	const [warehouseList, setWarehouseList] = useState([]);
	const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
	const url = import.meta.env.VITE_API_URL;

	useEffect(() => {
        const getWarehouseList = async () => {
            try {
                const {data} = await axios.get(`${url}/api/warehouses/`);
                setWarehouseList(data);
                setIsLoading(false);
            } catch (error){
                setIsError(true);
                console.log(`Could not fetch warehouse list ${error}`)
            }
            }
            getWarehouseList(); 
    }, [])

    if(isError) {
        return <h1>Sorry, there was some error in fetching the list</h1>
    }

    if(isLoading) {
        return <h1>Loading list...</h1>
    }

	return (
		<WarehouseList data={warehouseList}></WarehouseList>
	);
}

export default WarehouseListPage;