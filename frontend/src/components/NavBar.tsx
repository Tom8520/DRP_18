import React from 'react';
import './../styles/Landing.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {

  return (
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="">AI Diagram Tool</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/main">Upload</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default NavBar;