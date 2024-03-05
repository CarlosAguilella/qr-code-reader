import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
import QrReader from 'react-qr-reader';

import './scannerQr.css';

const DELAY = 50;
const CAMERA = { facingMode: 'environment' };
const MYIMAGE = 'qr-logo.png';
const RESULT2 = 'Nombre: Carlos\nApellido: Aguilella \nDNI: 12345678A\nFecha: 05/03/2024\nHora: 13:50\nCantidad: 1\nTipo: Entrada';

const ScannerQr = ({ setTypeView }) => {
    // Utils
    const [result, setResult] = useState(null);
    const [recording, setRecording] = useState(false);

    // open camera and reset result
    const openCamera = () => {
        setResult(null);
        setRecording(true);
        setTypeView('scan');
    };

    // close camera and reset result
    const closeCamera = () => {
        setRecording(false);
        setTypeView('both');
    }

    // if the camera detects a QR code, it will be saved in the state
    // the camera will be closed and a message will be displayed
    const handleCameraScan = (data) => {
        if (data) {
            setResult(data);
            setRecording(false);
            setTypeView('both');
            toast.success('Código QR leído correctamente.');
        }
    };

    // if there is an error, it will be printed in the console
    const errorQr = () => {
        toast.error('Ha ocurrido un error al intentar leer el código QR.');
    }

    return (
        <div className='scanner-qr'>
            {recording ? (
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
                        <Button className='scanner-button' onClick={closeCamera}>
                            PARAR DE ESCANEAR
                        </Button>
                    </div>
                </>
            ) : RESULT2 ? (
                <>
                    <div className='flex-center'>
                        <div className='scanner-result'>
                            {RESULT2}
                        </div>
                    </div>
                    <div className='flex-center'>
                        <Button className='scanner-button' onClick={openCamera}>
                            PULSA PARA VOLVER A ESCANEAR
                        </Button>
                    </div>
                </>
            ) : result ? (
                <>
                    <div className='flex-center'>
                        <div className='scanner-result'>
                            {result}
                        </div>
                    </div>
                    <div className='flex-center'>
                        <Button className='scanner-button' onClick={openCamera}>
                            PULSA PARA VOLVER A ESCANEAR
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className='flex-center'>
                        <img src={MYIMAGE} alt="MYIMAGE" />
                    </div>
                    <div className='flex-center'>
                        <Button className='scanner-button' onClick={openCamera}>
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