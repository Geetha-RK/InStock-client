import "./WarehouseFormPage.scss";
import { useNavigate } from "../../hooks/useNavigate";
import MainCard from "../../components/MainCard/MainCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

const initialValues = {
	"warehouse_name": "",
	address: "",
	city: "",
	country: "",
	"contact_name": "",
	"contact_position": "",
	"contact_phone": "",
	"contact_email": ""
};

function WarehouseFormPage() {
	const block = "warehouse-form-page"; // bem block name

	const navigate = useNavigate();
	const { warehouseID } = useParams(); //Get the warehouse if from URL for edit route

	const [values, setValues] = useState(initialValues);
	const [isEditMode, setIsEditMode] = useState(false); //Track if it's an edit or add mode

	useEffect(() => {
		if (warehouseID) {
		  setIsEditMode(true); // It's in edit mode if warehouseID exists
		  fetchWarehouseDetails(warehouseID);
		}
	  }, [warehouseID]);
	
	  // Function to fetch warehouse details when editing
	  async function fetchWarehouseDetails(id) {
		try {
		  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/warehouses/${id}`);
		  console.log("response:",response);
		  setValues(response.data); // Update the form with the fetched data
		} catch (error) {
			if (error.response) {
				// Server responded with a status code outside the 2xx range
				const status = error.response.status;
		
				if (status === 404) {
					toast.error("Warehouse not found. Please check the warehouse ID.");
				} else if (status === 400) {
					toast.error("Invalid input. Please check the data you've entered.");
				} else if (status === 500) {
					toast.error("Internal server error. Please try again later.");
				} else {
					toast.error(`An error occurred: ${error.response.data.message || "Unknown error"}`);
				}
			} else if (error.request) {
				// Request was made but no response was received
				toast.error("No response from the server. Please check your network connection.");
			} else {
				// Something happened in setting up the request that triggered an error
				toast.error(`Request error: ${error.message}`);
			}
		
		}
	  }

	/** Updates form state when user interacts with fields. */
	function handleInputChange(ev) {
		const { name, value } = ev.target;
		setValues({ ...values, [name]: value });
	}

	/** Submits form data to API */
	async function handleSubmit(ev) {
		ev.preventDefault();

		try {
			if (isEditMode) {
				// PUT request for editing an existing warehouse
				const request = axios.put(`${import.meta.env.VITE_API_URL}/api/warehouses/${warehouseID}`, values);
				toast.promise(request, {
				  pending: "Updating warehouse...",
				  success: "Warehouse updated!",
				  error: "Failed to update warehouse."
				});
			  } else {
				const request = axios.post(`${import.meta.env.VITE_API_URL}/api/warehouses`, values);
				toast.promise(request, {
					pending: "Submitting form...",
					success: "Warehouse created!",
					error: "Failed to create warehouse."
				});
			}
			await request;
			setTimeout(() => navigate("/warehouses"), 5000);
		} catch (error) {
			// Improved error handling based on backend response
			if (error.response) {
				// Server responded with a status code outside the 2xx range
				const status = error.response.status;
		
				if (status === 404) {
					toast.error("Warehouse not found. Please check the warehouse ID.");
				} else if (status === 400) {
					toast.error("Invalid input. Please check the data you've entered.");
				} else if (status === 500) {
					toast.error("Internal server error. Please try again later.");
				} else {
					toast.error(`An error occurred: ${error.response.data.message || "Unknown error"}`);
				}
			} else if (error.request) {
				// Request was made but no response was received
				toast.error("No response from the server. Please check your network connection.");
			} else {
				// Something happened in setting up the request that triggered an error
				toast.error(`Request error: ${error.message}`);
			}
		}
	}

	return (<MainCard className={block}>
		<PageHeader hasBackButton={true}>{isEditMode ? "Edit Warehouse" : "Add New Warehouse"}</PageHeader>
		<form className={`${block}__form`} onSubmit={handleSubmit}>
			<fieldset className={`${block}__form-section`}>
				<h2 className={`${block}__form-header`}>Warehouse Details</h2>

				<Input
					type="text"
					label="Warehouse Name"
					placeholder="Warehouse Name"
					name="warehouse_name"
					value={values["warehouse_name"]}
					onChange={handleInputChange}
					required />

				<Input
					type="text"
					label="Street Address"
					placeholder="Street Address"
					name="address"
					value={values["address"]}
					onChange={handleInputChange}
					required />

				<Input
					type="text"
					label="City"
					placeholder="City"
					name="city"
					value={values["city"]}
					onChange={handleInputChange}
					required />

				<Input
					type="text"
					label="Country"
					placeholder="Country"
					name="country"
					value={values["country"]}
					onChange={handleInputChange}
					required />
			</fieldset>

			<fieldset className={`${block}__form-section`}>
				<h2 className={`${block}__form-header`}>Contact Details</h2>

				<Input
					type="text"
					label="Contact Name"
					placeholder="Contact Name"
					name="contact_name"
					value={values["contact_name"]}
					onChange={handleInputChange}
					required />

				<Input
					type="text"
					label="Position"
					placeholder="Position"
					name="contact_position"
					value={values["contact_position"]}
					onChange={handleInputChange}
					required />

				<Input
					type="tel"
					label="Phone Number"
					placeholder="+X (XXX) XXX-XXXX"
					name="contact_phone"
					value={values["contact_phone"]}
					onChange={handleInputChange}
					pattern="^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$"
					description="+X (XXX) XXX-XXXX"
					required />

				<Input
					type="email"
					label="Email"
					placeholder="Email"
					name="contact_email"
					value={values["contact_email"]}
					onChange={handleInputChange}
					required />

			</fieldset>

			<div className={`${block}__form-buttons`}>
				<Button to="/warehouses" variant="secondary">Cancel</Button>
				<Button> {isEditMode ? "Save Changes" : "+ Add Warehouse"}</Button>
			</div>
		</form>
		<span aria-live="assertive" aria-atomic="true" aria-relevant="additions text">
			<ToastContainer/>
		</span>
	</MainCard>);
}

export default WarehouseFormPage;