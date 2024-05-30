import React, {ChangeEventHandler,useState} from 'react';
import './../styles/Landing.css';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const UploadImagePage = () => {

  const [image, setImage] = useState("");

  const handleUploadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    try {
      const file = e.target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onerror = (err) => {
          console.log(err);
        };
        reader.onload = () => {
          setImage(reader.result as string);
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

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
          <h1 className='stylish-header'>AI Diagram Tool</h1>
        </div>
        <div className="div-container">
          <div className="button-container">
            <button className="styled-button">Camera</button>
          </div>  
          <div className="button-container">
            <input id="file-upload" onChange={e => handleUploadImage(e)} type="file" accept="image/*" hidden/>
            <label htmlFor="file-upload" className="styled-button">Upload Image</label>
          </div>
        </div>
        <div className="imageContainer">
          <img alt="Upload an image" src={image} className="imagePreview"/>
        </div>
      </div>
    );
  };

export default UploadImagePage;