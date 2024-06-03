import React from 'react';
import './../styles/Landing.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';

const ErrorPage = () => {

  return (
    <div>
      <NavBar />
      <br></br>
      <div className="header">
        <h1 className='stylish-header'>Error</h1>
        <h3>Sorry, the page you're looking for could not be found</h3>
      </div>
    </div>
  );
};

export default ErrorPage;