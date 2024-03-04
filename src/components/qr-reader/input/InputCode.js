import React, { useState } from "react";
import { InputBase, Button, InputAdornment } from "@mui/material";

import './inputCode.css';

const MYIMAGE = 'mano.png';

const InputCode = ({ setTypeView }) => {
    // Utils
    const [inputValue, setInputValue] = useState(null);
    const [open, setOpen] = useState(false);

    // open form to introduce the code
    const openForm = () => {
        setInputValue(null);
        setOpen(true);
        setTypeView('form');
    }

    // send the code to the parent component
    const closeForm = () => {
        setOpen(false);
        setTypeView('both');
    }

    return (
        <div className="form-code">
            {open ? (
                <>
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
                    <div className="flex-center">
                        <Button className="send-button" variant="contained" onClick={closeForm}>
                            ENVIAR
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className='flex-center'>
                        <img src={MYIMAGE} alt="MYIMAGE" />
                    </div>
                    <div className="flex-center">
                        <Button className='send-button' variant="contained" onClick={openForm}>
                            PULSA PARA HACERLO MANUALMENTE
                        </Button>
                    </div>
                </>

            )}


        </div>
    );
}

export default InputCode;
