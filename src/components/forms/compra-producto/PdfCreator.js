import React from 'react';
import './compraProducto.css';
import { Grid } from '@mui/material';

const PdfCreator = ({ descCorta, descCortaM, descLarga, descLargaM, dataCompra, dataDirigido, dataCompraInfo, dataQR, MYIMAGE, MYIMAGE2, MYIMAGE3 }) => {

    const separarTexto = (descLarga) => {
        const fragmentos = descLarga.split('\n ');

        return fragmentos.map((fragmento, index) => (
            <span key={index} style={{ color: '#a3a5a7' }}>
                {fragmento.trim()}
                <br />
            </span>
        ));
    };

    return (
        <>
            <div className="pdf-producto">
                <Grid container>
                    <Grid item xs={12}>
                        <div className="flex-start">
                            <div>
                                <img src={MYIMAGE} className="logo" alt="logo" />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex-start">
                            <p className="compra-title"><strong>Entrada diaria piscina adulto</strong></p>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex-start">
                            <p className="descripcion-corta">
                                <img src={MYIMAGE2} className="image" alt="imagen" />
                                {descCorta}
                                {/* <br />
                                {descCortaM} */}
                                <br />
                                <br />
                                {separarTexto(descLarga)}
                                {/* <br />
                                {descLargaM} */}
                            </p>
                        </div>
                        <div className="flex-center">
                            <Grid container>
                                <Grid item xs={3}>
                                    <div>
                                        <p className="compra-subtitle1">Comprado por</p>
                                    </div>
                                </Grid>
                                <Grid item xs={9}>
                                    <div>
                                        <p className="compra-subtitle2">Dirigido a</p>
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div className="compra-data1">
                                        <Grid container>
                                            {Object.entries(dataCompra).map(([key, value], index) => (
                                                <React.Fragment key={index}>
                                                    <Grid item xs={6}>
                                                        {key === "Tarjeta (Les Alqueries en forma)" ? (
                                                            <p className="compra-info1" style={{ color: '#a3a5a7' }}>
                                                                <span>Tarjeta</span>
                                                                <span style={{ fontSize: '0.8em' }}> (Les Alqueries en forma)</span>
                                                            </p>
                                                        ) : (
                                                            <p className="compra-info1">{key}</p>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <p className="compra-info2">{value}</p>
                                                    </Grid>
                                                </React.Fragment>
                                            ))}
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item xs={9}>
                                    <div className="compra-data2">
                                        <Grid container>
                                            {Object.entries(dataDirigido).map(([key, value], index) => (
                                                <React.Fragment key={index}>
                                                    <Grid item xs={6}>
                                                        {key === "Tarjeta (Les Alqueries en forma)" ? (
                                                            <p className="compra-info1" style={{ color: '#a3a5a7' }}>
                                                                <span>Tarjeta</span>
                                                                <span style={{ fontSize: '0.8em' }}> (Les Alqueries en forma)</span>
                                                            </p>
                                                        ) : (
                                                            <p className="compra-info1">{key}</p>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <p className="compra-info2">{value}</p>
                                                    </Grid>
                                                </React.Fragment>
                                            ))}
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <p className="compra-subtitle3">Información de la compra</p>
                                    </div>
                                </Grid>
                                <Grid item xs={5}>
                                    <div className="compra-data3">
                                        <Grid container>
                                            {Object.entries(dataCompraInfo).map(([key, value], index) => (
                                                <React.Fragment key={index}>
                                                    <Grid item xs={6}>
                                                        <p className="compra-info1">{key}</p>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div className="compra-info2">
                                                            {value}
                                                        </div>
                                                    </Grid>
                                                </React.Fragment>
                                            ))}
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item xs={7}>
                                    <div>
                                        <img src={MYIMAGE3} className="image-qr" alt="imagen qr" />
                                        <p className="compra-qr">{dataQR}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="flex-start">
                                        <div>
                                            <img src={MYIMAGE} className="logo2" alt="logo" />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <p className="compra-subtitle4">Condicionado del producto</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default PdfCreator;