import { useCallback, useContext } from "react";
import { useNavigate as rrUseNavigate } from "react-router-dom";
import { AnnouncementContext } from "../App";

/** An extension of react router's `useNavigate` which will load the chosen route, while also announcing the reload to screen reader users.
 * @see `useNavigate` from react-router-dom */
export function useNavigate() {
	const {setAnnouncement, userNavigated} = useContext(AnnouncementContext);
	const navigate = rrUseNavigate();

	return useCallback((to, options = {}) => {
		userNavigated();
		setAnnouncement("Loading new page...");
		navigate(to, options);
	}, [setAnnouncement, userNavigated, navigate]);
}