import "./WarehouseFormPage.scss";
import MainCard from "../../components/MainCard/MainCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useState } from "react";

const initialValues = {
	"warehouse_name": "",
	address: "",
	city: "",
	country: "",
	"contact_name": "",
	"contact_postion": "",
	"contact_phone": "",
	"contact_email": ""
};

function WarehouseFormPage() {
	const block = "warehouse-form-page"; // bem block name

	const [values, setValues] = useState(initialValues);

	function handleInputChange(ev) {
		const { name, value } = ev.target;
		setValues({ ...values, [name]: value });
	}

	async function handleSubmit(ev) {
		ev.preventDefault();
		console.log(values);
	}

	return (<MainCard className={block}>
		<PageHeader hasBackButton={true}>Add New Warehouse</PageHeader>
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
				<Button>+ Add Warehouse</Button>
			</div>
		</form>
	</MainCard>);
}

export default WarehouseFormPage;