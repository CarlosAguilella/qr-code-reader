import React from "react";
import "./facilitiesForm.css";
import { Grid } from "@mui/material";

const FormularioPoli = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <>
            <h1 className="flex-start title-facilities-form">Solicitud</h1>
            <form className="facilities-form">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">Pista que necesitas:</label>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex-center">
                            <select className="facilities-form-input" name="pista">
                                <option value="interior">Interior</option>
                                <option value="exterior">Exterior</option>
                            </select>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">Día y hora</label>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex-center">
                            <input className="facilities-form-input" type="text" name="dia" />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">Tipo de actividad</label>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex-center">
                            <input className="facilities-form-input" type="text" name="actividad" />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">Vestuarios:</label>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex-center">
                            <select className="facilities-form-input" name="vestuarios">
                                <option value="si">Sí</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">Número de asistentes</label>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex-center">
                            <input className="facilities-form-input" type="text" name="deportistas" />
                        </div>
                    </Grid>
                </Grid>
            </form>
            <Grid container spacing={12}>
                <Grid item xs={6} className="flex-end">
                    <button className="flex-end" onClick={onClose}>Enviar</button>
                </Grid>
                <Grid item xs={6}>
                    <button className="flex-end" onClick={onClose}>Cancelar</button>
                </Grid>
            </Grid>
        </>
    );
}

export default FormularioPoli;