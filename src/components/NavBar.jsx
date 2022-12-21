import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GoSearch } from 'react-icons/go';
import { RxPerson } from 'react-icons/rx';
import logo from '../assets/Logo.png';

const NavBar = (props) => {

    return (
        <>
            <style type="text/css">
                {`
            .navbar-custom {
                font-weight: 500;
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
                font-weight: 500;
                --bs-bg-opacity: 1;
            }

            .bg-light {
                background-color: #fff !important;
                border-bottom: 1px solid black;
                transition: background-color .5s ease-in-out,border-color .5s ease-in-out, filter .01s linear .5s;
                height: 82px;
                padding-left: 15px;
            }

            .bg-none {
                background-color: transparent;
                transition: background-color .5s ease-in-out,border-color .5s ease-in-out, filter .01s linear .5s;
                height: 82px;
                padding-left: 15px;
            }
                `}
            </style>


            <Navbar bg={props.scrollState ? "light" : "none"} expand="lg" variant={props.scrollState ? "light" : "custom"} fixed="top">
                <Navbar.Brand href="/home">VICTORY-BG
                    {/* <img src={logo}></img> */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Container>
                        <Nav className="me-auto">
                            <Nav.Link href="#mbt"><p className="p-navbar">Мъжки дънки и панталони</p></Nav.Link>
                            <Nav.Link href="#fbt"><p className="p-navbar">Дамски дънки и панталони</p></Nav.Link>
                            <Nav.Link href="#j"><p className="p-navbar">Якета</p></Nav.Link>
                            <Nav.Link href="#s"><p className="p-navbar">Спортни стоки</p></Nav.Link>
                            <Nav.Link href="#ft"><p className="p-navbar">Дамски блузи и аксесоари</p></Nav.Link>
                            <Nav.Link href="mbt"><p className="p-navbar">Тестов route</p></Nav.Link>
                        </Nav>
                    </Container>
                    <Navbar.Brand href="search"><GoSearch /></Navbar.Brand>
                    <Navbar.Brand href="account"><RxPerson /></Navbar.Brand>
                </Navbar.Collapse>
            </Navbar>

        </>

    );
}

export default NavBar;