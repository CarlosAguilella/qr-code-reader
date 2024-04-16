import React from "react";
import { Button } from '@mui/material';
import './header.css';

function Header({ onValueChange }) {
    return (
        <div className="header">
            <div className='header-title flex-start'>
                <Button onClick={() => onValueChange(true)}>Rellenar formulario</Button>
            </div>
        </div>
    );
}

export default Header;
