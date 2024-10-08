import { forwardRef, useContext } from "react";
import { useHref, useLinkClickHandler } from "react-router-dom";
import { AnnouncementContext } from "../../App";

/** An extension of react router's `<Link>` which informs screen reader users
 * of impending page navigation. You use this exactly like you would react
 * router's `<Link>` component.
 *
 * Heavily referenced: https://reactrouter.com/en/main/hooks/use-link-click-handler */
const Link = forwardRef(({
	to,
	onClick,
	target,
	replace = false,
	state,
	preventScrollReset,
	children,
	...rest
}, ref) => {
	const href = useHref(to);
	const handleClick = useLinkClickHandler(to, { replace, state, target, preventScrollReset });
	const {setAnnouncement, userNavigated} = useContext(AnnouncementContext);

	return (
		<a
			{...rest}
			href={href}
			ref={ref}
			target={target}
			onClick={(ev) => {
				ev.preventDefault();
				userNavigated();
				setAnnouncement("Loading new page...");
				onClick?.(ev);
				handleClick(ev);
			}}
		>{children}</a>
	);
});
Link.displayName = "Link";

export default Link;