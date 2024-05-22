import React from "react";

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
        <div className='horario-container'>
            <h4>PISCINA MUNICIPAL</h4>
            <p>Horario:</p>
            {rowsPISCINAMUNICIPAL.map((row) => (
                <div key={row.id}>
                    <p>{row.dia} - {row.horario}</p>
                </div>
            ))}
            <button onClick={onClose}>Cerrar</button>
        </div>
    );
}

export default HorarioPiscina;
