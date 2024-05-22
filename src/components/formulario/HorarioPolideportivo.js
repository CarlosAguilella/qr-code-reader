import React from "react";

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
        <>
            <h1 className="flex-center">Horario</h1>
            <div className='horario-container'>
                {rowsPOLIDEPORTIVO.map((row) => (
                    <div key={row.id}>
                        <p>{row.dia} - {row.horario}</p>
                    </div>
                ))}
                <button onClick={onClose}>Cerrar</button>
            </div>
        </>
    );
}

export default HorarioPolideportivo;
