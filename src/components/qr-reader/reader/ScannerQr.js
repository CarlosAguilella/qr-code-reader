import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { Grid, Button } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';

// llamar scanner a todo
// intentar quitar grid

import './scannerQr.css';

// Aquí he agregado las constantes que tenía dentro
// también he creado la constante de la foto.
// todo mayus
const DELAY = 50;
const CAMERA = { facingMode: 'environment' };
const MYIMAGE = 'qr-logo.png';

// ¡¡¡NO USAR FUNCTION!!!
// function ScannerQr() {
    // Esto ya no se usa desde hace años

const ScannerQr = () => {
    // Utils
    const [result, setResult] = useState(null);
    const [recording, setRecording] = useState(false);

    // open camera  // and reset result
    const openCamera = () => {
        setRecording(true);
        // setResult(null);
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
    // instalar react-hot-toast
    // hacerlo funcionar cuando se detecte un error
    // esto es una notificación que se muestra en pantalla y desaparece sola

    return (
        <div className='scanner-qr'>
            <Grid container spacing={2} alignItems={'center'}>
                {result ? (
                    <Grid item xs={12}>
                        <div className='flex-center'>
                            {result}
                        </div>
                    </Grid>
                ) : recording ? (
                    <>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
                            <div className='flex-center'>
                                <Button className='scanner-button' variant="contained" onClick={() => setRecording(false)}>
                                    PARAR DE ESCANEAR
                                </Button>
                            </div>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={12}>
                            <div className='flex-center'>
                                <img src={MYIMAGE} alt="MYIMAGE" />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='flex-center'>
                                <Button className='scanner-button' variant="contained" onClick={openCamera}>
                                    PULSA PARA ESCANEAR ENTRADA Y/O CARNET
                                </Button>
                            </div>
                        </Grid>
                    </>
                )}
            </Grid>
            <Toaster />
        </div>
    );
}

export default ScannerQr;