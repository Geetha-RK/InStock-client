import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/** A hook which creates the necessary state and effects for an SPA navigation announcement system in react router.
 * @param {React.MutableRefObject<null>} mainWrapperRef A `ref` to the `<main>` tag in the App's html.
 * @param {React.MutableRefObject<null>} skipLinkRef A `ref` to a "Skip to main content" link at the very top of the App's html.
 * @returns Four things: `announcement`, which is the current announcement content; `setAnnouncement`, which can be used to set the announcement state; `refocusOnMain()`, which sets keyboard focus to the top of the main content of the page; and `userNavigated()`, which just flips a switch saying that SPA navigation has occurred. */
export function useAnnouncementSystem(mainWrapperRef, skipLinkRef) {
	const [announcement, setAnnouncement] = useState("");
	const navigationHasOccurred = useRef(false);
	const location = useLocation();

	function userNavigated() {
		navigationHasOccurred.current = true;
	}

	function refocusOnMain() {
		const focusEl =
			mainWrapperRef.current?.querySelector("#main")
			?? mainWrapperRef.current?.querySelector("h1")
			?? skipLinkRef.current;
		focusEl.focus();
		if (focusEl !== document.activeElement){
			focusEl.setAttribute("tabindex", "-1");
			focusEl.focus();
		}
	}

	useEffect(() => {
		// always ensure the skip-to-main link goes somewhere useful
		mainWrapperRef.current.removeAttribute("id");
		const mainEl =
			mainWrapperRef.current?.querySelector("#main")
			?? mainWrapperRef.current?.querySelector("h1")
			?? mainWrapperRef.current;

		mainEl.setAttribute("id", "main");

		// only manage focus & announcement if we've internally navigated
		if (navigationHasOccurred.current) {
			refocusOnMain();
			setAnnouncement("");
		}
	}, [location, setAnnouncement]);

	return {announcement, setAnnouncement, refocusOnMain, userNavigated};
}