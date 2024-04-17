import React from "react";
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';

import './header.css';
import { Grid } from "@mui/material";

const MYIMAGE = "AjuntamentDeLesAlqueries.png"

function Header({ onValueChange }) {
    return (
        <div className="header">
            <Grid container spacing={2} alignItems={'center'}>
                <Grid item xs={6}>
                    <div className="flex-start">
                        <img src={MYIMAGE} alt="Logo" />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className='flex-end header-button'>
                        <AddCircleOutlineSharpIcon className='header-icon' onClick={() => onValueChange(true)} />
                        <span className="header-text" onClick={() => onValueChange(true)} >AÑADIR PRODUCTO</span>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Header;
