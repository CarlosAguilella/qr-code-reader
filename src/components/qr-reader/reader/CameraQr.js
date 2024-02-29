import React, { useState } from 'react';
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

    return (
        <div className='camera-qr roboto'>
            <Grid container>
                {result ? (
                    <Grid item xs={12}>
                        <div className='camera-qr result'>
                            {result}
                        </div>
                    </Grid>
                ) : (
                    <>
                        <Grid item xs={12}>
                            {recording ? (
                                <div className='flex-center'>
                                    <div className='camera-qr video'>
                                        <p>
                                            <QrReader
                                                scanDelay={delay}
                                                onScan={handleCameraScan}
                                                onError={errorQr}
                                                constraints={camera}
                                            />
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className='camera-qr logo flex-center'>
                                    <img src="qr-logo.png" alt="qr-logo" />
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {recording ? (
                                <div className='flex-center'>
                                    <div className='camera-qr button' onClick={() => setRecording(false)}>
                                        PARAR DE ESCANEAR
                                    </div>
                                </div>
                            ) : (
                                <div className='flex-center'>
                                    <div className='camera-qr button' onClick={openCamera}>
                                        PULSA PARA ESCANEAR ENTRADA Y/O CARNET
                                    </div>
                                </div>
                            )}
                        </Grid>
                    </>
                )}
            </Grid>
        </div>
    );
}

export default CameraQr;
