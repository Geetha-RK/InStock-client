import "./Dropdown.scss";
import { useRef, useState } from "react";

/** A styled, controllable dropdown. Any prop/attribute that can be used on a `<select>` element can be used on a `Dropdown`.
 *
 * @typedef {object} DropdownProps
 * @property {string} label
 *   A label for the dropdown.
 * @property {string} value
 *   A **state** which will be set to the selected value.
 * @property {Function} onChange
 *   Function that runs every time the selected choice changes; use this
 *   to set the state in the `value` prop.
 * @property {import("react").ReactNode} children
 *   Any amount of `<option>` elements.
 * @param {RadioGroupProps} props
 */
function Dropdown({ label, defaultValue, value, onChange, onInvalid, children, ...rest }) {
	const [invalidMessage, setInvalidMessage] = useState("");
	const selectRef = useRef(null);
	if (!label) {
		console.error("Dropdowns must have a label");
	}

	function handleInvalid(ev) {
		ev.preventDefault();
		ev.target.classList.add("input__field--invalid");
		setInvalidMessage(ev.target.validationMessage);

		// set focus to first invalid field in the containing form/search element
		const myForm = ev.target.closest("form, search");
		const firstInvalidField =
			myForm?.querySelector("input:invalid, textarea:invalid" );
		firstInvalidField?.focus();

		onInvalid?.(ev);
	}
	function handleChange(ev) {
		if (ev.target.validity.valid) {
			ev.target.classList.remove("input__field--invalid");
			setInvalidMessage("");
		}
		onChange?.(ev);
	}

	function handleWrapperClick() {
		const selectEl = selectRef.current;
		// document.createElement("select")
		selectEl.focus();
		selectEl.dispatchEvent(new Event("click"));
	}

	return (
		<label className="dropdown">
			<span className="dropdown__label">
				{label}
			</span>
			<div className="dropdown__arrow-wrapper" onClick={handleWrapperClick}>
				<select
					{...rest}
					ref={selectRef}
					className="dropdown__field"
					onChange={handleChange}
					onInvalid={handleInvalid}
					value={value}
					defaultValue={defaultValue}>
						<option value="">Please select</option>
						{children}
					</select>
			</div>
			<small className={`dropdown__${invalidMessage ? "error" : "hidden"}`}>
				{invalidMessage ? invalidMessage : ""}
			</small>
		</label>
	);
}

export default Dropdown;