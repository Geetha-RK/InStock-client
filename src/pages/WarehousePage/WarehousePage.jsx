import "./WarehousePage.scss";
import MainCard from "../../components/MainCard/MainCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    if (warehouseID) {
      fetchWarehouseDetails(warehouseID);
    }
  }, [warehouseID]);

  // Function to fetch warehouse
  async function fetchWarehouseDetails(id) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/warehouses/${id}`
      );
      //   console.log("response:", response);
      setValues(response.data); // Update the table with fetched warehouse data
    } catch (error) {
      handleFetchError(error); // Handle any errors
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

  const handleEditClick = () => {
	navigate(`/warehouses/edit/${values.id}`); // Adjust the path as needed
	};

  return (
    <MainCard className={block}>
		<div className={`${block}__head`}>
			<PageHeader hasBackButton={true}>
				{values.warehouse_name}
			</PageHeader>
			<div className={`${block}__edit-box`} onClick={handleEditClick}>
				<img className={`${block}__edit-icon`} src={editicon} alt="edit-icon"/>
			</div>
		  </div>
	</MainCard>
  );
}

export default WarehousePage;
