import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const SignUpNav = ({ setLoggedIn }) => {
    const navigate = useNavigate();

    return (
        <div>
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
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className="mx-2"
                />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-end"
                >
                    <div className="d-flex">
                        <Nav className="mr-auto">
                            <Nav.Item>
                                <Link to="/login"
                                    className="nav-link mx-5 fw-light fs-4"
                                >
                                    Log In
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/register"
                                    className="nav-link mx-5 fw-light fs-4"
                                >
                                    Sign Up
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default SignUpNav;
