import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './../styles/Landing.css';

const UploadImagePage = () => {

  const handleUploadImage = () => {
    
  }

    return (
      <div>
        <div className="header">
          <h1>Camera</h1>
        </div>
        <div className="container">
          <p className="description"></p>
          <div className="button-container">
            <Link to="/login" className="styled-button">Login</Link>
          </div>  
          <div className="button-container">
            <button className="styled-button" onClick={handleUploadImage}>Upload Image</button>
          </div>
        </div>
        <div className="imageContainer">
        </div>
      </div>
    );
  };

export default UploadImagePage;