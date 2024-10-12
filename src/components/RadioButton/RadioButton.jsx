import "./RadioButton.scss";

/** A radio button. This should be the child of a `RadioGroup`.
 *
 * @typedef {object} RadioButtonProps
 * @property {string} name `name` html attribute
 * @property {string} value `value` html attribute
 * @property {boolean} checked
 * @property {Function} onChange
 * @property {string} children The label for this radio button
 * @param {RadioButtonProps} props
 */
function RadioButton({ name, value, checked, onChange, children }) {
	return (
		<label className="radio-button">
			<input
				className="radio-button__input"
				type="radio"
				value={value}
				onChange={onChange}
				name={name}
				checked={checked} />
			{children}
		</label>
	);
}

export default RadioButton;
