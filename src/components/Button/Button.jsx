import "./Button.scss";
import Link from "../Link/Link";

/** A CTA button. Text is added between two Button tags as with a regular HTML element. If you want a button with no text, only an icon, you need an `IconButton` instead.
 * - By default, renders as a `<button>` element. If you provide a `to` prop with a route, it will be rendered as an `<Link>` element that goes to that route.
 * - The `variant` prop controls the style of the button. `"primary"` (default) renders a blue button; `"secondary"` makes it white; and `"delete"` makes it red.
 * - You can provide a `className` prop to further customize styling. */
function Button({ to = null, onClick, variant = "primary", className = "", children }) {
	const TagName = to ? Link : "button";
	const variantClass = variant ? `cta-button--${variant}` : "";
	return (
		<TagName
			to={to}
			onClick={onClick}
			className={`cta-button ${variantClass} ${className}`}
		>
			{children}
		</TagName>
	);
}

export default Button