import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const getToken = () => {  return  localStorage.getItem("token");};

const NavBar = () => {
    const token = getToken();
  return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/shopping">
            <img src="/gym-logo.svg" height="60" width="60"></img> Workout Day
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/shopping">Shopping</Nav.Link>
            {getToken() && <Nav.Link href="/orders">Orders</Nav.Link>}
            {getToken() && <Nav.Link href="/fitnessProfiles">My Profile</Nav.Link>}
            {getToken() && <Nav.Link href="/appointments">My Appointments</Nav.Link>}
            {getToken() && <Nav.Link href="/login" onClick={() => localStorage.removeItem('token')} >Logout</Nav.Link>}
            {!getToken() && <Nav.Link href="/register" >Register</Nav.Link>}
            {!getToken() && <Nav.Link href="/login"> Login</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
  );
};

export default NavBar;
