import "./BackButton.scss";
import { useGoBack } from "../../hooks/useGoBack";
import IconButton from "../IconButton/IconButton";
import arrowSrc from "../../assets/icons/arrow_back-24px.svg";

function BackButton({ fallbackRoute = "/", ...rest }) {
	const goBackFn = useGoBack(fallbackRoute);
	return (
		<IconButton
			{...rest}
			text="Go Back"
			iconSrc={arrowSrc}
			onClick={goBackFn} />
	)
}

export default BackButton;