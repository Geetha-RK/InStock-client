import { useParams } from "react-router-dom";
import "./InventoryItemPage.scss";
import { useEffect, useRef, useState } from "react";
import MainCard from "../../components/MainCard/MainCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import axios from "axios";

function InventoryItemPage() {
	const { itemID } = useParams();
	const [item, setItem] = useState(null);

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
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/api/inventories/${itemID}`,
					{ timeout: 10_000 }
				);
				if (!isMounted.current) { return; }
				setItem(response.data);
			} catch {
				if (!isMounted.current) { return; }
				// TODO error handling
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
		<MainCard className={block} aria-busy={!item}>
			<PageHeader hasBackButton={true}>
				{item ? item.item_name : "Loading..."}
			</PageHeader>

			<dl className={`${block}__content`}>
				{item && Object.entries(item)
						.filter(([k]) => !["id","item_name", "created_at", "updated_at"].includes(k))
						.map(([k, val]) => (
					<div key={k} className={`${block}__field ${block}__field--${k.replaceAll("_", "-")}`}>
						<dt className={`${block}__field-title`}>
							{readableFieldTitle(k)}
						</dt>
						<dd className={`${block}__field-value`}>
							{val}
						</dd>
					</div>
				))}
			</dl>
		</MainCard>
	);
}

export default InventoryItemPage;