import React, { useEffect, useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import {client} from '../client/client';
import { TransitionGroup } from 'react-transition-group';
import './../styles/UserAccount.css';
import {Link} from "react-router-dom";

const UserAccountPage = () => {

  const [username] = useState('')

  const [imgUrls, setImgUrls] = useState([]);
  const [photos, setPhotos] = useState<Array<Array<string>>>([]);
  const [photoType, setPhotoType] = useState('Personal');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        console.log(photoType);
        const response = await client.get(`/getImages`, {params: {
          type: photoType 
        }});
        console.log(response);
        setImgUrls(response.data.images);
        let newPhotos = [];
        for (let img of imgUrls) {
          const response2 = await client.get('/downloadImage?filename=' + img);
          console.log(typeof response2.data)
          // setPhotos([...photos, `data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(response2.data)`))}`]};
          // @ts-ignore
          console.log(...new Uint8Array(response2.data));
          // @ts-ignore
          let binary = `data:image/png;base64,${response2.data.image}`;

          newPhotos.push([binary, img]);
        }
        setPhotos(newPhotos);
        console.log(photos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
      setLoading(false);
    };
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoType]);

  useEffect(() => {
    setPhotoType('Organisation');
    setPhotoType('Personal');
  }, []);

  return (
    <div>
      <NavBar/>
      <br></br>
      <div className="header">
        <h1 className='stylish-header'>Welcome</h1>
        <h3>Congratulations on finding your account {username}</h3>
      </div>
      <div className="photo-container">
        <div className="toggle-buttons">
          <button
            className={photoType === 'Personal' ? 'active' : ''}
            onClick={() => setPhotoType('Personal')}
          >
            Organisation
          </button>
          <button
            className={photoType === 'Organisation' ? 'active' : ''}
            onClick={() => setPhotoType('Organisation')}
          >
            Personal
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TransitionGroup className="photo-grid">
            {photos.map((photo) => (
              <div className="photo-item">
                <Link to={"/main?filename=" + photo [1]}><img src={photo [0]} alt={`Photo `}/></Link>
              </div>
            ))}
          </TransitionGroup>
        )}
      </div>
    </div>
  );
};

export default UserAccountPage;