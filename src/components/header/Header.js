import React from "react";
import { Button, Grid } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

import './header.css';

const MYIMAGE = "AjuntamentDeLesAlqueries.png"

function Header({ setValueSelected }) {
    const handleTable = () => {
        let tmpSelected = 'table';
        setValueSelected(tmpSelected);
    }

    const handleCourse = () => {
        let tmpSelected = 'course';
        setValueSelected(tmpSelected);
    }

    const handleEvent = () => {
        let tmpSelected = 'event';
        setValueSelected(tmpSelected);
    }

    const handleProduct = () => {
        let tmpSelected = 'product';
        setValueSelected(tmpSelected);
    }

    return (
        <div className="header">
            <Grid container spacing={2} alignItems={'center'}>
                <Grid item xs={6}>
                    <div className="flex-start">
                        <Grid container spacing={2} alignItems={'center'}>
                            <Grid item xs={12}>
                                <img src={MYIMAGE} alt="Logo" />
                            </Grid>
                            <Grid item xs={12}>
                                <div className="flex-start header-subtitle">
                                    <h5>GESTIÓN PRODUCTOS</h5>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="flex-end header-title">
                        <h1>ADMIN</h1>
                        <PersonIcon className="person-icon" />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className='header-button'>
                        <Grid container spacing={2} alignItems={'center'}>
                            <Grid item xs={6}>
                                <div className="flex-end">
                                    <Button className="buttons" onClick={handleTable}>Table</Button>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="flex-start">
                                    <Button className="buttons" onClick={handleCourse}>Course</Button>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="flex-end">
                                    <Button className="buttons" onClick={handleEvent}>Event</Button>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="flex-start">
                                    <Button className="buttons" onClick={handleProduct}>Product</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Header;
