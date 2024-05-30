import React, {ChangeEventHandler,useState} from 'react';
import { Link } from 'react-router-dom';
import './../styles/Landing.css';

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
        <div className="header">
          <h1 className='stylish-header'>Camera</h1>
        </div>
        <div className="div-container">
          <div className="button-container">
            <Link to="/login" className="styled-button">Login</Link>
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