import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Landing.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';


const LandingPage = () => {

  return (
    <>
    <div>
      <NavBar />
      <br></br>
      <>
      <div className="header">
        <h1 className='stylish-header'>AI Diagram Tool</h1>
        <h3 className='stylish-subheader'>Make diagrams easier to understand with the power of AI and AR.</h3>
      </div>
      <div className="div-container">
        <div className="button-container">
          <Link to="/login" className="styled-button">Login</Link>
        </div>  
        <div className="button-container">
          <Link to="/main" className="styled-button">Try It Out</Link>
        </div>
      </div>
      <div className="instructions">
        <div>
          <p className="instructions-header">How do I get started?</p>
        </div>
          <p >1. Click Upload Image, or take a photo by pressing Camera.</p>
          <img src="landing_page_assets/1.png" alt="1"></img>
          <p >2. The diagram should now be on display.</p>
          <img src="landing_page_assets/2.png" alt="2"></img>
          <p className="instructions-text">3. Open up the chatbot on the bottom right of the page.</p>
          <img src="landing_page_assets/3.png" alt="3"></img>
          <p className="instructions-text">4. Ask it to help you with understanding your diagram.</p>
          <img src="landing_page_assets/4.png" alt="4"></img>
      </div>
      </>
      </div>
      </>
  );
};

export default LandingPage;
