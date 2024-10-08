import "./MainCard.scss";

/** A root component for Pages which creates the card layout from the mockups.
 * You can pass a `className` prop to further customize its look. */
function MainCard({ className = "", children }) {
	return (
		<section className={`card-layout ${className}`}>
			{children}
		</section>
	);
}

export default MainCard;