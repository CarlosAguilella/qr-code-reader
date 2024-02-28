import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";

import './inputCode.css';

const InputCode = () => {
    // Utils
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    // this function will handle the input value
    const handleInput = (e) => {
        setInputValue(e.target.value);
    }

    // this function changes between the input and the button
    const openInput = () => {
        setOpen(!open);
    }

    return (
        <div className="qr-input-code">
            <Grid container>
                {open ? (
                    <>
                        <Grid item xs={12}>
                            <div className="qr-input-code input">
                                <TextField
                                    className="qr-input-code input text"
                                    placeholder="Introduce el código"
                                    onChange={handleInput}
                                    fullWidth
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="qr-input-code title" onClick={openInput}>ENVIAR</div>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={12}>
                            <div className='qr-input-code logo'>
                                <img src="mano.png" alt="qr-logo" />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="qr-input-code title" onClick={openInput}>PULSA AQUÍ PARA HACERLO MANUALMENTE</div>
                        </Grid>
                    </>
                )}
            </Grid>
        </div>
    );
}

export default InputCode;