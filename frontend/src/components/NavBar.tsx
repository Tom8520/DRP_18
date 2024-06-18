import React from 'react';
import './../styles/Landing.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

const NavBar = () => {

  const navigate = useNavigate();

  return (
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="">AI Diagram Tool</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/main")}>Upload</Nav.Link>
            <Nav.Link href={"/user"}>Account</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default NavBar;