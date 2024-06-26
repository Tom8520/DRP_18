import React, {ChangeEventHandler, MouseEventHandler, useEffect, useState} from 'react';
import './../styles/Landing.css';
import NavBar from '../components/NavBar';
import WebCam from '../components/WebCam';
import {client} from '../client/client';
import {useSearchParams} from "react-router-dom";

const UploadImagePage = () => {

  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const [showConfirmUpload, setshowConfirmUpload] = useState(false);
  const [comments, setComments] = useState<Array<string>>([]);
  const [searchParams, _] = useSearchParams();
  const [comment, setComment] = useState("");
  const [timer, setTimer] = useState(true);
  const filename = searchParams.get("filename");


  const confirmUpload = (organisation: Boolean) => {

    let formData = new FormData();
    // @ts-ignore
    formData.append("file", file);
    formData.append("organisation", organisation ? "true" : "false");

    client.post("/upload", formData, {headers: {
      'Content-Type': 'multipart/form-data'
    }}).then(response => {
      if (response.status === 200) {
        console.log("Yay");
      } else {
        console.log("Nay");
      }
    })
  }

  const handleUploadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    setshowConfirmUpload(true);
    try {
      const file = e.target.files?.[0];
      // @ts-ignore
      setFile(file);

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

  const saveComment: MouseEventHandler = async (_) => {

    let formData = new FormData();
    formData.append("comment", comment);
    // @ts-ignore
    formData.append("filename", filename);
    await client.post("/saveComment", formData)

    setComment("");
  }

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
          const response2 = await client.get('/downloadImage?filename=' + filename);
          // @ts-ignore
          let binary = `data:image/png;base64,${response2.data.image}`;

          setImage(binary);

      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response2 = await client.get('/getComments?filename=' + filename);

        setComments(response2.data.comments);

      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment, timer]);



  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(!timer);
      console.log("x");
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
      <div>
        <NavBar />
        <br></br>
        <div className="header">
          <h1 className='stylish-header'>AI Diagram Tool</h1>
        </div>
        {filename == null ? <>
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
        </> : <></>}
          <div className="imageContainer">
            <img alt="Upload an image" src={image} className="imagePreview"/>
          </div>

        {showConfirmUpload &&
            <div className="button-container">
              <button className="styled-button" onClick={() => confirmUpload(false)}>Upload</button>
              <button className="styled-button" onClick={() => confirmUpload(true)}>Upload to organisation</button>
            </div>
        }

        {filename != null && <>
          <div className={"comments-container"}>
            {comments.map((comment) => {
              if (comment === "") {
                return <></>
              }
              return <div className="comment-div">
                {comment}
              </div>
            })}
              <table>
              <tr>
                  <td>
                      <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                  </td>
                  <td>
                      <button className="styled-button" onClick={saveComment}>Post</button>
                  </td>
              </tr>
              </table>
          </div>
          </>
        }
      </div>
  );
};

export default UploadImagePage;