const Footer = () => {

    return (
        <div className="footer-style">
            <div className="footer-flex">
                <p className="footer-p">Контакти: София, ул. Петър Панайотов 12</p>
                <p className="footer-p">Телефон: +359 87 8223373</p>
                <p className="footer-p">Email: info@victory-bg.com</p>
            </div>

            <div className="footer-flex">
                <p className="footer-p">2022 Copyright Victory-bg Ltd.</p>
                <p className="footer-p">Created by LHL Ltd.</p>
=======
import classes from "./Footer.module.css";

const Footer = () => {

    return(
        <div className={classes.footer}>
            <div>
                <h3>zamn</h3>
                <p>ala bala</p>
                <p>portokala</p>
            </div>

            <div>
                <h3>morbius</h3>
                <p>morb</p>
                <p>morbu</p>
            </div>

            <div>
                <h3>Foobar</h3>
                <p>foo</p>
                <p>bar</p>
            </div>

            <div>
                <h3>Lacrimosa dies</h3>
                <p>dies ira</p>
                <p>aafaf safsaf</p>

            </div>
        </div>
    )
}

export default Footer;