import React, { useState } from 'react'
import Webcam from 'react-webcam';
import { Dispatch, SetStateAction } from 'react';

const videoConstraints = {
  facingMode: "user"
};

function WebCam({ setShowCamera, setImageUrl }) {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imageSrc =  webcamRef.current.getScreenshot();
      setImageUrl(imageSrc)
      setShowCamera(false)
    },
    [webcamRef]
  );
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '2rem',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
      }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      </div>
    </div>
  )
}

export default WebCam;