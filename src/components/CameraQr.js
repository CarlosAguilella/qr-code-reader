import React, { useState, useRef } from 'react';
import QrReader from 'react-qr-reader';

import './cameraQr.css';

function CameraQr() {
    // Utils
    const [resultado, setResultado] = useState(null);
    const [grabando, setGrabando] = useState(false);
    const previewStyle = { height: 240, width: 320 };
    const delay = 50;
    const camara = { facingMode: 'environment' };

    // open camera and reset result
    const openCamera = () => {
        setGrabando(true);
        setResultado(null);
    };

    // if the camera detects a QR code, it will be saved in the state
    const handleCameraScan = (data) => {
        if (data) {
            setResultado(data);
            setGrabando(false);
        }
    };

    // close camera if you press the button
    const closeCamera = () => {
        setGrabando(false);
    }

    // if there is an error, it will be printed in the console
    const errorQr = (err) => { console.error(err); }

    return (
        <>
            <button onClick={openCamera}
                className={grabando ? 'desaparecer input-container' : 'input-container'}>
                Abre la cámara para escanear
            </button>

            <div className={grabando ? 'input-container' : 'desaparecer input-container'}>
                <h2>Buscando QR</h2>
                <QrReader
                    scanDelay={delay}
                    containerStyle={previewStyle}
                    onScan={handleCameraScan}
                    onError={errorQr}
                    constraints={camara}
                    videoContainerStyle={{ width: '10px' }}
                />
            </div>

            {resultado && (
                <div className="resultado-container">
                    <h2>Tu resultado:</h2>
                    <p>{resultado}</p>
                </div>
            )}

            <button onClick={closeCamera}
                className={grabando ? 'input-container' : 'desaparecer input-container'}>
                Cerrar cámara
            </button>
        </>
    );
}

export default CameraQr;