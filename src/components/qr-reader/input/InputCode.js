import React, { useState } from "react";
import { Grid, InputBase, Button, InputAdornment } from "@mui/material";

import './inputCode.css';

const myImage = 'mano.png';

const InputCode = () => {
    // Utils
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    return (
        <div className="form-code">
            <Grid container spacing={2} alignItems={'center'}>
                {/* Se debe usar siempre la misma estructura, esto ayuda a que el código sea más legible */}
                {open ? (
                    <>
                        <Grid item xs={12}>
                            <div className="flex-center">
                                <InputBase
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Introduce el código"
                                    fullWidth
                                    className="input-code"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <i>📥</i>
                                        </InputAdornment>
                                    }
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="flex-center">
                                <Button className="send-button" variant="contained" onClick={() => setOpen(!open)}>
                                    ENVIAR
                                </Button>
                            </div>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={12}>
                            <div className='flex-center'>
                                <img src={myImage} alt="myImage" />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="flex-center">
                                <Button className='send-button' variant="contained" onClick={() => setOpen(!open)}>
                                    PULSA PARA HACERLO MANUALMENTE
                                </Button>
                            </div>
                        </Grid>
                    </>
                )}
            </Grid>
        </div>
    );
}

export default InputCode;