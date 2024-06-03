import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Landing.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';

const LandingPage = () => {

  return (
    <div>
      <NavBar />
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