import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Landing.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {

  return (
    <div>
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
      <br></br>
      <div className="header">
        <h1 className='stylish-header'>AI Diagrameeeeeeeeeeeeeeeeeeee Tool</h1>
        <h3>Make diagrams easier to understand with the power of AI and AR.</h3>
      </div>
      <div className="div-container">
        <p className="description"></p>
        <div className="button-container">
          <Link to="/login" className="styled-button">Login</Link>
        </div>  
        <div className="button-container">
          <Link to="/main" className="styled-button">Try It Out</Link>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default LandingPage;