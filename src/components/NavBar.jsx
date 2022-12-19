import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GoSearch } from 'react-icons/go';
import { RxPerson } from 'react-icons/rx';
import logo from '../assets/Logo.png';

function NavBar() {
    const [navBarScroll, setNavBarScroll] = useState(false);

    const changeBackground = () => {
        console.log(window.scrollY)
        if (window.scrollY >= 80) {
            setNavBarScroll(true);
        }
        else {
            setNavBarScroll(false);
        }

        useEffect(() => {
            changeBackground()
            // adding the event when scroll change Logo
            window.addEventListener("scroll", changeBackground)
        })
    }

    return (
        <>
        {console.log(window.scrollY)}
            <style type="text/css">
                {`
            .bg-custom {
                background-color: #8BD2F5;
                color: white;
            }

            .navbar-custom {
                --bs-navbar-color: rgba(255, 255, 255);
                --bs-navbar-hover-color: rgba(255, 255, 255, 0.75);
                --bs-navbar-disabled-color: rgba(255, 255, 255, 0.25);
                --bs-navbar-active-color: #fff;
                --bs-navbar-brand-color: #fff;
                --bs-navbar-brand-hover-color: #fff;
                --bs-navbar-toggler-border-color: rgba(255, 255, 255, 0.1);
                --bs-navbar-toggler-icon-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
            }
                `}
            </style>


            <Navbar bg={navBarScroll ? "custom":""} expand="lg" variant="custom" fixed="top">
                <Navbar.Brand href="/home">VICTORY-BG
                    {/* <img src={logo}></img> */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#mbt"><b>МЪЖКИ ДЪНКИ И ПАНТАЛОНИ</b></Nav.Link>
                        <Nav.Link href="#fbt"><b>ДАМСКИ ДЪНКИ И ПАНТАЛОНИ</b></Nav.Link>
                        <Nav.Link href="#j"><b>ЯКЕТА</b></Nav.Link>
                        <Nav.Link href="#s"><b>СПОРТНИ СТОКИ</b></Nav.Link>
                        <Nav.Link href="#ft"><b>ДАМСКИ БЛУЗИ И РОКЛИ</b></Nav.Link>
                        <Nav.Link href="mbt"><b>Тестов route</b></Nav.Link>
                    </Nav>
                    <Navbar.Brand href="search"><GoSearch /></Navbar.Brand>
                    <Navbar.Brand href="account"><RxPerson /></Navbar.Brand>
                </Navbar.Collapse>
            </Navbar>

        </>

    );
}

export default NavBar;