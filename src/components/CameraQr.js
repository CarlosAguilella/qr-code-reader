import React, { useState, useRef } from 'react';
import QrReader from 'react-qr-reader';

function CameraQr() {
    const [resultado, setResultado] = useState(null);
    const [grabando, setGrabando] = useState(false);
    const previewStyle = { height: 240, width: 320 };
    const delay = 50;
    const camara = { facingMode: 'environment' };

    const openCamera = () => {
        setGrabando(true);
        setResultado(null);
    };

    const handleCameraScan = (data) => {
        if (data) {
            setResultado(data);
            setGrabando(false);
        }
    };

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
                />
            </div>

            {resultado && (
                <div className="resultado-container">
                    <h2>Tu resultado:</h2>
                    <p>{resultado}</p>
                </div>
            )}

        </>

    );
}

export default CameraQr;