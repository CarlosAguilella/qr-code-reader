import React from "react";
import { Grid } from "@mui/material";
import "./facilitiesForm.css";

const HorarioPiscina = ({ open, onClose }) => {
    if (!open) return null;

    const rowsPISCINAMUNICIPAL = [
        { id: 1, dia: 'Lunes', horario: '11:00 - 14:00h     16:00 - 20:00h' },
        { id: 2, dia: 'Martes', horario: '11:00 - 14:00h     16:00 - 20:00h' },
        { id: 3, dia: 'Miércoles', horario: '11:00 - 14:00h     16:00 - 20:00h' },
        { id: 4, dia: 'Jueves', horario: '11:00 - 14:00h     16:00 - 20:00h' },
        { id: 5, dia: 'Viernes', horario: '11:00 - 14:00h     16:00 - 20:00h' },
        { id: 6, dia: 'Sábado', horario: '11:30 - 20:00h' },
        { id: 7, dia: 'Domingo', horario: '11:30 - 20:00h' }
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
                {rowsPISCINAMUNICIPAL.map((row) => (
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

export default HorarioPiscina;
