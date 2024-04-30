import React from 'react';
import './formCard.css';
import { Grid } from '@mui/material';

const PdfCreator = ({ qrDataURL, MYIMAGE, MYIMAGE3, image, name, surname1, surname2, code }) => {
    return (
        <>
            <div className='pdf-card'>
                <img src={MYIMAGE} className='logo' />
                <Grid container style={{ marginTop: '-55px' }}>
                    <Grid item xs={12}>
                        <div className='flex-space-around'>
                            <div>
                                <img src={image} className='image' />
                            </div>
                            <div>
                                <img src={MYIMAGE3} className='logo2' />
                            </div>
                            <div>
                                <img src={qrDataURL} className='qr' />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div style={{ marginTop: '10px' }}>
                            <p className='input-slogan'>LES ALQUERIES EN FORMA</p>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className='flex-start' style={{ marginTop: '10px' }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <div>
                                        <p className='input-name'>{name}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <p className='input-surname1'>{surname1}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <p className='input-surname2'>{surname2}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <p className='input-code'>{code}</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <div style={{ marginTop: '10px' }}>
                            <p className='input-date'>23.04.2024</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default PdfCreator;