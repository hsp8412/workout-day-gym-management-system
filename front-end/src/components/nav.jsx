import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const getToken = () => {
  return localStorage.getItem("token");
};

const NavBar = () => {
  const token = getToken();
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={solid("dumbbell")} size="2x" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Item>
              <Nav.Link href="/shopping" className="nav-button">
                Shopping
              </Nav.Link>
            </Nav.Item>
            {getToken() && (
              <Nav.Item>
                <Nav.Link href="/orders" className="nav-button">
                  Orders
                </Nav.Link>
              </Nav.Item>
            )}
            {getToken() && (
              <Nav.Item>
                <Nav.Link href="/fitnessProfiles" className="nav-button">
                  My Profile
                </Nav.Link>
              </Nav.Item>
            )}
            {getToken() && (
              <Nav.Item>
                <Nav.Link href="/appointments" className="nav-button">
                  My Appointments
                </Nav.Link>
              </Nav.Item>
            )}
            {getToken() && (
              <Nav.Item>
                <Nav.Link
                  href="/login"
                  onClick={() => localStorage.removeItem("token")}
                  className="nav-button"
                >
                  Logout
                </Nav.Link>
              </Nav.Item>
            )}
            {!getToken() && (
              <Nav.Item>
                <Nav.Link href="/register" className="nav-button">
                  Register
                </Nav.Link>
              </Nav.Item>
            )}
            {!getToken() && (
              <Nav.Item>
                <Nav.Link href="/login" className="nav-button">
                  {" "}
                  Login
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
