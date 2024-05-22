import React from "react";

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
        <div className='horario-container'>
            {rowsCAMPODEFUTBOL.map((row) => (
                <div key={row.id}>
                    <p>{row.dia} - {row.horario}</p>
                </div>
            ))}
            <button onClick={onClose}>Cerrar</button>
        </div>
    );
}

export default HorarioCampoDeFutbol;
