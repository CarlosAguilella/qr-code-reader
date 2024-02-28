import React from "react";
import { Grid } from "@mui/material";

import './inputCode.css';

const InputCode = () => {

    const handleAlert = () => {
        alert("Código enviado, por favor espere...");
    }

    return (
        <div className="input-code">
            <Grid container display={'flex'}>
                <Grid item xs={12}>
                    <div className='camera-qr logo'>
                        <img src="mano.png" alt="qr-logo" />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="input-code title">TAMBIÉN PUEDES INTRODUCIR EL CÓDIGO MANUALMENTE</div>
                </Grid>
                <Grid item xs={12}>
                    <div className="input-code description">
                        <input className="input-code description input" type="text" placeholder="Introduce el código" />
                        <div className="input-code description button" onClick={handleAlert}>ENVIAR</div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default InputCode;