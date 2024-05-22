import React from "react";
import "./formulario.css";
import { Grid } from "@mui/material";

const PreciosPoli = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <>
            <h1>Precio</h1>
            <table>
                <thead>
                    <tr>
                        <th>Utilización Pabellón Polideportivo, incluidos vestuarios y duchas</th>
                        <th>Con luz</th>
                        <th>Sin luz</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Una hora Pista baloncesto</td>
                        <td>40,00€</td>
                        <td>30,00€</td>
                    </tr>
                    <tr>
                        <td>Una hora Pista balonmano</td>
                        <td>40,00€</td>
                        <td>30,00€</td>
                    </tr>
                    <tr>
                        <td>Una hora Gimnasia</td>
                        <td>40,00€</td>
                        <td>30,00€</td>
                    </tr>
                    <tr>
                        <td>Una hora Actividades Deportivas Especiales</td>
                        <td>18,00€</td>
                        <td>12,00€</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Utilización Pabellón Polideportivas al aire libre, no incluye vestuarios ni duchas</th>
                        <th>Con luz</th>
                        <th>Sin luz</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Una hora Pista de Paddle</td>
                        <td>6,00€</td>
                        <td>6,00€</td>
                    </tr>
                    <tr>
                        <td>Una hora Pista Futbol, Balonmano o Baloncesto</td>
                        <td>-----------</td>
                        <td>-----------</td>
                    </tr>
                    <tr>
                        <td>Una hora resto  de pistas</td>
                        <td>-----------</td>
                        <td>-----------</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={onClose}>Cerrar</button>
        </>
    );
}

export default PreciosPoli;