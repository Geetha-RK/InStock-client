import "./Input.scss";
import { useState } from "react";

/** A styled text input. You can provide a type that is either "textarea", or
 * any valid type on an `<input>` element that results in a text box being
 * rendered. You can also pass it any attribute that you would use on an
 * `<input>`, such as `value`. */
function Input({ type = "text", label, hideLabel = false, description = "", onChange, onInvalid, className ="", inputClassName = "", ...rest }) {
	const [invalidMessage, setInvalidMessage] = useState("");

	if (["file","image","submit","button","checkbox","radio","reset","color"].includes(type)) {
		return ("Disallowed input type.");
	}
	if (!label) {
		console.error("Inputs must have a label");
	}
	if (rest.pattern && !description) {
		console.error("Please provide a 'description' prop explaining the required pattern for this field.");
	}

	const TagName = (type === "textarea") ? "textarea" : "input";

	function handleInvalid(ev) {
		ev.preventDefault();
		ev.target.classList.add("input__field--invalid");
		setInvalidMessage(ev.target.validationMessage);

		// set focus to first invalid field in the containing form/search element
		const myForm = ev.target.closest("form, search");
		const firstInvalidField =
			myForm.querySelector("input:invalid, textarea:invalid" );
		firstInvalidField.focus();

		onInvalid?.(ev);
	}
	function handleChange(ev) {
		if (ev.target.validity.valid) {
			ev.target.classList.remove("input__field--invalid");
			setInvalidMessage("");
		}
		onChange?.(ev);
	}

	return (
		<label className={`input ${className}`}>
			<span className={hideLabel ? "input__hidden" : "input__label"}>
				{label}
			</span>
			<TagName
				{...rest}
				className={`input__field ${inputClassName}`}
				type={type !== "textarea" ? type : null}
				onChange={handleChange}
				onInvalid={handleInvalid}
				rows="5" />
			<small
				className={
					invalidMessage
					? "input__error"
					: "input__hidden"}
			>
				{invalidMessage
				? `${invalidMessage} ${description ? `Format: ${description}` : ""}`
				: ""}
			</small>
		</label>
	);
}

export default Input