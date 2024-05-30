import React, { useState } from "react";
import { Grid } from "@mui/material";

import HorarioPolideportivo from "./HorarioPolideportivo";
import HorarioCampoDeFutbol from "./HorarioCampoDeFutbol";
import HorarioPiscina from "./HorarioPiscina";
import FormularioPoli from "./FormularioPoli";
import SolicitudPoli from "./SolicitudPoli";
import PreciosPoli from "./PreciosPoli";
import CarruselFutbol from "./CarruselFutbol";
import CarruselPoli from "./CarruselPoli";
import CarruselPiscina from "./CarruselPiscina";

import "./facilitiesForm.css";

const Formulario = () => {
    const [openDialogPoli, setOpenDialogPoli] = useState(false);
    const [openDialogCampo, setOpenDialogCampo] = useState(false);
    const [openDialogPisci, setOpenDialogPisci] = useState(false);
    const [openDialogForm, setOpenDialogForm] = useState(false);
    const [openDialogPrecios, setOpenDialogPrecios] = useState(false);

    const handleHorarioPolideportivo = () => {
        setOpenDialogPoli(true);
        setOpenDialogCampo(false);
        setOpenDialogPisci(false);
        setOpenDialogForm(false);
        setOpenDialogPrecios(false);
    }

    const handleHorarioCampoDeFutbol = () => {
        setOpenDialogPoli(false);
        setOpenDialogCampo(true);
        setOpenDialogPisci(false);
        setOpenDialogForm(false);
        setOpenDialogPrecios(false);
    }

    const handleHorarioPiscina = () => {
        setOpenDialogPoli(false);
        setOpenDialogCampo(false);
        setOpenDialogPisci(true);
        setOpenDialogForm(false);
        setOpenDialogPrecios(false);
    }

    const handleFormulario = () => {
        setOpenDialogPoli(false);
        setOpenDialogCampo(false);
        setOpenDialogPisci(false);
        setOpenDialogForm(true);
        setOpenDialogPrecios(false);
    }

    const handlePrecios = () => {
        setOpenDialogPoli(false);
        setOpenDialogCampo(false);
        setOpenDialogPisci(false);
        setOpenDialogForm(false);
        setOpenDialogPrecios(true);
    }

    return (
        <div className='facilities-form-container' style={{ margin: '1em' }}>
            <h1 className="header-form">Instalaciones</h1>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <div className="container-info">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <h3 className="flex-center">CAMPO DE FÚTBOL</h3>
                                <CarruselFutbol />
                                <div className="flex-space-around">
                                    {/* <a href="https://maps.app.goo.gl/ijWD9V4c6ZfuRrzJ8"><p>Localización</p></a> */}
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.308504443491!2d-0.1234101!3d39.89229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6005da157036cd%3A0x1ec4f846411a686c!2sInstalaciones%20deportivas%2C%20Alquer%C3%ADas%20del%20Ni%C3%B1o%20Perdido!5e1!3m2!1ses!2ses!4v1716890548968!5m2!1ses!2ses"
                                        width="60%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="flex-center">
                                    <a onClick={handleHorarioCampoDeFutbol} className="link"><p>Horario</p></a>
                                    <HorarioCampoDeFutbol open={openDialogCampo} onClose={() => setOpenDialogCampo(false)} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="container-info">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <h3 className="flex-center">PISCINA MUNICIPAL</h3>
                                <CarruselPiscina />
                                <div className="flex-space-around">
                                    {/* <a href="https://maps.app.goo.gl/Rcr4KEzBX8LygNrc9"><p>Localización</p></a> */}
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.1360915045443!2d-0.1173165!3d39.89557689999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6005d69a7a5683%3A0x2a32011efbb4a3b6!2sPiscina%20Municipal%20de%20les%20Alqueries!5e1!3m2!1ses!2ses!4v1716890971546!5m2!1ses!2ses"
                                        width="60%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="flex-center">
                                    <a onClick={handleHorarioPiscina} className="link"><p>Horario</p></a>
                                    <HorarioPiscina open={openDialogPisci} onClose={() => setOpenDialogPisci(false)} style={{ marginBottom: '2em' }} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="container-info">
                        <h3 className="flex-center">POLIDEPORTIVO MUNICIPAL</h3>
                        <CarruselPoli />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div className="flex-center">
                                    {/* <a href="https://maps.app.goo.gl/UKg3ZzWqMqMig8XD7"><p>Localización</p></a> */}
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d898.7846733348335!2d-0.1176509!3d39.8955273!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6005d79eb78877%3A0xc39d2fdcce8249af!2sPolideportivo%20Municipal!5e1!3m2!1ses!2ses!4v1716891017715!5m2!1ses!2ses"
                                        width="60%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="flex-center">
                                    <a onClick={handleHorarioPolideportivo} className="link"><p>Horario</p></a>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="flex-center">
                                    <a onClick={handlePrecios} className="link"><p>Precios</p></a>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="flex-center">
                                    <a onClick={handleFormulario} className="link"><p>Reservar</p></a>
                                </div>
                            </Grid>
                        </Grid>
                        <HorarioPolideportivo open={openDialogPoli} onClose={() => setOpenDialogPoli(false)} />
                        <PreciosPoli open={openDialogPrecios} onClose={() => setOpenDialogPrecios(false)} />
                        <FormularioPoli open={openDialogForm} onClose={() => setOpenDialogForm(false)} />
                        <SolicitudPoli open={openDialogForm} onClose={() => setOpenDialogForm(false)} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Formulario;