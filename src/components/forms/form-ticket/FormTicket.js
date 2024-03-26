import React, { useState } from "react";
import { DateTime } from "luxon"; // Librería para manejar fechas
import PreviewTicket from "./PreviewTicket";
import NoPreviewTicket from "./NoPreviewTicket";
import FormTicketData from "./FormTicketData";
import "./formTicket.css";

const FormTicket = () => {
    // Estado para controlar los datos del ticket
    const [ticketData, setTicketData] = useState({
        preview: false,
        visible: false,
        smallDesc: "",
        largeDesc: "",
        unlimited: true,
        free: true,
        exclusive: true,
        startDate: "",
        endingDate: "",
        image: null
    });

    // Funciones para cambiar el estado
    const setPreview = (value) => setTicketData(prevState => ({ ...prevState, preview: value }));
    const setVisible = (value) => setTicketData(prevState => ({ ...prevState, visible: value }));
    const setSmallDesc = (value) => setTicketData(prevState => ({ ...prevState, smallDesc: value }));
    const setLargeDesc = (value) => setTicketData(prevState => ({ ...prevState, largeDesc: value }));
    const setUnlimited = (value) => setTicketData(prevState => ({ ...prevState, unlimited: value }));
    const setFree = (value) => setTicketData(prevState => ({ ...prevState, free: value }));
    const setExclusivo = (value) => setTicketData(prevState => ({ ...prevState, exclusive: value }));

    // Función para controlar que la fecha de inicio no sea anterior a la fecha actual
    const handleFechaInicioChange = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate(); // Fecha actual(por LUXON)
        if (date1 < today) {
            alert("La fecha de inicio no puede ser anterior a la fecha actual");
        } else {
            setTicketData(prevState => ({ ...prevState, startDate: date1 }));
        }
    }

    // Función para controlar que la fecha de fin no sea anterior a la fecha de inicio
    const handleFechaFinChange = (e) => {
        const date2 = e.target.value;
        const date1 = ticketData.startDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser anterior a la fecha de inicio");
        } else {
            setTicketData(prevState => ({ ...prevState, endingDate: date2 }));
        }
    }

    // Función para subir una imagen
    const handleUploadImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setTicketData(prevState => ({ ...prevState, image: reader.result }));
            };
        };
        input.click();
    }

    // Extraer los datos del estado
    const { preview, visible, smallDesc, largeDesc, unlimited, free, exclusive, startDate, endingDate, image } = ticketData;

    return (
        <>
            {preview === true ? (
                <>
                    {visible === true ? (
                        <PreviewTicket
                            preview={preview}
                            setPreview={setPreview}
                            smallDesc={smallDesc}
                            largeDesc={largeDesc}
                            unlimited={unlimited}
                            free={free}
                            exclusive={exclusive}
                            startDate={startDate}
                            endingDate={endingDate}
                            image={image}
                            handleUploadImage={handleUploadImage}
                        />
                    ) : (
                        <NoPreviewTicket
                            preview={preview}
                            setPreview={setPreview}
                        />
                    )}
                </>
            ) : (
                <FormTicketData
                    preview={preview}
                    setPreview={setPreview}
                    visible={visible}
                    setVisible={setVisible}
                    smallDesc={smallDesc}
                    setSmallDesc={setSmallDesc}
                    largeDesc={largeDesc}
                    setLargeDesc={setLargeDesc}
                    unlimited={unlimited}
                    setUnlimited={setUnlimited}
                    free={free}
                    setFree={setFree}
                    exclusive={exclusive}
                    setExclusivo={setExclusivo}
                    startDate={startDate}
                    handleFechaInicioChange={handleFechaInicioChange}
                    endingDate={endingDate}
                    handleFechaFinChange={handleFechaFinChange}
                    image={image}
                    handleUploadImage={handleUploadImage}
                />
            )}
        </>
    );
};

export default FormTicket;
