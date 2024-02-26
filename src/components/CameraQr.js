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
    const result2 = '    Nombre  Introduce ContenidoIntroducIntroduce Contenidoe Contenido  Apellido    Organización    PuestoIntroduce ContenidoIntroducIntroduce Contenidoe Contenido (trabajo)    Teléfono (trabajo)    Teléfono (privado)    Phone (Mobile)    Fax (trabajo)    Fax (privado)    Correo ElectrónicoIntroduce ContenidoIntroducIntroduce Contenidoe Contenido    Dirección URL    Callele    Código postal    Ciudadcle    Código postal    Ciudadc    Código postal    Ciudadc    Estado    País';
    
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
                {result2 ? (
                    <Grid item xs={12}>
                        <div className={`qr-camera ${'result'}`}>
                            {result2}
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
                            )
                                : (
                                    <div className={`camera-qr ${'button'}`} onClick={openCamera}>
                                        PULSA PARA ESCANEAR ENTRADA <br />Y/O CARNET SOCIO
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
