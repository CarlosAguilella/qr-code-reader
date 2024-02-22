import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { Grid } from '@mui/material';

import './cameraQr.css';

function CameraQr() {

    // Utils
    const [result, setResult] = useState(null);
    const [recording, setRecording] = useState(false);
    const delay = 50;
    const previewStyle = { height: 240, width: 320 };
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

    return (
        <div className='camera-qr'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={`camera-qr ${recording ? 'button disappear' : 'button'}`} onClick={openCamera}>
                        Open the camera to scan QR
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={`camera-qr ${recording ? 'video' : 'video disappear'}`}>
                        <h2 className='camera-qr-tittle'>Looking for QR</h2>
                        <QrReader
                            scanDelay={delay}
                            containerStyle={previewStyle}
                            onScan={handleCameraScan}
                            onError={errorQr}
                            constraints={camera}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={`camera-qr ${'result'}`}>
                        {result && (
                            <div>
                                <h2>Your result:</h2>
                                <p>{result}</p>
                            </div>
                        )}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={`camera-qr ${recording ? 'button' : 'button disappear'}`} onClick={closeCamera}>
                        Close camera
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default CameraQr;