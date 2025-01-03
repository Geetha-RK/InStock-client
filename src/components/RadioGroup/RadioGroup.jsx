import "./RadioGroup.scss";
import { Children, cloneElement } from "react";

/** A wrapper for `RadioButton` components that can be used to control the
 * entire group of radio buttons.
 *
 * @typedef {object} RadioGroupProps
 * @property {string} name
 *   `name` attribute for all the radio buttons.
 * @property {string} label
 *   A label for the entire group of radio buttons.
 * @property {string} value
 *   A **state** which will be set to the selected value.
 * @property {Function} onChange
 *   An onChange handler that will be passed down to each radio button.
 * @property {import("react").ReactNode} children
 *   Any amount of `RadioButton` components.
 * @property {boolean} disabled
 *   If set to true, all radio buttons in the group will be disabled.
 * @param {RadioGroupProps} props
 */
function RadioGroup({
	name, label, value, onChange, children, disabled = undefined, required = undefined
}) {
	// This is passing the name, onChange, and selected state of the group down
	// to its child components so that they can be controlled
	const buttons = Children.map(
		children,
		(child) => cloneElement(
			child, {
				...child.props,
				name,
				onChange: onChange,
				checked: (child.props.value === value || child.props.value === value[name]),
				required: required
			}
		)
	);
	return (
		<fieldset className="radio-group" disabled={disabled}>
			<legend className="radio-group__legend">{label}</legend>
			{buttons}
		</fieldset>
	);
}

export default RadioGroup;
