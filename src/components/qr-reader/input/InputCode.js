import React, { useState } from "react";
import { Grid, InputBase } from "@mui/material";

import './inputCode.css';

const InputCode = () => {
    // Utils
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    // this function will handle the input value
    const handleInput = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <div className="qr-input-code roboto">
            <Grid container>
                {open ? (
                    <>
                        <Grid item xs={12}>
                            <div className="qr-input-code input flex-center">
                                <InputBase
                                    className="qr-input-code input text"
                                    placeholder="Introduce el código"
                                    onChange={handleInput}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="flex-center">
                                <div className="qr-input-code button" onClick={() => setOpen(!open)}>ENVIAR</div>
                            </div>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={12}>
                            <div className='qr-input-code logo flex-center'>
                                <img src="mano.png" alt="qr-logo" />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="flex-center">
                                <div className="qr-input-code button" onClick={() => setOpen(!open)}>PULSA PARA HACERLO MANUALMENTE</div>
                            </div>
                        </Grid>
                    </>
                )}
            </Grid>
        </div>
    );
}

export default InputCode;