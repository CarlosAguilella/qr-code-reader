import React from "react";

import './header.css';
import { Grid } from "@mui/material";

const Header = () => {
    return (
        <div className="header">
            <Grid container display={'flex'}>
                <Grid item xs={12}>
                    <div className='header-xl'>
                        <img src="header.png" alt="header" />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className='header-xs'>
                        <h1>Ajuntament de <br /> les Alqueries</h1>
                    </div>
                </Grid>
            </Grid>
        </div>

    );
}

export default Header;