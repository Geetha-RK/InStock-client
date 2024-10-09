import "./Header.scss";
import logo from '../../assets/logo/InStock-Logo.svg';
import NavLink from "../NavLink/NavLink";


function Header() {

	return (
		<section className='header'>
            <img className='header__logo' src={logo} alt='Website logo'/>
            <nav className='header__navigation'>
                <ul className='header__list'>
                    <li className='header__list-item'>
                        <NavLink to='/warehouses' className={( isActive ) => 
                            isActive ? 'header__link header__link--active' : 'header__link'
                        }>Warehouses</NavLink>
                    </li>
                    <li className='header__list-item'>
                        <NavLink to='/inventory' className={( isActive ) => 
                            isActive ? 'header__link header__link--active' : 'header__link'
                        }>Inventory</NavLink>
                    </li>
                </ul>
            </nav>
        </section>
	);
}

export default Header;