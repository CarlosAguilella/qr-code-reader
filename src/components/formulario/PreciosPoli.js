import React from "react";
import "./facilitiesForm.css";
import { Grid } from "@mui/material";

const PreciosPoli = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <>
            <div className="price-table">
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <div className="price-header">
                            <Grid container spacing={4}>
                                <Grid item xs={6} md={8}>
                                    <h3>Utilización Pabellón Polideportivo, incluidos vestuarios y duchas</h3>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <h3>Con luz</h3>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <h3>Sin luz</h3>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="info-price">
                            <Grid container spacing={4}>
                                <Grid item xs={6} md={8}>
                                    <div>Una hora Pista baloncesto</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>40,00€</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>30,00€</div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="info-price">
                            <Grid container spacing={4}>
                                <Grid item xs={6} md={8}>
                                    <div>Una hora Pista balonmano</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>40,00€</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>30,00€</div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="info-price">
                            <Grid container spacing={4}>
                                <Grid item xs={6} md={8}>
                                    <div>Una hora Gimnasia</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>40,00€</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>30,00€</div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="info-price">
                            <Grid container spacing={4}>
                                <Grid item xs={6} md={8}>
                                    <div>Una hora Actividades Deportivas Especiales</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>18,00€</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>12,00€</div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={4} style={{ marginTop: '2em' }}>
                    <Grid item xs={12}>
                        <div className="price-header">
                            <Grid container spacing={4}>
                                <Grid item xs={6} md={8}>
                                    <h3>Utilización Pistas Polideportivas al aire libre, no incluye vestuarios ni duchas</h3>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <h3>Con luz</h3>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <h3>Sin luz</h3>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="info-price">
                            <Grid container spacing={4}>
                                <Grid item xs={6} md={8}>
                                    <div>Una hora Pista de Paddle</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>6,00€</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>6,00€</div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="info-price">
                            <Grid container spacing={4}>
                                <Grid item xs={6} md={8}>
                                    <div>Una hora Pista Futbol, Balonmano o Baloncesto</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>------</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>------</div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="info-price">
                            <Grid container spacing={4}>
                                <Grid item xs={6} md={8}>
                                    <div>Una hora resto de pistas</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>------</div>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <div>------</div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="flex-center">
                <button onClick={onClose}>Cerrar</button>
            </div>
        </>
    );
}

export default PreciosPoli;