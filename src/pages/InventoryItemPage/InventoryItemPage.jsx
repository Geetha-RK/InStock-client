import axios from "axios";
import { useParams } from "react-router-dom";
import "./InventoryItemPage.scss";
import { useEffect, useRef, useState } from "react";
import MainCard from "../../components/MainCard/MainCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import Link from "../../components/Link/Link";
import InventoryStatus from "../../components/InventoryStatus/InventoryStatus";
import editSrc from "../../assets/icons/edit-white-24px.svg";

function InventoryItemPage() {
	const { itemID } = useParams();
	const [item, setItem] = useState(null),
		[error, setError] = useState("");

	// For tracking if component is mounted;
	// i.e. if API request should be used or ignored
	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => isMounted.current = false;
	}, []);

	useEffect(() => {
		// anonymous function that calls itself immediately
		(async () => {
			setItem(null);
			setError("");
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/api/inventories/${itemID}`,
					{ timeout: 10_000 }
				);
				if (!isMounted.current) { return; }
				setItem(response.data);
			} catch (error) {
				if (!isMounted.current) { return; }
				const badRes = error.response;
				console.log(error, error.response);
				if (badRes?.status) {
					const data = badRes.data?.message || badRes.data;
					setError(`${badRes.status} ${badRes.statusText}${data ? `: ${data}` : ""}`);
				} else if (error.request) {
					setError("No response from the server. Please check your network connection.");
				} else {
					setError(error.message);
				}
			}
		})();
	}, [itemID]);

	function readableFieldTitle(key) {
		const words = key.split("_");
		if (words.includes("description")) {
			return "Item Description";
		}
		return words[0].charAt(0).toUpperCase() + words[0].substring(1);
	}

	const block = "item-detail-page";
	return (
		<MainCard className={block} aria-busy={!item && !error}>
			<PageHeader hasBackButton={true}>
				{error && "Error"}
				{!error && (item ? item.item_name : "Loading...")}
			</PageHeader>
			<Link to={`/inventory/edit/${itemID}`} className={`${block}__edit`}>
				<img className={`${block}__edit-icon`} alt="" src={editSrc} />
				<span className={`${block}__edit-text`}>Edit</span>
			</Link>

			{(error || !item) && (
			<div className={`${block}__temporary`}>
				<p className={`${block}__error-apology`}>
					{error && "Sorry, an error occurred."}
				</p>
				<p className={`${block}__error-message`}>
					{error}
				</p>
			</div>)}

			{item && (
			<dl className={`${block}__content`}>
				{Object.entries(item)
						.filter(([k]) => !["id","item_name", "created_at", "updated_at"].includes(k))
						.map(([k, val]) => (

					<div key={k} className={`${block}__field ${block}__field--${k.replaceAll("_", "-")}`}>
						<dt className={`${block}__field-title`}>
							{readableFieldTitle(k)}
						</dt>
						<dd className={`${block}__field-value`}>
							{k === "status"
								? <InventoryStatus status={val}/>
								: val}
						</dd>
					</div>

				))}
			</dl>)}
		</MainCard>
	);
}

export default InventoryItemPage;