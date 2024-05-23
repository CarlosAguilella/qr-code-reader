import React from "react";
import { Grid } from "@mui/material";
import "./facilitiesForm.css";

const HorarioCampoDeFutbol = ({ open, onClose }) => {
    if (!open) return null;

    const rowsCAMPODEFUTBOL = [
        { id: 1, dia: 'Lunes', horario: '17:00 - 21:00h' },
        { id: 2, dia: 'Martes', horario: '17:00 - 21:00h' },
        { id: 3, dia: 'Miércoles', horario: '17:00 - 21:00h' },
        { id: 4, dia: 'Jueves', horario: '17:00 - 21:00h' },
        { id: 5, dia: 'Viernes', horario: '17:00 - 21:00h' },
        { id: 6, dia: 'Sábado', horario: 'Según necesidades' },
        { id: 7, dia: 'Domingo', horario: 'Según necesidades' }
    ];

    return (
        <div className="price-table">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h3 className="price-header flex-center">Día</h3>
                </Grid>
                <Grid item xs={6}>
                    <h3 className="price-header flex-center">Horario</h3>
                </Grid>
                {rowsCAMPODEFUTBOL.map((row) => (
                    <>
                        <Grid item xs={6}>
                            <div className="info-price flex-center">{row.dia}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="info-price flex-center">{row.horario}</div>
                        </Grid>
                    </>
                ))}
            </Grid>
            <div className="flex-center">
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

export default HorarioCampoDeFutbol;
