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

    return (
        <div className='camera-qr'>
            <Grid container>
                {result ? (
                    <Grid item xs={12}>
                        <div className={`qr-camera ${'result'}`}>
                            {result}
                        </div>
                    </Grid>
                ) : (
                    <>
                        <Grid item xs={12}>
                            {recording ? (
                                <div className={`camera-qr ${'video'}`}>
                                    <QrReader
                                        className={`camera-qr ${'qr-reader'}`}
                                        scanDelay={delay}
                                        onScan={handleCameraScan}
                                        onError={errorQr}
                                        constraints={camera}
                                    />
                                </div>
                            ) : (
                                <div className={`camera-qr ${'photo'}`}>
                                    <img src="qr-example.png" alt="qr-example" />
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {recording ? (
                                <div className={`camera-qr ${'button'}`} onClick={closeCamera}>
                                    PARAR DE ESCANEAR
                                </div>
                            ) : (
                                <div className={`camera-qr ${'button'}`} onClick={openCamera}>
                                    PULSA PARA ESCANEAR ENTRADA <br />Y/O CARNET DE SOCIO
                                </div>
                            )}
                        </Grid>
                    </>
                )}


            </Grid>
        </div >
    );
}

export default CameraQr;
