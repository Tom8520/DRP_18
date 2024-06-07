import React, { useEffect, useState } from 'react';
import './../styles/Login.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import {client, setAuthToken} from '../client/client';

const LoginPage = () => {

  const navigate = useNavigate();
  const [createAccountEmail, setCreateAccountEmail] = useState('');
  const [createAccountPassword, setCreateAccountPassword] = useState('');
  const [createAccountError, setCreateAccountError] = useState('');
  const [createAccountSuccess, setCreateAccountSuccess] = useState(false);
  const [orgCode, setOrgCode] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  

  const handleSignUp = (e: any) => {
    e.preventDefault();
    const user = {
      email: createAccountEmail,
      password: createAccountPassword,
      orgCode: orgCode
    }

    client.post("/signup", user).then(response => {
      if (response.status !== 200) {
        setCreateAccountError("You moron");
      } else {
        setCreateAccountError('');
        setCreateAccountSuccess(true);
      }
      console.log(response.data);
    }).catch((e:any) => {
      console.log(e);
    })
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    client.get("/login", {params: {
      email: loginEmail,
      password: loginPassword,
    }
  }).then(response => {
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setAuthToken(token);
        setLoginError('');
        setLoginSuccess(true);
      } else {
        setLoginError("Invalid Credentials!")
      }   
      console.log(response.data);
    }).catch((e:any) => {
      setLoginError("Invalid Credentials!")
      console.log(e);
    })
  };

  useEffect(() => {
    if (loginSuccess) {
      navigate("/user");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginSuccess]);

  useEffect(() => {
    if (createAccountSuccess) {
      navigate("/user");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createAccountSuccess]);

  return (
    <div>
      <NavBar />
      <br></br>
      <div className="container">
      <div className="signup">
        <h2>Create Account</h2>
        <form onSubmit={handleSignUp}>
          <label>Email</label>
          <input type="text" value={createAccountEmail} onChange={(e) => setCreateAccountEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" value={createAccountPassword} onChange={(e) => setCreateAccountPassword(e.target.value)} required />
          <label>Organisation Code</label>
          <input type="text" value={orgCode} onChange={(e) => setOrgCode(e.target.value)} required />
          {!loginSuccess && <p className="error_text">{createAccountError}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="text" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
          {!loginSuccess && <p className="error_text">{loginError}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;