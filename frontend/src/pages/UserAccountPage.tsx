import React, { useEffect, useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import client from '../client/client';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './../styles/UserAccount.css';
import { Image } from '../objects/photo';
// import testImage from './testImage.png';

const UserAccountPage = () => {

  const [username] = useState('')
  // const pics = [testImage, testImage, testImage, testImage, testImage, testImage, testImage];

  // useEffect(() => {
  //   // Send JWT token and retrieve data
  // } , [])

  const [photos, setPhotos] = useState<Array<Image>>([]);
  const [photoType, setPhotoType] = useState('personal');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, [photoType]);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await client.get(`/photos/${photoType}`);
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
    setLoading(false);
  };

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
        className={photoType === 'personal' ? 'active' : ''}
        onClick={() => setPhotoType('personal')}
      >
        Personal
      </button>
      <button
        className={photoType === 'organisation' ? 'active' : ''}
        onClick={() => setPhotoType('organisation')}
      >
        Organisation
      </button>
    </div>
    {loading ? (
      <p>Loading...</p>
    ) : (
      // <TransitionGroup className="photo-grid">
      //   {photos.map((photo) => (
      //     <CSSTransition key={photo.id} timeout={500} classNames="photo">
      //       <div className="photo-item">
      //         <img src={photo.url} alt={`Photo ${photo.id}`} />
      //       </div>
      //     </CSSTransition>
      //   ))}
      // </TransitionGroup>
      <TransitionGroup className="photo-grid">
      {/* {pics.map((photo) => (
        <CSSTransition timeout={500} classNames="photo">
          <div className="photo-item">
            <img src={photo} alt={`Photo ${photo}`} />
          </div>
        </CSSTransition>
      ))} */}
    </TransitionGroup>
    )}
  </div>
    </div>
  );
};

export default UserAccountPage;