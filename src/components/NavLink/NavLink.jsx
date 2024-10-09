import { useMatch } from "react-router-dom";
import Link from "../Link/Link";

/** An extension of the custom `<Link>` which knows if the current route is a
 * match to it, and can be styled based on that state. It also informs screen
 * reader users of impending page navigation.
 *
 * By default, its classes are "navlink" for the regular state, and
 * "navlink navlink--active" for when the link goes to the current route.
 * You can change this by passing a callback function with one parameter
 * named `isActive` to the `className` prop; this function should return a
 * different string of class name(s) based on whether `isActive` is true or false. */
function NavLink({
	to,
	className = (isActive) => `navlink ${isActive ? "navlink--active" : ""}`,
	activeOnlyWhenExact,
	children,
	...rest
}) {
	let match = useMatch({
		path: to,
		exact: activeOnlyWhenExact
	});

	return (
		<Link {...rest} to={to} className={className(match)}>
			{children}
		</Link>
	);
}

export default NavLink;