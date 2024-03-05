import React from "react";
import { Grid } from "@mui/material";

import './header.css';

function Header() {
    return (
        <div className="header">
            <Grid container alignItems={'center'} spacing={2}>
                <Grid item xs={3}>
                    <div className='header-logo flex-end'>
                        <p>🛡️</p>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div className='header-title'>
                        <p>AJUNTAMENT DE LES ALQUERIES</p>
                    </div>
                </Grid>                
                <Grid item xs={12}>
                    <div className='header-subtitle flex-end'>
                        <p>CONTROLLER &nbsp;&nbsp;👤</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Header;
