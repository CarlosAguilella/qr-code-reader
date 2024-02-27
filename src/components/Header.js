import React from "react";
import { Grid } from "@mui/material";

import { useWindowSize } from './hooks/useWindowsSize';

import './header.css';

function Header() {
    
    //Global Utils
    const { width } = useWindowSize();

    return (
        <div className="header">
            <Grid container display={'flex'} spacing={2}>
                <Grid item xs={3} sm={2}>
                    <div className={`header ${'logo'}`}>
                        <p>🛡️</p>
                    </div>
                </Grid>
                <Grid item xs={9} sm={10}>
                    <div className={`header ${'title'}`}>
                        <p>AJUNTAMENT DE LES ALQUERIES</p>
                    </div>
                </Grid>
                <Grid item xs={width > 400 ? 7 : 6} sm={8} md={width > 1500 ? 9 : 8}>
                </Grid>
                <Grid item xs={width > 400 ? 5 : 6} sm={4} md={width > 1500 ? 3 : 4}>
                    <div className={`header ${'subtitle'}`}>
                        <p>CONTROLLER &nbsp;&nbsp;&nbsp;&nbsp; 👤</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Header;
