import React, { useState, useRef } from 'react';
import QrReader from 'react-qr-reader';

import './cameraQr.css';

function CameraQr() {
    
    // Utils
    const [result, setresult] = useState(null);
    const [recording, setRecording] = useState(false);
    const previewStyle = { height: 240, width: 320 };
    const delay = 50;
    const camera = { facingMode: 'environment' };

    // open camera and reset result
    const openCamera = () => {
        setRecording(true);
        setresult(null);
    };

    // if the camera detects a QR code, it will be saved in the state
    const handleCameraScan = (data) => {
        if (data) {
            setresult(data);
            setRecording(false);
        }
    };

    // close camera if you press the button
    const closeCamera = () => {
        setRecording(false);
    }

    // if there is an error, it will be printed in the console
    const errorQr = (err) => { console.error(err); }

    return (
        <>
            <button onClick={openCamera}
                className={recording ? 'disappear' : ''}>
                Open the camera to scan QR
            </button>

            <div className={recording ? '' : 'disappear'}>
                <h2>Looking for QR</h2>
                <QrReader
                    scanDelay={delay}
                    containerStyle={previewStyle}
                    onScan={handleCameraScan}
                    onError={errorQr}
                    constraints={camera}
                    videoContainerStyle={{ width: '10px' }}
                />
            </div>

            {result && (
                <div>
                    <h2>Your result:</h2>
                    <p>{result}</p>
                </div>
            )}

            <button onClick={closeCamera}
                className={recording ? '' : 'disappear'}>
                Close camera
            </button>
        </>
    );
}

export default CameraQr;