import React, { useEffect } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import logo from "../images/logo.png";
function Navigation() {
  const param = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = document.querySelector(".searchParams").value;

    navigate(`/search/${searchParams}`);
  };

  useEffect(() => {
    console.log("param: ", param);
    console.log("location: ", location);
  }, [param, location]);

  return (
    <Navbar expand="lg" bg="transparent" className="d-flex align-items-center">
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
          </Nav>
        </div>

        <div className="d-flex position-relative mx-5">
          {!location.pathname.includes("search") && (
            <Form onSubmit={handleSearch} className="d-flex align-items-center">
              <FormControl
                type="search"
                className="searchParams nav-search w-100"
                placeholder="search books..."
              />
            </Form>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
