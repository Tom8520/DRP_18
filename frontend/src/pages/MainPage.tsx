import React, {ChangeEventHandler,useState} from 'react';
import './../styles/Landing.css';
import NavBar from '../components/NavBar';
import WebCam from '../components/WebCam';

const UploadImagePage = () => {

  const [image, setImage] = useState("");
  const [useCamera, setUseCamera] = useState(false);

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
        <NavBar />
        <br></br>
        <div className="header">
          <h1 className='stylish-header'>AI Diagram Tool</h1>
        </div>
        <div className="div-container">
          <div className="button-container">
            <button className="styled-button" onClick={() => setUseCamera(true)}>Camera</button>
          </div>  
          <div>
            {useCamera && <WebCam setShowCamera={setUseCamera} setImageUrl={setImage}/>}
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