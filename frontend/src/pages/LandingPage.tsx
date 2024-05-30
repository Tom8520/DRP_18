import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './../styles/Landing.css';

const LandingPage = () => {

  return (
    <div>
      <div className="header">
        <h1>Diagram Tool</h1>
        <h3>Make diagrams easier to understand with the power of AI and AR.</h3>
      </div>
      <div className="container">
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