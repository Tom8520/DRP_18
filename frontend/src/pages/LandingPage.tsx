import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './../styles/Landing.css';

const LandingPage = () => {

  return (
    <div className="container">
      <div className="box">
        <h2></h2>
        <p className="description"></p>
        <div className="button-container">
          <Link to="/login" className="styled-button"></Link>
        </div>
      </div>
      <div className="box">
        <h2></h2>
        <p className="description"></p>
        <div className="button-container">
          <Link to="/nextpage" className="styled-button"></Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;