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
    const resultFake = 'BEGIN:VCARD VERSION:3.0 N:EJEMPLO;EJEMPLO EJEMPLO EJEMPLO TITLE EJEMPLO ORG EJEMPLO URL EJEMPLO EMAIL;TYPE=INTERNE EJEMPLO TEL;TYPE=voice,work,pref EJEMPLO TEL;TYPE=voice,home,pref EJEMPLO TEL;TYPE=voice,cell,pref EJEMPLO TEL;TYPE=fax,work,pref EJEMPLO TEL;TYPE=fax,home,pref EJEMPLO ADR;;EJEMPLO;EJEMPLO;EJEMPLO;EJEMPLO;EJEMPLO END VCARD';

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
                        <div className='camera-qr result'>
                            {result}
                        </div>
                    </Grid>
                ) : (
                    <>
                        <Grid item xs={12}>
                            {recording ? (
                                <div className='camera-qr video'>
                                    <QrReader
                                        scanDelay={delay}
                                        onScan={handleCameraScan}
                                        onError={errorQr}
                                        constraints={camera}
                                    />
                                    <p>11</p>
                                    <p>22</p>
                                    <p>33</p>
                                    <p>44</p>

                                </div>

                            ) : (
                                <div className='camera-qr logo'>
                                    <img src="qr-logo.png" alt="qr-logo" />
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {recording ? (
                                <div className='camera-qr button' onClick={closeCamera}>
                                    PARAR DE ESCANEAR
                                </div>
                            ) : (
                                <div className='camera-qr button' onClick={openCamera}>
                                    PULSA PARA ESCANEAR ENTRADA Y/O CARNET DE SOCIO
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
