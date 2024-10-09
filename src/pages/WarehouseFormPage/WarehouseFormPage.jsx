import "./WarehouseFormPage.scss";
import { useNavigate } from "../../hooks/useNavigate";
import MainCard from "../../components/MainCard/MainCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

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

function WarehouseFormPage() {
  const block = "warehouse-form-page"; // bem block name

  const navigate = useNavigate();
  const { warehouseID } = useParams(); //Get the warehouse if from URL for edit route

  const [values, setValues] = useState(initialValues);
  const [isEditMode, setIsEditMode] = useState(false); //Track if it's an edit or add mode
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (warehouseID) {
      setIsEditMode(true); // It's in edit mode if warehouseID exists
      fetchWarehouseDetails(warehouseID);
    } else {
    setIsLoading(false); // If not editing, set loading to false immediately
  }
  }, [warehouseID]);

  // Function to fetch warehouse details when editing
  async function fetchWarehouseDetails(id) {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/warehouses/${id}`
      );
      setValues(response.data); // Update the form with the fetched data
    } catch (error) {
      handleFetchError(error); // Handle any errors
    } finally {
      setIsLoading(false); // Set loading to false after fetch attempt
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
  /** Updates form state when user interacts with fields. */
  function handleInputChange(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }

  /** Submits form data to API */
  async function handleSubmit(ev) {
    ev.preventDefault();

    try {
      let request;
      if (isEditMode) {
        // PUT request for editing an existing warehouse
        request = axios.put(
          `${import.meta.env.VITE_API_URL}/api/warehouses/${warehouseID}`,
          values
        );
        toast.promise(request, {
          pending: "Updating warehouse...",
          success: "Warehouse updated!",
          error: "Failed to update warehouse.",
        });
      } else {
        request = axios.post(
          `${import.meta.env.VITE_API_URL}/api/warehouses`,
          values
        );
        toast.promise(request, {
          pending: "Submitting form...",
          success: "Warehouse created!",
          error: "Failed to create warehouse.",
        });
      }
      await request;
      setTimeout(() => navigate("/warehouses"), 5000);
    } catch (error) {
    handleFetchError(error);
    }
  }

  return (
    <MainCard className={block}>
      <PageHeader hasBackButton={true}>
        {isEditMode ? "Edit Warehouse" : "Add New Warehouse"}
      </PageHeader>
      <form className={`${block}__form`} onSubmit={handleSubmit} aria-busy={isLoading && isEditMode}>
        <fieldset className={`${block}__form-section`} disabled={isLoading && isEditMode}>
          <h2 className={`${block}__form-header`}>Warehouse Details</h2>

          <Input
            type="text"
            label="Warehouse Name"
            placeholder="Warehouse Name"
            name="warehouse_name"
            value={values["warehouse_name"]}
            onChange={handleInputChange}
            required
          />

          <Input
            type="text"
            label="Street Address"
            placeholder="Street Address"
            name="address"
            value={values["address"]}
            onChange={handleInputChange}
            required
          />

          <Input
            type="text"
            label="City"
            placeholder="City"
            name="city"
            value={values["city"]}
            onChange={handleInputChange}
            required
          />

          <Input
            type="text"
            label="Country"
            placeholder="Country"
            name="country"
            value={values["country"]}
            onChange={handleInputChange}
            required
          />
        </fieldset>

        <fieldset className={`${block}__form-section`} disabled={isLoading && isEditMode}>
          <h2 className={`${block}__form-header`}>Contact Details</h2>

          <Input
            type="text"
            label="Contact Name"
            placeholder="Contact Name"
            name="contact_name"
            value={values["contact_name"]}
            onChange={handleInputChange}
            required
          />

          <Input
            type="text"
            label="Position"
            placeholder="Position"
            name="contact_position"
            value={values["contact_position"]}
            onChange={handleInputChange}
            required
          />

          <Input
            type="tel"
            label="Phone Number"
            placeholder="+X (XXX) XXX-XXXX"
            name="contact_phone"
            value={values["contact_phone"]}
            onChange={handleInputChange}
            pattern="^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$"
            description="+X (XXX) XXX-XXXX"
            required
          />

          <Input
            type="email"
            label="Email"
            placeholder="Email"
            name="contact_email"
            value={values["contact_email"]}
            onChange={handleInputChange}
            required
          />
        </fieldset>

        <div className={`${block}__form-buttons`}>
          <Button to="/warehouses" variant="secondary">
            Cancel
          </Button>
          <Button disabled={isLoading && isEditMode}> {isEditMode ? "Save" : "+ Add Warehouse"}</Button>
        </div>
      </form>
      <span
        aria-live="assertive"
        aria-atomic="true"
        aria-relevant="additions text"
      >
        <ToastContainer />
      </span>
    </MainCard>
  );
}

export default WarehouseFormPage;
