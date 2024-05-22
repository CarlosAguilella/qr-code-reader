import React from "react";
import "./formulario.css";
import { Grid } from "@mui/material";

const FormularioPoli = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <>
            <h1>Solicitud</h1>
            <form>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={6} md={3}>
                        <label className="flex-center">Pista que necesitas:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <div className="flex-center">
                            <select name="pista">
                                <option value="interior">Interior</option>
                                <option value="exterior">Exterior</option>
                            </select>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <label className="flex-center">Día y hora</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <div className="flex-center">
                            <input type="text" name="dia" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <label className="flex-center">Tipo de actividad</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <div className="flex-center">
                            <input type="text" name="actividad" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <label className="flex-center">Vestuarios:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <div className="flex-center">
                            <select name="vestuarios">
                                <option value="si">Sí</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <label className="flex-center">Número de asistentes</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <div className="flex-center">
                            <input type="text" name="deportistas" />
                        </div>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default FormularioPoli;