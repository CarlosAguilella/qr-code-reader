import React, { useState } from "react";
import { Grid } from "@mui/material";

import './inputCode.css';

const InputCode = () => {
    // Utils
    const [inputValue, setInputValue] = useState("");

    // this function will handle the input value
    const handleInput = (e) => {
        setInputValue(e.target.value);
    }

    // this function will alert the user if the input is empty
    const handleAlert = () => {
        if (inputValue === "" || inputValue === null) {
            return alert("Por favor, introduce un código");
        } else {
            alert("Código enviado, por favor espere...");
        }
    }

    return (
        <div className="input-code">
            <Grid container display={'flex'}>
                <Grid item xs={12}>
                    <div className='input-code logo'>
                        <img src="mano.png" alt="qr-logo" />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="input-code title">TAMBIÉN PUEDES INTRODUCIR EL CÓDIGO MANUALMENTE</div>
                </Grid>
                <Grid item xs={12}>
                    <input className="input-code input" placeholder="Introduce el código" onChange={handleInput} type="number" />
                </Grid>
                <Grid item xs={12}>
                    <div className="input-code button" onClick={handleAlert}>ENVIAR</div>
                </Grid>
            </Grid>
        </div>
    );
}

export default InputCode;