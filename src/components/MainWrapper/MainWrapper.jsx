import "./MainWrapper.scss";
import { forwardRef } from "react";

const MainWrapper = forwardRef(({ children }, ref) => {
	return (
		<main className="main-wrapper" ref={ref}>
			{children}
		</main>
	)
});
MainWrapper.displayName = "MainWrapper";

export default MainWrapper;