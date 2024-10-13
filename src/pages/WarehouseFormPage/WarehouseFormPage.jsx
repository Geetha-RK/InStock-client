import "./WarehouseFormPage.scss";
import { useNavigate } from "../../hooks/useNavigate";
import { useGoBack } from "../../hooks/useGoBack";
import MainCard from "../../components/MainCard/MainCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
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

function WarehouseFormPage() {
  const block = "warehouse-form-page"; // bem block name

  const navigate = useNavigate();
  const navigateBack = useGoBack("/warehouses");
  const { warehouseID } = useParams(); //Get the warehouse if from URL for edit route

  const [values, setValues] = useState(initialValues);
  const [isEditMode, setIsEditMode] = useState(false); //Track if it's an edit or add mode
  const [isLoading, setIsLoading] = useState(true);

  // Track if the component is mounted or not, so we know if we can update
  // state after asynchronous operations or not.
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    // Pass this object to the axios request, and we can use it to cancel the
    // response at any time. We do this so we can ignore requests that are still
    // running when this component unmounts, because we no longer need them.
    const abortController = new AbortController();

    // Function to fetch warehouse details when editing
    // Moving this inside the useEffect ensures that react does not get stuck in an infinite rendering loop
    async function fetchWarehouseDetails() {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/warehouses/${warehouseID}`,
          { signal: abortController.signal }
        );
        setValues(response.data); // Update the form with the fetched data
        setIsLoading(false); // Set loading to false after fetch attempt
      } catch (error) {
        // Make sure to ignore errors from the abort controller canceling; we
        // only do that when we don't need the request anymore.
        if (error.name !== "CanceledError") {
          handleFetchError(error, "Warehouse"); // Handle any errors
        }
      }
    }

    if (warehouseID) {
      setIsEditMode(true); // It's in edit mode if warehouseID exists
      fetchWarehouseDetails();
    } else {
      setIsLoading(false); // If not editing, set loading to false immediately
    }

    // Return a clean up function; when this component unmounts, it will cancel the request for warehouse details if its still running.
    return () => abortController.abort();
  }, [warehouseID]);

  /** Updates form state when user interacts with fields. */
  function handleInputChange(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }

  /** Submits form data to API */
  async function handleSubmit(ev) {
    ev.preventDefault();
    let toastId, successMessage;

    try {
      if (isEditMode) {
        toastId = toast.loading("Updating warehouse...");
        // PUT request for editing an existing warehouse
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/warehouses/${warehouseID}`,
          values
        );
        successMessage = "Warehouse updated!";
      } else {
        toastId = toast.loading("Submitting new warehouse...");
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/warehouses`,
          values
        );
        successMessage = "Warehouse created!";
      }
      if (isMounted.current) {
        toast.update(toastId, {
          render: successMessage,
          type: "success",
          isLoading: false,
          autoClose: 5000,
          onClose: () => navigate("/warehouses"),
        });
      }
    } catch (error) {
      handleFetchError(error, "Warehouse", toastId);
    }
  }

  return (
    <MainCard className={block}>
      <PageHeader hasBackButton={true}>
        {isEditMode ? "Edit Warehouse" : "Add New Warehouse"}
      </PageHeader>
      <form
        className={`${block}__form`}
        onSubmit={handleSubmit}
        aria-busy={isLoading && isEditMode}
      >
        <fieldset
          className={`${block}__form-section`}
          disabled={isLoading && isEditMode}
        >
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

        <fieldset
          className={`${block}__form-section`}
          disabled={isLoading && isEditMode}
        >
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
          <Button onClick={navigateBack} variant="secondary">
            Cancel
          </Button>
          <Button disabled={isLoading && isEditMode}>
            {" "}
            {isEditMode ? "Save" : "+ Add Warehouse"}
          </Button>
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
