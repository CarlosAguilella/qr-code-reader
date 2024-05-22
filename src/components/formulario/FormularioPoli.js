import React from "react";
import "./facilitiesForm.css";
import { Grid } from "@mui/material";

const FormularioPoli = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <>
            <h1 className="title-facilities-form">Datos personales</h1>
            <form className="facilities-form flex-center">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">Nombre completo</label>
                        </Grid>
                        <Grid item xs={12}>
                        <div className="flex-start">
                            <input className="facilities-form-input" type="text" name="nombre" />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">DNI / NIE</label>
                        </Grid>
                        <Grid item xs={12}>
                        <div className="flex-center">
                            <input className="facilities-form-input" type="text" name="dni" />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">Domicilio</label>
                        </Grid>
                        <Grid item xs={12}>
                        <div className="flex-center">
                            <input className="facilities-form-input" type="text" name="domicilio" />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">Población</label>
                        </Grid>
                        <Grid item xs={12}>
                        <div className="flex-center">
                            <input className="facilities-form-input" type="text" name="poblacion" />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">¿Actúo en nombre de algún/a club/asociación/entidad?</label>
                        </Grid>
                        <Grid item xs={12}>
                        <div className="flex-center">
                            <input className="facilities-form-input" type="text" name="club" />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">CIF</label>
                        </Grid>
                        <Grid item xs={12}>
                        <div className="flex-center">
                            <input className="facilities-form-input" type="text" name="cif" />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">Dirección</label>
                        </Grid>
                        <Grid item xs={12}>
                        <div className="flex-center">
                            <input className="facilities-form-input" type="text" name="direccion" />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">Teléfono</label>
                        </Grid>
                        <Grid item xs={12}>
                        <div className="flex-center">
                            <input className="facilities-form-input" type="text" name="telefono" />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <label className="facilities-form-data flex-start">Correo electrónico</label>
                        </Grid>
                        <Grid item xs={12}>
                        <div className="flex-center">
                            <input className="facilities-form-input" type="text" name="email" />
                        </div>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default FormularioPoli;