import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../images/logo.png";

function Navigation({ setLoggedIn }) {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search/${searchValue}`);
        setSearchValue("");
    };

    function handleSignOut() {
        localStorage.removeItem("token");
        setLoggedIn(false);
        navigate("/");
    }

    return (
        <Navbar
            expand="lg"
            bg="transparent"
            className="d-flex align-items-center"
        >
            <Navbar.Brand className="d-flex align-items-center">
                <Link to="/">
                    <img
                        src={logo}
                        alt="books logo"
                        style={{
                            padding: "0 2rem",
                            maxHeight: "3rem",
                        }}
                    />
                </Link>
                <h1 className="fw-bold text-uppercase">Shelf Help</h1>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-2" />

            <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-between"
            >
                <div className="d-flex">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <NavLink
                                to="/"
                                exact="true"
                                activeclassname="active-nav-link"
                                className="nav-link mx-5 fw-light fs-4"
                            >
                                home
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                to="/shelf"
                                activeclassname="active-nav-link"
                                className="nav-link mx-5 fw-light fs-4"
                            >
                                shelf
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                to="/tbr"
                                activeclassname="active-nav-link"
                                className="nav-link mx-5 fw-light fs-4"
                            >
                                tbr
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                to="/about"
                                activeclassname="active-nav-link"
                                className="nav-link mx-5 fw-light fs-4"
                            >
                                about
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </div>

                <div className="d-flex position-relative mx-5">
                    <Form
                        onSubmit={handleSearch}
                        className="d-flex align-items-center"
                    >
                        <FormControl
                            type="search"
                            className="searchParams nav-search"
                            placeholder="search books..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </Form>
                    <div className="d-flex align-items-center mx-5">
                        <Dropdown className="d-flex align-items-center ml-5">
                            <Dropdown.Toggle
                                as="a"
                                id="dropdown-basic"
                                bsPrefix="p-0 border-0 bg-transparent"
                            >
                                <i
                                    className="fa fa-user fs-4"
                                    aria-hidden="true"
                                ></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end" className="mt-3">
                                <Dropdown.Item onClick={handleSignOut}>
                                    Sign Out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
