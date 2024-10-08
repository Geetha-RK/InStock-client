import "./PageHeader.scss";
import BackButton from '../BackButton/BackButton';

function PageHeader({ hasBackButton = false, children }) {
	return (<div className="page-header" >
		<h1 className="page-header__text">{children}</h1>
		{hasBackButton && <BackButton className="page-header__back-btn"/>}
	</div>);
}

export default PageHeader