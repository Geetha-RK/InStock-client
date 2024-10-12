import "./WarehousePage.scss";
import MainCard from "../../components/MainCard/MainCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import InventoryList from "../../components/InventoryList/InventoryList";
import Modal from "../../components/Modal/Modal";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, Link } from "react-router-dom";
import editicon from "../../assets/icons/edit-white-24px.svg";
import { handleFetchError } from "../../utils/error_handling";

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
  const [values, setValues] = useState(initialValues);
  const [inventoryList,setInventoryList] = useState([]);
  const [warehouseMap,setWarehouseMap] = useState({});
  const [isLoading,setIsLoading] = useState(true);
  const [isError,setIsError] = useState(false);

	const [modalOpen, setModalOpen] = useState(false),
        [modalItem, setModalItem] = useState(null);

  // Function to fetch warehouse
  const fetchWarehouseDetails = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/warehouses/${id}`
      );
      setValues(response.data); // Update the table with fetched warehouse data
      setWarehouseMap({ [response.data.id]: response.data.warehouse_name });
    } catch (error) {
      handleFetchError(error, "Warehouse"); // Handle any errors
    }
  }, []);

  // Function to fetch inventory for the warehouse
  const fetchWarehouseInventory = useCallback(async (id) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/warehouses/${id}/inventories`
        );
        setInventoryList(response.data);
        setIsLoading(false);
    } catch (error) {
        console.error(error);
        setIsError(true);
        handleFetchError(error, "Inventory");
    }
  }, []);

  useEffect(() => {
    if (warehouseID) {
      fetchWarehouseDetails(warehouseID);
      fetchWarehouseInventory(warehouseID);
    }
  }, [warehouseID, fetchWarehouseDetails, fetchWarehouseInventory]);

	function showDeleteModal(item) {
		setModalItem(item);
		setModalOpen(true);
	}

  async function deleteInventoryItem(id) {
    if (!id) { return; }
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/inventories/${id}`);
      toast.success("Item deleted.");
      fetchWarehouseInventory(warehouseID);
      } catch (error) {
        console.error(error);
        handleFetchError(error, "Item");
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
                <InventoryList data={inventoryList} warehouseMap={warehouseMap} showFlag={false} deleteItemFn={showDeleteModal} />
            )}
      <Modal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        title={`Delete ${modalItem?.item_name} inventory item?`}
        content={`Please confirm that you'd like to delete ${
            modalItem?.item_name
        } from the inventory list. You won't be able to undo this action.`}
        onDelete={async () => await deleteInventoryItem(modalItem?.id)} />
      <ToastContainer />
	</MainCard>
  );
}

export default WarehousePage;
