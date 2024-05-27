import React from "react";
import { Grid } from "@mui/material";
import "./facilitiesForm.css";

const HorarioPolideportivo = ({ open, onClose }) => {
    if (!open) return null;

    const rowsPOLIDEPORTIVO = [
        { id: 1, dia: 'Lunes', horario: '15:00 - 21:00h' },
        { id: 2, dia: 'Martes', horario: 'Según necesidades' },
        { id: 3, dia: 'Miércoles', horario: '15:00 - 21:00h' },
        { id: 4, dia: 'Jueves', horario: 'Según necesidades' },
        { id: 5, dia: 'Viernes', horario: '15:00 - 21:00h' },
        { id: 6, dia: 'Sábado', horario: 'Según necesidades' },
        { id: 7, dia: 'Domingo', horario: 'Cerrado' }
    ];

    return (
        <div className="price-table">
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <h3 className="price-header flex-end">Día</h3>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={5}>
                    <h3 className="price-header flex-start">Horario</h3>
                </Grid>
                {rowsPOLIDEPORTIVO.map((row) => (
                    <>
                        <Grid item xs={5}>
                            <div className="info-price flex-end">{row.dia}</div>
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={5}>
                            <div className="info-price flex-start">{row.horario}</div>
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

export default HorarioPolideportivo;
