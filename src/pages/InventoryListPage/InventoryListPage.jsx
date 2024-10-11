import InventoryList from "../../components/InventoryList/InventoryList.jsx";
import "./InventoryListPage.scss";
import { useEffect, useState } from 'react'
import axios from 'axios';

function InventoryListPage() {
	const [inventoriesList, setInventoriesList] = useState([]);
	const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
	const url = import.meta.env.VITE_API_URL;

	useEffect(() => {
        const getInventoriesList = async () => {
            try {
                const {data} = await axios.get(`${url}/api/inventories/`);
				console.log(data);
                setInventoriesList(data);
                setIsLoading(false);
            } catch (error){
				console.error(error);
                setIsError(true);
                console.log(`Could not fetch inventories list ${error}`)
            }
            }
            getInventoriesList(); 
    }, [])

    if(isError) {
        return <h1>Sorry, there was some error in fetching the list</h1>
    }

    if(isLoading) {
        return <h1>Loading list...</h1>
    }

	return (
		<InventoryList data={inventoriesList}></InventoryList>
	);
}

export default InventoryListPage;