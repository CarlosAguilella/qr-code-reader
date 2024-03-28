import React, { useState } from "react";

import "./formTicket.css";

const FormForm = () => {
    const [smallDesc, setSmallDesc] = useState("");
    const [largeDesc, setLargeDesc] = useState("");
    const [ticketNumber, setTicketNumber] = useState("");
    const [ticketPrice, setTicketPrice] = useState(""); 
    const [exclusive, setExclusive] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endingDate, setEndingDate] = useState("");
    const [image, setImage] = useState(null);

    return (
        <form>
            <div className="form-ticket">
                <div className="flex-center">
                    <h1>ENTRADA</h1>
                </div>
                <div className="flex-end">
                    <button type="submit" className="form-button">
                        Guardar
                    </button>
                </div>
                <div className="form-es">
                    <div className="flex-start">
                        <h4>Descripción corta</h4>
                        <input required type="text" style={{ padding: '3em' }} onChange={setSmallDesc} />
                    </div>
                    <div className="flex-start">
                        <h4>Descripción larga</h4>
                        <textarea required id="largeDesc" style={{ padding: '3em 4.5em' }} onChange={setLargeDesc} />
                    </div>
                </div>
                <div className="form-data">
                    <div className="ticket-data">
                        <div className="flex-start">
                            <h4>Entradas disponibles</h4>
                            <input required className="form-input" type="number" id="ticketNumber" onChange={setTicketNumber} />
                        </div>
                    </div>
                    <div className="ticket-data">
                        <div className="flex-start">
                            <h4>Precio</h4>
                            <input required className="form-input" type="number" id="ticketPrice" onChange={setTicketPrice} />
                        </div>
                    </div>
                    <div className="ticket-data">
                        <div className="flex-start">
                            <h4>Exclusivo para soci@s</h4>
                            <input type="checkbox" id="exclusive" defaultChecked onChange={setExclusive}/>
                            <input type="checkbox" id="exclusive" onChange={setExclusive} />
                        </div>
                    </div>
                    <div className="ticket-data">
                        <div className="flex-start">
                            <h4>Fecha inicio</h4>
                            <input required type="date" id="startDate" onChange={setStartDate} />
                        </div>
                    </div>
                    <div className="ticket-data">
                        <div className="flex-start">
                            <h4>Fecha fin</h4>
                            <input required type="date" id="endingDate" onChange={setEndingDate} />
                        </div>
                    </div>
                    <div className="ticket-data">
                        <div className="flex-start">
                            <h4>Imagen</h4>
                            <input type="file" id="image" onChange={setImage} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default FormForm;
