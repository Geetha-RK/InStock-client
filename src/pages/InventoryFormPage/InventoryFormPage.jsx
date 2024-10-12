import MainCard from "../../components/MainCard/MainCard";
import "./InventoryFormPage.scss";
import { useNavigate } from "../../hooks/useNavigate";
import { useGoBack } from "../../hooks/useGoBack";
import PageHeader from "../../components/PageHeader/PageHeader";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RadioGroup from "../../components/RadioGroup/RadioGroup";
import RadioButton from "../../components/RadioButton/RadioButton";
import Dropdown from "../../components/Dropdown/Dropdown";

const initialValues = {
	item_name: "",
	description: "",
	category: "",
	status: "",
	warehouse: "",
  };

function InventoryFormPage() {

	const block ='inventory-form-page';
	const url = import.meta.env.VITE_API_URL;

	const navigate = useNavigate();
    const navigateBack = useGoBack("/inventory");
	const [isEditMode, setIsEditMode] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [values, setValues] = useState(initialValues);
	// const [status, setStatus] = useState('');
	const [warehouseList, setWarehouseList] = useState([]);
	const [categories, setCategories] = useState([]);
	const [isError, setIsError] = useState(false);


	const handleInputChange = (event) => {
		const {name, value} = event.target;	
		setValues({...values, [name]: value});
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		let toastId, successMessage;
		console.log(event.target.value);
		console.log(values);

		try {
			toastId = toast.loading("Submitting new inventory...");
			await axios.post(`${url}/api/inventories`, values);
			successMessage = "Inventory created!";
		} catch (error) {
			console.log(error);
		}
	}


	const getWarehouseList = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const {data} = await axios.get(`${url}/api/warehouses/`);
            // if (!isMounted.current) { return; }
            setWarehouseList(data);
            setIsLoading(false);
        } catch (error){
            console.log(`Could not fetch warehouse list ${error}`);
            // if (!isMounted.current) { return; }
            setIsError(true);
        }
    }, []);

	useEffect(() => {
        getWarehouseList();
    }, [getWarehouseList]);

	useEffect(() => {
        const getInventoriesList = async () => {
            try {
                const {data} = await axios.get(`${url}/api/inventories/category`);
				console.log(data);
                setCategories(data);
                setIsLoading(false);
            } catch (error){
				console.error(error);
                setIsError(true);
                console.log(`Could not fetch inventories list ${error}`)
            }
            }
            getInventoriesList(); 
    }, [])


	return (
		<MainCard className={block}>
			<PageHeader hasBackButton={true}>
        		{isEditMode ? "Edit Inventory" : "Add New Inventory"}
      		</PageHeader>
			<form className={`${block}__form`} onSubmit={handleSubmit} >
				<fieldset className={`${block}__form-section`}>
					<h2 className={`${block}__form-title`}>Item Details</h2>

					<Input 
						type='text' 
						label='Item Name' 
						placeholder='Item Name' 
						className={`${block}__form-item-name`}
						name='item_name' 
						value={values['item_name']} 
						onChange={handleInputChange}
						required
					/>

					<Input 
						type='textarea' 
						label='Description' 
						placeholder='Please enter a brief item description...' 
						className={`${block}__form-description`}
						name='description' 
						value={values['description']} 
						onChange={handleInputChange}
						required
					/>

					<Dropdown label='Category' name='category' value={values['category']} onChange={handleInputChange} required>
						{categories.map((item) => {
							return (
								<option key={item.id}>{item.category}</option>
							)
						})}
					</Dropdown>
				</fieldset>
				<fieldset className={`${block}__form-section`}>
					<h2 className={`${block}__form-title`}>Item Availability</h2>

					<RadioGroup name='status' label='Status' value={values['status']} onChange={handleInputChange} required>
						<RadioButton value={values['in-stock']} >In Stock</RadioButton>
						<RadioButton value={values['out-of-stock']}>Out of stock</RadioButton>
					</RadioGroup>
					
					<Input 
						type='text' 
						label='Quantity' 
						placeholder='Please enter quantity' 
						className={`${block}__form-quantity`}
						name='quantity' 
						value={values['quantity']} 
						onChange={handleInputChange}
						required
					/>

					<Dropdown label='Warehouse' name='warehouse' value={values['warehouse']} onChange={handleInputChange} required>
					{
						warehouseList.map((item) => {
							return (
									<option key={item.id}>{item.warehouse_name}</option>
							)
						})

					}
					</Dropdown>
				</fieldset>

				<div className={`${block}__form-buttons`}>
          			<Button onClick={navigateBack} variant="secondary">Cancel</Button>
          			<Button disabled={isLoading && isEditMode}> {isEditMode ? "Save" : "+ Add Item"}</Button>
        		</div>

			</form>
			<ToastContainer />
		</MainCard>
	);
}

export default InventoryFormPage;