import React, { useState, useRef } from 'react';
import QrReader from 'react-qr-reader';
import { Grid } from '@mui/material';

import './cameraQr.css';

function CameraQr() {

    // Utils
    const [result, setResult] = useState(null);
    const [recording, setRecording] = useState(false);
    const delay = 50;
    const camera = { facingMode: 'environment' };

    // open camera and reset result
    const openCamera = () => {
        setRecording(true);
        setResult(null);
    };

    // if the camera detects a QR code, it will be saved in the state
    const handleCameraScan = (data) => {
        if (data) {
            setResult(data);
            setRecording(false);
        }
    };

    // close camera if you press the button
    const closeCamera = () => {
        setRecording(false);
    }

    // if there is an error, it will be printed in the console
    const errorQr = (err) => { console.error(err); }

    // this is only for upload an image
    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        event.preventDefault();
        setFile(event.target.files[0]);
        let imageFile = event.target.files[0];
        if (imageFile) {
            const localImageUrl = URL.createObjectURL(imageFile);
            setImageSrc(localImageUrl);
        }
    };

    return (
        <div className='camera-qr'>
            <Grid container spacing={2} alignContent={'center'}>
                <Grid item xs={12}>
                    <h1>This website is responsible for reading QR codes</h1>
                    <h2>To do this, you can open your device's camera</h2>
                </Grid>
                <Grid item xs={12}>
                    <div className={`camera-qr ${recording ? 'button disappear' : 'button'}`} onClick={openCamera}>
                        Open the camera to scan QR
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={`camera-qr ${recording ? 'video' : 'video disappear'}`}>
                        <h2 className={`camera-qr ${'tittle'}`}>Looking for QR</h2>
                        <QrReader
                            className={`camera-qr ${'qr-reader'}`}
                            scanDelay={delay}
                            onScan={handleCameraScan}
                            onError={errorQr}
                            constraints={camera}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={`camera-qr ${recording ? 'button' : 'button disappear'}`} onClick={closeCamera}>
                        Close camera
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={`qr-camera ${'result'}`}>
                        <h2>{result}</h2>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <h2>Or you can upload an image with a QR code</h2>
                        {file && <img src={imageSrc} width="256" />}
                        {!file && (
                            <div className={`camera-qr ${'button'}`}
                                onClick={() => fileInputRef.current.click()}
                            >
                                Upload an image
                            </div>
                        )}
                        <br />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={(event) => handleFileChange(event)}
                            hidden
                        />
                        {file && (
                            <div className={`camera-qr ${'button'}`} onClick={() => setFile(null)}>
                                Erase
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div >
    );
}

export default CameraQr;
