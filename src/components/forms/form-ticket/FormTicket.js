import React, { useState } from "react";
import { DateTime } from "luxon"; // Librería para manejar fechas
import { Grid, InputBase, Checkbox, Button } from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import PreviewTicket from "./PreviewTicket";
import NoPreviewTicket from "./NoPreviewTicket";

import "./formTicket.css";

const MYIMAGE = "imagen.png";

const FormTicket = () => {
    // Estado para controlar los datos del ticket
    const [ticketData, setTicketData] = useState({
        preview: false,
        visible: false,
        smallDesc: "",
        largeDesc: "",
        unlimited: true,
        ticketNumber: 45,
        free: true,
        ticketPrice: 3,
        exclusive: true,
        startDate: "",
        endingDate: "",
        image: null
    });

    // // Función para controlar los cambios en los inputs
    // const handleChange = (e) => {
    //     setTicketData({
    //         ...ticketData,
    //         [e.target.name]: e.target.value
    //     })
    // }

    // Funciones para cambiar el estado
    const setPreview = (value) => setTicketData(prevState => ({ ...prevState, preview: value }));
    const setVisible = (value) => setTicketData(prevState => ({ ...prevState, visible: value }));
    const setSmallDesc = (value) => setTicketData(prevState => ({ ...prevState, smallDesc: value }));
    const setLargeDesc = (value) => setTicketData(prevState => ({ ...prevState, largeDesc: value }));
    const setUnlimited = (value) => setTicketData(prevState => ({ ...prevState, unlimited: value }));
    const setTicketNumber = (value) => setTicketData(prevState => ({ ...prevState, ticketNumber: value }));
    const setFree = (value) => setTicketData(prevState => ({ ...prevState, free: value }));
    const setTicketPrice = (value) => setTicketData(prevState => ({ ...prevState, ticketPrice: value }));
    const setExclusive = (value) => setTicketData(prevState => ({ ...prevState, exclusive: value }));

    // Función para controlar que la fecha de inicio no sea anterior a la fecha actual
    const handleStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate(); // Fecha actual(por LUXON)
        if (date1 < today) {
            alert("La fecha de inicio no puede ser anterior a la fecha actual");
        } else {
            setTicketData(prevState => ({ ...prevState, startDate: date1 }));
        }
    }

    // Función para controlar que la fecha de fin no sea anterior a la fecha de inicio
    const handleEndingDate = (e) => {
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
    const { preview, visible, smallDesc, largeDesc, unlimited, ticketNumber, free, ticketPrice, exclusive, startDate, endingDate, image } = ticketData;

    return (
        <>
            {preview === true ? (
                <>
                    {visible === true ? (
                        <PreviewTicket
                            preview={preview} setPreview={setPreview}
                            smallDesc={smallDesc} largeDesc={largeDesc}
                            unlimited={unlimited} ticketNumber={ticketNumber}
                            free={free} ticketPrice={ticketPrice}
                            exclusive={exclusive} startDate={startDate}
                            endingDate={endingDate} image={image}
                            handleUploadImage={handleUploadImage}
                        />
                    ) : (
                        <NoPreviewTicket
                            preview={preview} setPreview={setPreview}
                        />
                    )}
                </>
            ) : (
                <div className="form-ticket">
                    <div className="flex-center">
                        <h1 className="form-title">ENTRADA</h1>
                    </div >
                    <div className="flex-end">
                        <Button className="form-button" onClick={() => setPreview(!preview)}>
                            Previsualizar
                        </Button>
                        <Button className="form-button-checkbox" onClick={() => setVisible(!visible)}>
                            <Checkbox
                                style={{ marginTop: '-0.1em' }}
                                checked={visible}
                                size="small"
                                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                            />
                            Producto visible
                        </Button>
                    </div>
                    <div className="form-es">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3} lg={2}>
                                <div className="form-es-title">
                                    <h2>ES</h2>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={10}>
                                <div className="form-line">
                                    &nbsp;
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={3} lg={2}>
                                <div className="form-desc-title">
                                    <h4>Descripción corta</h4>
                                    {smallDesc.length > 50 ? (
                                        <h6 className="form-subtitle-data">(máximo de 50 carácteres)</h6>
                                    ) : (
                                        <h6 style={{ display: 'none' }}>()</h6>
                                    )}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={10}>
                                <div className="form-desc-small">
                                    <div className="flex-start">
                                        <InputBase
                                            onChange={(e) => setSmallDesc(e.target.value)}
                                            className="form-input"
                                            variant="outlined"
                                            fullWidth
                                            value={smallDesc}
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={3} lg={2}>
                                <div className="form-desc-title">
                                    <h4>Descripción larga</h4>
                                    {largeDesc.length > 500 ? (
                                        <h6 className="form-subtitle-data">(máximo de 500 carácteres)</h6>
                                    ) : (
                                        <h6 style={{ display: 'none' }}>()</h6>
                                    )}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={10}>
                                <div className="form-desc-large">
                                    <div className="flex-start">
                                        <InputBase
                                            onChange={(e) => setLargeDesc(e.target.value)}
                                            className="form-input"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            value={largeDesc}
                                        />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="form-val">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3} lg={2}>
                                <div className="form-val-title">
                                    <h2>VAL</h2>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={10}>
                                <div className="form-line">
                                    &nbsp;
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={3} lg={2}>
                                <div className="form-desc-title">
                                    <h4>Descripció curta</h4>
                                    {smallDesc.length > 50 ? (
                                        <h6 className="form-subtitle-data">(màxim de 50 caràcters)</h6>
                                    ) : (
                                        <h6 style={{ display: 'none' }}>()</h6>
                                    )}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={10}>
                                <div className="form-desc-small">
                                    <div className="flex-start">
                                        <InputBase
                                            onChange={(e) => setSmallDesc(e.target.value)}
                                            className="form-input"
                                            variant="outlined"
                                            fullWidth
                                            value={smallDesc}
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={3} lg={2}>
                                <div className="form-desc-title">
                                    <h4>Descripció llarga</h4>
                                    {largeDesc.length > 500 ? (
                                        <h6 className="form-subtitle-data">(màxim de 500 caràcters)</h6>
                                    ) : (
                                        <h6 style={{ display: 'none' }}>()</h6>
                                    )}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={10}>
                                <div className="form-desc-large">
                                    <div className="flex-start">
                                        <InputBase
                                            onChange={(e) => setLargeDesc(e.target.value)}
                                            className="form-input"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            value={largeDesc}
                                        />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="form-data">
                        <div className="ticket-data">
                            <Grid container>
                                <Grid item xs={5} sm={3} lg={2}>
                                    <h4>N.Entradas disponibles</h4>
                                    {ticketNumber === "" ? (
                                        <h6 className="form-alert">(Si está vacío será ilimitado)</h6>
                                    ) : (
                                        <h6 style={{ display: 'none' }}>()</h6>
                                    )}
                                </Grid>
                                <Grid item xs={2} sm={1}>
                                    {unlimited === true ? (
                                        <div className="form-info">Ilimitadas</div>
                                    ) : (
                                        <div className="form-info">
                                            <InputBase
                                                onChange={(e) => setTicketNumber(e.target.value)}
                                                className="form-input"
                                                variant="outlined"
                                                fullWidth
                                                value={ticketNumber}
                                                style={{ paddingLeft: '1.7em', paddingTop: '0.4em' }}
                                            />
                                        </div>
                                    )}
                                </Grid>
                                <Grid item xs={5} sm={8} lg={9}>
                                    <Button className="form-data-checkbox" onClick={() => setUnlimited(!unlimited)}>
                                        <Checkbox
                                            checked={unlimited}
                                            style={{ marginTop: '-0.1em' }}
                                            size="small"
                                            sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                        />
                                        Ilimitadas
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="ticket-data">
                            <Grid container>
                                <Grid item xs={5} sm={3} lg={2}>
                                    <h4>Precio (IVA incluido)</h4>
                                    {ticketPrice === "" ? (
                                        <h6 className="form-alert">(Si está vacío será gratuito)</h6>
                                    ) : (
                                        <h6 style={{ display: 'none' }}>()</h6>
                                    )}
                                </Grid>
                                <Grid item xs={2} sm={1}>
                                    {free === true ? (
                                        <div className="form-info">Gratuito</div>
                                    ) : (
                                        <div className="form-info">
                                            <InputBase
                                                onChange={(e) => setTicketPrice(e.target.value)}
                                                className="form-input"
                                                variant="outlined"
                                                fullWidth
                                                value={ticketPrice}
                                                style={{ paddingLeft: '2em', paddingTop: '0.4em' }}
                                            />
                                        </div>
                                    )}
                                </Grid>
                                <Grid item xs={5} sm={8} lg={9}>
                                    <Button className="form-data-checkbox" onClick={() => setFree(!free)}>
                                        <Checkbox
                                            style={{ marginTop: '-0.1em' }}
                                            checked={free}
                                            size="small"
                                            sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                        />
                                        Gratuito
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="ticket-data">
                            <Grid container>
                                <Grid item xs={5} sm={3} lg={2}>
                                    <h4>Exclusivo para soci@s</h4>
                                </Grid>
                                <Grid item xs={3} sm={1}>
                                    <Button className="form-data-checkbox" onClick={() => setExclusive(!exclusive)}>
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<RadioButtonCheckedIcon />}
                                            checked={exclusive === true ? true : false}
                                            shape='round'
                                            size="small"
                                            sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                        />
                                        Si
                                    </Button>
                                </Grid>
                                <Grid item xs={4} sm={8} lg={9}>
                                    <Button className="form-data-checkbox" onClick={() => setExclusive(!exclusive)}>
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<RadioButtonCheckedIcon />}
                                            checked={exclusive === false ? true : false}
                                            size="small"
                                            sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                        />
                                        No
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="ticket-data">
                            <Grid container>
                                <Grid item xs={4} sm={5} md={4} lg={2}>
                                    <div className="flex-start">
                                        <h4>Fecha inicio</h4>
                                        <h6 className="form-subtitle-data">&nbsp;(cuando podrá comenzar a usarse las entradas)</h6>
                                    </div>
                                </Grid>
                                <Grid item xs={8} sm={7} md={8} lg={10}>
                                    <input
                                        onChange={handleStartingDate}
                                        type="date"
                                        value={startDate}
                                        className="form-button-date"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div className="ticket-data">
                            <Grid container>
                                <Grid item xs={4} sm={5} md={4} lg={2}>
                                    <div className="flex-start">
                                        <h4>Fecha fin</h4>
                                        <h6 className="form-subtitle-data">&nbsp;(cuando expirará las entradas)</h6>
                                    </div>
                                </Grid>
                                <Grid item xs={8} sm={7} md={8} lg={10}>
                                    <input
                                        onChange={handleEndingDate}
                                        type="date"
                                        value={endingDate}
                                        className="form-button-date"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div className="ticket-data">
                            <Grid container>
                                <Grid item xs={3} sm={1}>
                                    <h4>Imagen</h4>
                                </Grid>
                                <Grid item xs={9} sm={11}>
                                    {image === null ? (
                                        <div className="form-button-image" onClick={handleUploadImage}>
                                            <img src={MYIMAGE} alt="imagen"></img>
                                        </div>
                                    ) : (
                                        <div className="form-image">
                                            <img src={image} alt="imagen"></img>
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormTicket;
