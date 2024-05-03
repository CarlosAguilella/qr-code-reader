import React from 'react';
import './formCard.css';
import { Grid } from '@mui/material';

const PdfCreator = ({ qrDataURL, MYIMAGE, image, name, surname1, surname2, code }) => {
    return (
        <>
            <div className='pdf-card'>
                <Grid container>
                    <img src={MYIMAGE} className='logo' />
                    <Grid item xs={12} style={{ marginTop: '-107px' }}>
                        <div className='flex-space-around'>
                            <div>
                                <img src={image} className='image' />
                            </div>
                            <div>
                                <img src={qrDataURL} className='qr' />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={11}>
                        <div className='flex-start'>
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
                        <div>
                            <p className='input-date'>23.04.2024</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default PdfCreator;