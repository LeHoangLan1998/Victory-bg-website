import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { User, ShoppingCart, SignIn, SignOut, Circle } from "phosphor-react";
import logo from "../assets/Anh Logo.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/shop-context";
import classes from "./NavBar.module.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [navBarScroll, setNavBarScroll] = useState(false);
  const { cartItems } = useContext(ShopContext);

  //Authentication
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
        setUsername("");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const email = user.email;
        // ...
        setUsername(email);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  //Navbar behaviour
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavBarScroll(true);
    } else {
      setNavBarScroll(false);
    }
  };
  useEffect(() => {
    changeBackground();
    // adding the event when scroll change Logo
    window.addEventListener("scroll", changeBackground);
  });
  //
  return (
    <>
      <style type="text/css">
        {`
            .navbar-custom {
                /* text-transform: uppercase; */
                --bs-navbar-color: rgba(255, 255, 255);
                --bs-navbar-hover-color: rgba(255, 255, 255, 0.75);
                --bs-navbar-disabled-color: rgba(255, 255, 255, 0.25);
                --bs-navbar-active-color: #fff;
                --bs-navbar-brand-color: #fff;
                --bs-navbar-brand-hover-color: #fff;
                --bs-navbar-toggler-border-color: rgba(255, 255, 255, 0.1);
                --bs-navbar-toggler-icon-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
            }
            .navbar-light {
                --bs-bg-opacity: 1;
            }

            .bg-light {
                background-color: #fff !important;
                border-bottom: 1px solid black;
                transition: background-color .5s ease-in-out,border-color .5s ease-in-out, filter .01s linear .5s;
                padding-left: 15px;
            }

            .bg-none {
                background-color: transparent;
                transition: background-color .5s ease-in-out,border-color .5s ease-in-out, filter .01s linear .5s;
                padding-left: 15px;
            }
            .navbar-text {
              padding: 0.5rem;
              margin-right: 0.5rem;
            }
            .navbar-brand {
              position: relative;
            }
                `}
      </style>

      <Navbar
        bg={navBarScroll ? "light" : "none"}
        expand="lg"
        variant={navBarScroll ? "light" : "custom"}
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src={logo}
              className={classes.logo}
            ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Offcanvas id="basic-navbar-nav" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                {username !== "" ? (
                  <Navbar.Text>{`Добре дошли ${username}!`}</Navbar.Text>
                ) : "Victory-bg"}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                <Nav.Link
                  onClick={() => {
                    navigate("/products/male");
                  }}
                >
                  <p className="p-navbar">Мъжки дънки и панталони</p>
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/products/female");
                  }}
                >
                  <p className="p-navbar">Дамски дънки и панталони</p>
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  <p className="p-navbar">Якета</p>
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("products");
                  }}
                >
                  <p className="p-navbar">Спортни стоки</p>
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("products");
                  }}
                >
                  <p className="p-navbar">Дамски блузи и аксесоари</p>
                </Nav.Link>
              </Nav>

              {username !== "" ? (
                <Navbar.Text>{`Добре дошли ${username}!`}</Navbar.Text>
              ) : null}

              {/* <Navbar.Brand href="/signup">
                <User size="1.5rem" />
              </Navbar.Brand> */}

              <Navbar.Brand>
                <ShoppingCart
                  size="1.5rem"
                  onClick={() => {
                    navigate("/cart");
                  }}
                  style={{ cursor: "pointer" }}
                />
                {Object.keys(cartItems).length === 0 ? null : (
                  <Circle
                    weight="fill"
                    color="orange"
                    style={{
                      position: "absolute",
                      right: "-6",
                      transform: "scale(.5)",
                    }}
                  />
                )}
              </Navbar.Brand>

              {username === "" ? (
                <Navbar.Brand>
                  <SignIn
                    size="1.5rem"
                    onClick={() => {
                      navigate("/login");
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </Navbar.Brand>
              ) : (
                <Navbar.Brand>
                  <SignOut
                    size="2rem"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  />
                </Navbar.Brand>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
