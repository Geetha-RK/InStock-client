import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AnnouncementContext } from "../App";

/** An extension of react router's `useNavigate` which will load the chosen route, while also announcing the reload to screen reader users.
 * @see `useNavigate` from react-router-dom
 */
export function useNavigate() {
	const {setAnnouncement, setUserNavigated} = useContext(AnnouncementContext);
	const navigate = useNavigate();

	return (to, options = {}) => {
		setUserNavigated(true);
		setAnnouncement("Loading new page...");
		navigate(to, options);
	}
}