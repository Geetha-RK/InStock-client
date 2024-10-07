import "./Announcement.scss";

/** Visually hidden live region for announcing things to screen readers.
 * Props:
 * - `isPolite`: Boolean. If true, the announcement will be read at the next convenient opportunity. If false (default), the announcement will be read immediately as it is changed.
 * - `children`: Sets the content of the announcement. This is not a traditional prop; you put this inside the Announcement tag like a regular HTML element. ie: `<Announcement>Children go here.</Announcement>`
 */
function Announcement({ isPolite = false, children }) {
	return (
		<span
			className={`sr-announcement`}
			aria-live={isPolite && variant !== "error" ? "polite" : "assertive"}
			aria-atomic
		>
			{children}
		</span>
	);
}

export default Announcement;
