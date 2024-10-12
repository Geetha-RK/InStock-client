import "./WarehousePage.scss";
import MainCard from "../../components/MainCard/MainCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import InventoryList from "../../components/InventoryList/InventoryList";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, Link } from "react-router-dom";
import editicon from "../../assets/icons/edit-white-24px.svg";
import { useNavigate } from "../../hooks/useNavigate";

const initialValues = {
	warehouse_name: "",
	address: "",
	city: "",
	country: "",
	contact_name: "",
	contact_position: "",
	contact_phone: "",
	contact_email: "",
  };

function WarehousePage() {
  const block = "warehouse-details-page";
  const { warehouseID } = useParams(); //Get the warehouse id
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [inventoryList,setInventoryList] = useState([]);
  const [warehouseMap,setWarehouseMap] = useState({});
  const [isLoading,setIsLoading] = useState(true);
  const [isError,setIsError] = useState(false);

  useEffect(() => {
    if (warehouseID) {
      fetchWarehouseDetails(warehouseID);
      fetchWarehouseInventory(warehouseID);
    }
  }, [warehouseID]);

  // Function to fetch warehouse
  async function fetchWarehouseDetails(id) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/warehouses/${id}`
      );
      setValues(response.data); // Update the table with fetched warehouse data
      setWarehouseMap({ [response.data.id]: response.data.warehouse_name });
    } catch (error) {
      handleFetchError(error); // Handle any errors
    }
  }

  // Function to fetch inventory for the warehouse
  async function fetchWarehouseInventory(id) {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/warehouses/${id}/inventories`
        );
        console.log("Inventories for the warehouse:",response.data);
        setInventoryList(response.data); 
        setIsLoading(false); 
    } catch (error) {
        console.error(error);
        setIsError(true); 
        handleFetchError(error);
    }
}

  // Improved error handling
  function handleFetchError(error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        toast.error("Warehouse not found. Please check the warehouse ID.");
      } else if (status === 400) {
        toast.error("Invalid input. Please check the data you've entered.");
      } else {
        toast.error(
          `An error occurred: ${error.response.data.message || "Unknown error"}`
        );
      }
    } else if (error.request) {
      toast.error(
        "No response from the server. Please check your network connection."
      );
    } else {
      toast.error(`Request error: ${error.message}`);
    }
  }

  return (
    <MainCard className={block}>
		<div className={`${block}__head`}>
			<PageHeader hasBackButton={true}>
				{values.warehouse_name}
			</PageHeader>
			<Link to={`/warehouses/edit/${values.id}`} className={`${block}__edit-box`}>
				<img className={`${block}__edit-icon`} src={editicon} alt="edit item"/>
				<span className={`${block}__edit-text`}>Edit</span>
        </Link>
		  </div>
		  <div className={`${block}__details`}>
				<div className={`${block}__container`}>
					<label className={`${block}__label`}>WAREHOUSE ADDRESS:</label>
					<div  className={`${block}__address-container`}>
						<p className={`${block}__values`}>{values.address},</p> 
						<p className={`${block}__values`}>{values.city}, {values.country}</p>
					</div>
				</div>
				<div className={`${block}__contact-container`}>
					<div >
						<label className={`${block}__label`}>CONTACT NAME:</label>
						<p className={`${block}__values`}>{values.contact_name}</p>
						<p className={`${block}__values`}>{values.contact_position}</p>
					</div>
					<div>
						<label className={`${block}__label`}>CONTACT INFORMATION:</label>
						<p className={`${block}__values`}>{values.contact_phone}</p>
						<p className={`${block}__values`}>{values.contact_email}</p>
					</div>
				</div>
		  </div>
      {/* Render Inventory List for the specific warehouse */}
      {isLoading ? (
                <p>Loading inventory...</p>
            ) : isError ? (
                <p>Sorry, there was an error fetching the inventory list.</p>
            ) : (
                <InventoryList data={inventoryList} warehouseMap={warehouseMap} showFlag={false} />
            )}
      <ToastContainer />
	</MainCard>
  );
}

export default WarehousePage;
