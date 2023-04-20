import classes from "./Footer.module.css";
import logo from "../assets/Anh Logo.jpg";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes["footer-content"]}>
        <div className={classes.logo}>
          <img
            src={logo}
            style={{
              width: "65px",
              margin: "2px 15px 15px",
              cursor: "pointer",
            }}
          ></img>
          <h4 style={{ display: "inline", fontWeight: "100" }}>
            Victory online
          </h4>
        </div>
        <p>София, 1231 ул. „П. Панайотов“ 12</p>
      </div>

      <div>
        <h4 style={{ fontWeight: "100" }}>телефон за връзка:</h4>
        <p>+359 884 35 35 89</p>
      </div>
    </div>
  );
};

export default Footer;
