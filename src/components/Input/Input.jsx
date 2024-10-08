import "./Input.scss";

/** A styled text input. You can provide a type that is either "textarea", or
 * any valid type on an `<input>` element that results in a text box being
 * rendered. You can also pass it any attribute that you would use on an
 * `<input>`, such as `value`. */
function Input({ type = "text", label, onChange, onInvalid, className ="", inputClassName = "", ...rest }) {

	if (["file","image","submit","button","checkbox","radio","reset","color"].includes(type)) {
		return ("Disallowed input type.");
	}
	if (!label) {
		console.error("Inputs must have a label");
	}

	const TagName = (type === "textarea") ? "textarea" : "input";

	function handleInvalid(ev) {
		ev.target.classList.add("input__field--invalid");
		onInvalid?.(ev);
	}
	function handleChange(ev) {
		if (ev.target.validity.valid) {
			ev.target.classList.remove("input__field--invalid");
		}
		onChange?.(ev);
	}

	return (
		<label className={`input ${className}`}>
			<span className={`input__label`}>
				{label}
			</span>
			<TagName
				{...rest}
				className={`input__field ${inputClassName}`}
				type={type !== "textarea" ? type : null}
				onChange={handleChange}
				onInvalid={handleInvalid}
				rows="5" />
		</label>
	);
}

export default Input