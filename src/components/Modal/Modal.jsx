import "./Modal.scss";
import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
import { useEffect, useRef } from "react";
import closeSrc from "../../assets/icons/close-24px.svg";

/** A customizable modal made for displaying confirmation messages. It's
 * controlled through state.
 *
 * The `isOpen` and `setIsOpen` props should be given a boolean state and its
 * setter; these will track of whether the modal is open or closed. Another
 * component can then set that state to `true` to open the modal.
 *
 * You should set both the `title` and `content`, but keep them brief.
 *
 * `onDelete` is a function that runs when the user clicks a "Delete"
 * button in the modal, just before it closes. `onConfirm` is the similar except
 * it applies to an "Ok" button instead. Either can be asynchronous if needed.
 *
 * `focusRefAfterClose` is an optional `ref` to a DOM element that will receive
 * keyboard focus after the modal is closed. */
function Modal({
	isOpen = false,
	setIsOpen,
	title = "",
	content = "",
	onDelete,
	onConfirm,
	focusRefAfterClose
}) {
	// reasonably random id - 4 random digits and the last 4-5 digits
	// of the time in milliseconds.
	const id = useRef(`${
		Math.round(Math.random() * 10_000)
	}-${
		String(Date.now() / 100_000).split(".")[1]
	}`);

	const modalRef = useRef(null);
	const wasOpened = useRef(isOpen);

	function handleCancel() {
		setIsOpen(false);
	}
	async function handleDelete(ev) {
		await onDelete?.(ev);
		setIsOpen(false);
	}
	async function handleConfirm(ev) {
		await onConfirm?.(ev);
		setIsOpen(false);
	}

	useEffect(() => {
		const modalEl = modalRef.current;
		const firstButton = modalEl.querySelector("button");
		if (isOpen) {
			modalEl?.showModal();
			firstButton.focus();
			wasOpened.current = true;
		} else {
			modalEl?.close();
			wasOpened.current && focusRefAfterClose?.current?.focus();
		}
	}, [isOpen, focusRefAfterClose]);

	return (
	<dialog
		className="modal"
		ref={modalRef}
		onClose={handleCancel}
		aria-labelledby={`header-${id.current}`}
		aria-describedby={`body-${id.current}`}>
			<div className="modal__inner">
				<h2 className="modal__header" id={`header-${id.current}`}>
					{title}
				</h2>
				<p className="modal__body" id={`body-${id.current}`}>
					{content}
				</p>
				{onConfirm || onDelete && (
				<div className="modal__buttons">
					{onDelete && (<>
						<Button variant="secondary" onClick={handleCancel}>
							Cancel
						</Button>
						<Button variant="delete" onClick={handleDelete}>
							Delete
						</Button>
					</>)}
					{onConfirm && (
						<Button onClick={handleConfirm}>
							Ok
						</Button>
					)}
				</div>)}
				<IconButton
					className="modal__x-button"
					text="Close Dialog"
					iconSrc={closeSrc}
					onClick={handleCancel}/>
			</div>
		</dialog>
	);
}

export default Modal;
