import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { Grid, Button } from '@mui/material';
import { toast } from 'react-hot-toast';

import './scannerQr.css';

const Delay = 50;
const Camera = { facingMode: 'environment' };

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
        }
    };

    // if there is an error, it will be printed in the console
    const errorQr = (err) => {
        toast.error(err);
    }
    // tengo que instalar react-hot-toast
    // y hacerlo funcionar cuando se detecte un error
    // es una notificación que se muestra en pantalla y desaparece sola

    return (
        <div className='camera-qr'>
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
                                        scanDelay={Delay}
                                        onScan={handleCameraScan}
                                        onError={errorQr}
                                        constraints={Camera}
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
                                <img src="qr-logo.png" alt="qr-logo" />
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
        </div>
    );
}

export default ScannerQr;