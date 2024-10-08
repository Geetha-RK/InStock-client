import { useCallback, useContext } from "react";
import { useNavigate } from "./useNavigate";
import { AnnouncementContext } from "../App";

/** A hook that returns a function which can be used to navigate to the
 * previous page. Use to create back buttons.
 * @param {string} fallbackRoute (Default: "/") A fallback route to use if
 *   there's no page on our website in the browser history to go back to.
 * @returns A function that can be called to navigate to the previous page. */
export function useGoBack(fallbackRoute = "/") {
	const { canGoBack } = useContext(AnnouncementContext);
	const navigate = useNavigate();

	return useCallback(() => {
		if (canGoBack) {
			navigate(-1);
		} else {
			navigate(fallbackRoute, { replace: true });
		}
	}, [canGoBack, fallbackRoute]);
}