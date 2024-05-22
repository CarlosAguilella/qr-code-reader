import React from "react";
import "./formulario.css";
import { Grid } from "@mui/material";

const FormularioPoli = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <>
            <h1>Formulario</h1>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <label className="flex-center">Nombre completo</label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <div className="flex-center">
                            <input type="text" name="nombre" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <label className="flex-center">DNI / NIE</label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <div className="flex-center">
                            <input type="text" name="dni" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <label className="flex-center">Domicilio</label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <div className="flex-center">
                            <input type="text" name="domicilio" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <label className="flex-center">Población</label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <div className="flex-center">
                            <input type="text" name="poblacion" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <label className="flex-center">¿Actúo en nombre de algún/a club/asociación/entidad?</label>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        <div className="flex-center">
                            <input type="text" name="club" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <label className="flex-center">CIF</label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <div className="flex-center">
                            <input type="text" name="cif" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <label className="flex-center">Dirección</label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <div className="flex-center">
                            <input type="text" name="direccion" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <label className="flex-center">Teléfono</label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <div className="flex-center">
                            <input type="text" name="telefono" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <label className="flex-center">Correo electrónico</label>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <div className="flex-center">
                            <input type="text" name="email" />
                        </div>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default FormularioPoli;