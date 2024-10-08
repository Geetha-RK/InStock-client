import "./WarehouseFormPage.scss";
import MainCard from "../../components/MainCard/MainCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function WarehouseFormPage() {
	const block = "warehouse-form-page"; // bem block name

	return (<MainCard className={block}>
		<PageHeader hasBackButton={true}>Add New Warehouse</PageHeader>
		<form className={`${block}__form`}>
			<fieldset className={`${block}__form-section`}>
				<h2 className={`${block}__form-header`}>Warehouse Details</h2>

				<Input
					type="text"
					label="Warehouse Name"
					placeholder="Warehouse Name" />

				<Input
					type="text"
					label="Street Address"
					placeholder="Street Address" />

				<Input
					type="text"
					label="City"
					placeholder="City" />

				<Input
					type="text"
					label="Country"
					placeholder="Country" />
			</fieldset>

			<fieldset className={`${block}__form-section`}>
				<h2 className={`${block}__form-header`}>Contact Details</h2>

				<Input
					type="text"
					label="Contact Name"
					placeholder="Contact Name" />

				<Input
					type="text"
					label="Position"
					placeholder="Position" />

				<Input
					type="tel"
					label="Phone Number"
					placeholder="Phone Number" />

				<Input
					type="email"
					label="Email"
					placeholder="Email" />

			</fieldset>

			<div className={`${block}__form-buttons`}>
				<Button to="/warehouses" variant="secondary">Cancel</Button>
				<Button>+ Add Warehouse</Button>
			</div>
		</form>
	</MainCard>);
}

export default WarehouseFormPage;