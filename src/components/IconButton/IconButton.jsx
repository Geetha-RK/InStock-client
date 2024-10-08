import "./IconButton.scss";

/** Accessible icon button, with fallback text for screen readers and for when
 * the image fails to load. Provide class names to adjust the button and icon
 * styling. */
function IconButton({ text = "", iconSrc = "", onClick, className = "", iconClassName = "", ...rest }) {
	function showText(ev) {
		ev.target.nextSibling.classList.remove("icon-button__hidden");
		ev.target.classList.add("icon-button__hidden");
	}
	function showImage(ev) {
		ev.target.nextSibling.classList.add("icon-button__hidden");
		ev.target.classList.remove("icon-button__hidden");
	}
	return (
		<button {...rest} className={`icon-button ${className}`} onClick={onClick}>
			<img
				className={`icon-button__icon ${iconClassName}`}
				alt=""
				src={iconSrc}
				onError={showText}
				onLoad={showImage} />
			<span className="icon-button__text icon-button__hidden">{text}</span>
		</button>
	);
}

export default IconButton;