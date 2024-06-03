import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../styles/Landing.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import client from '../client/client';

const UserAccountPage = () => {

  const [username, setUsername] = useState('')

  // useEffect(() => {
  //   // Send JWT token and retrieve data
  // } , [])

  return (
    <div>
      <NavBar/>
      <br></br>
      <div className="header">
        <h1 className='stylish-header'>Welcome</h1>
        <h3>Congratulations on finding your account {username}</h3>
      </div>
      <div>
      </div>
    </div>
  );
};

export default UserAccountPage;