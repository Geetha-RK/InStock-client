import "./InventoryStatus.scss";

/** Set `status` to the inventory status from the database. */
function InventoryStatus({ status }) {
	return (
		<span data-status={status} className="status-tag">
			{status}
		</span>
	);
}

export default InventoryStatus;