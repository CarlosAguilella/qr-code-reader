import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { Button } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';

import './scannerQr.css';

const DELAY = 50;
const CAMERA = { facingMode: 'environment' };
const MYIMAGE = 'qr-logo.png';

const ScannerQr = () => {
    // Utils
    const [result, setResult] = useState(null);
    const [recording, setRecording] = useState(false);

    // open camera  // and reset result
    const openCamera = () => {
        setRecording(true);
        setResult(null);
    };

    // if the camera detects a QR code, it will be saved in the state
    const handleCameraScan = (data) => {
        if (data) {
            setResult(data);
            setRecording(false);
            toast.success('Código QR leído correctamente.');
        }
    };

    // if there is an error, it will be printed in the console
    const errorQr = () => {
        console.error('Ha ocurrido un error al intentar leer el código QR.');
    }

    return (
        <div className='scanner-qr'>
            {result ? (
                <>
                    <div className='flex-center'>
                        {result}
                    </div>
                    <div className='flex-center'>
                        <Button className='scanner-button' variant="contained" onClick={openCamera}>
                            PULSA PARA ESCANEAR ENTRADA Y/O CARNET
                        </Button>
                    </div>
                </>

            ) : recording ? (
                <>
                    <div className='flex-center'>
                        <div className='scanner-video'>
                            <QrReader
                                scanDelay={DELAY}
                                onScan={handleCameraScan}
                                onError={errorQr}
                                constraints={CAMERA}
                            />
                        </div>
                    </div>
                    <div className='flex-center'>
                        <Button className='scanner-button' variant="contained" onClick={() => setRecording(false)}>
                            PARAR DE ESCANEAR
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className='flex-center'>
                        <img className='scanner-image' src={MYIMAGE} alt="MYIMAGE" />
                    </div>
                    <div className='flex-center'>
                        <Button className='scanner-button' variant="contained" onClick={openCamera}>
                            PULSA PARA ESCANEAR ENTRADA Y/O CARNET
                        </Button>
                    </div>
                </>
            )}
            <Toaster />
        </div>
    );
}

export default ScannerQr;