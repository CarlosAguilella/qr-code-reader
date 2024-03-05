import React, { useState } from "react";
import { InputBase, Button, InputAdornment } from "@mui/material";

import './formCode.css';

const MYIMAGE = 'mano.png';

const InputCode = ({ setTypeView }) => {
    // Utils
    const [open, setOpen] = useState(false);
    
    // Values
    const [inputValue, setInputValue] = useState(null);
    
    // open form to introduce the code
    const openForm = () => {
        setInputValue(null);
        setOpen(true);
        setTypeView('form');
    }

    // close form
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
                        <Button className="input-button">
                            ENVIAR
                        </Button>
                    </div>
                    <div className="flex-center">
                        <Button className="input-button" onClick={closeForm}>
                            CANCELAR
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className='flex-center'>
                        <img src={MYIMAGE} alt="MYIMAGE" />
                    </div>
                    <div className="flex-center">
                        <Button className='input-button' onClick={openForm}>
                            PULSA PARA HACERLO MANUALMENTE
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default InputCode;
