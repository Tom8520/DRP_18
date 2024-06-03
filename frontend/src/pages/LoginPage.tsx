import React, { useState } from 'react';
import './../styles/Login.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import client from '../client/client';

const LoginPage = () => {

  const [createAccountEmail, setCreateAccountEmail] = useState('');
  const [createAccountPassword, setCreateAccountPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  

  const handleSignUp = (e: any) => {
    e.preventDefault();
    const user = {
      email: createAccountEmail,
      password: createAccountPassword,
    }

    client.post("/signup", user).then(response => {
      console.log(response.data);
    }).catch((e:any) => {
      console.log(e);
    })
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login', { loginEmail, loginPassword });
  };

  return (
    <div>
      <NavBar />
      <br></br>
      <div className="container">
      <div className="signup">
        <h2>Create Account</h2>
        <form onSubmit={handleSignUp}>
          <label>Email</label>
          <input type="email" value={createAccountEmail} onChange={(e) => setCreateAccountEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" value={createAccountPassword} onChange={(e) => setCreateAccountPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;