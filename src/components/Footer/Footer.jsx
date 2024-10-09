import "./Footer.scss";
import copyrights from "../../assets/icons/copyright_20dp_E8EAED.svg";

function Footer() {
    return (
        <section className="footer">
            {/* <div> */}
            <img className="footer__img" src={copyrights} alt="copyrights-icon" />
            <p className="footer__para">InStock Inc. All Rights Reserved.</p>
            {/* </div> */}
        </section>
    );
}

export default Footer;