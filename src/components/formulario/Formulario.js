import React, { useState } from "react";
import "./formulario.css";
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

const POLIDEPORTIVO = './POLIDEPORTIVO.jpg';
const CAMPODEFUTBOL = './CAMPODEFUTBOL.jpg';
const PISCINAMUNICIPAL = './PISCINAMUNICIPAL.jpg';

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
    }

    const handleHorarioCampoDeFutbol = () => {
        setOpenDialogPoli(false);
        setOpenDialogCampo(true);
        setOpenDialogPisci(false);
        setOpenDialogForm(false);
    }

    const handleHorarioPiscina = () => {
        setOpenDialogPoli(false);
        setOpenDialogCampo(false);
        setOpenDialogPisci(true);
        setOpenDialogForm(false);
    }

    const handleFormulario = () => {
        setOpenDialogPoli(false);
        setOpenDialogCampo(false);
        setOpenDialogPisci(false);
        setOpenDialogForm(true);
    }

    const handlePrecios = () => {
        setOpenDialogPoli(false);
        setOpenDialogCampo(false);
        setOpenDialogPisci(false);
        setOpenDialogPrecios(true);
    }

    return (
        <div className='formulario-container' style={{ margin: '1em' }}>
            <h1>Instalaciones</h1>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <div className="container-info">
                        <h5 className="flex-center">CAMPO DE FÚTBOL</h5>
                        <CarruselFutbol />
                        <div className="flex-space-around">
                            <a href="https://maps.app.goo.gl/ijWD9V4c6ZfuRrzJ8"><p>Localización</p></a>
                            <a onClick={handleHorarioCampoDeFutbol} className="link"><p>Horario</p></a>
                        </div>
                        <HorarioCampoDeFutbol open={openDialogCampo} onClose={() => setOpenDialogCampo(false)} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="container-info
                    ">
                        <h5 className="flex-center">PISCINA MUNICIPAL</h5>
                        <CarruselPiscina />
                        <div className="flex-space-around">
                            <a href="https://maps.app.goo.gl/Rcr4KEzBX8LygNrc9"><p>Localización</p></a>
                            <a onClick={handleHorarioPiscina} className="link"><p>Horario</p></a>
                        </div>
                        <HorarioPiscina open={openDialogPisci} onClose={() => setOpenDialogPisci(false)} style={{ marginBottom: '2em' }} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="container-info">
                        <h5 className="flex-center">POLIDEPORTIVO MUNICIPAL</h5>
                        <CarruselPoli />
                        <div className="flex-space-around">
                            <a href="https://maps.app.goo.gl/UKg3ZzWqMqMig8XD7"><p>Localización</p></a>
                            <a onClick={handleHorarioPolideportivo} className="link"><p>Horario</p></a>
                        </div>
                        <div className="flex-space-around">
                            <a onClick={handlePrecios} className="link"><p>Precios</p></a>
                            <a onClick={handleFormulario} className="link"><p>Reservar</p></a>
                        </div>
                        <HorarioPolideportivo open={openDialogPoli} onClose={() => setOpenDialogPoli(false)} />
                    </div>
                </Grid>
            </Grid>
            <PreciosPoli open={openDialogPrecios} onClose={() => setOpenDialogPrecios(false)} />
            <FormularioPoli open={openDialogForm} onClose={() => setOpenDialogForm(false)} />
            <SolicitudPoli open={openDialogForm} onClose={() => setOpenDialogForm(false)} />
        </div>
    );
}

export default Formulario;
