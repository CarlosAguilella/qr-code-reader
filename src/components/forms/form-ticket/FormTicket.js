import React, { useState, useRef } from "react";
import { DateTime } from "luxon"; // Librería para manejar fechas
import { Grid, InputBase, Checkbox, Button } from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import PreviewTicket from "./PreviewTicket";
import NoPreviewTicket from "./NoPreviewTicket";

import "./formTicket.css";

const MYIMAGE = "imagen.png";

const FormTicket = () => {
    // Referencia para el input de subir imagen, ya que mostraba un error en consola
    const inputRef = useRef();
    // Estado para controlar los datos del ticket
    const [ticketData, setTicketData] = useState({
        preview: false,
        visible: false,
        smallDescEs: "",
        largeDescEs: "",
        smallDescVal: "",
        largeDescVal: "",
        unlimited: true,
        ticketNumber: 45,
        free: true,
        ticketPrice: 3,
        exclusive: true,
        startDate: "",
        endingDate: "",
        image: null
    });

    // Función para controlar la vista previa
    const handlePreview = () => {
        setTicketData(prevState => ({ ...prevState, preview: !prevState.preview }));
    }

    // Función para controlar los checkbox
    const handleChecked = (e) => {
        setTicketData({ ...ticketData, [e.target.name]: e.target.checked });
    }

    // Función para controlar los inputs
    const handleChangeInput = (e) => {
        setTicketData({ ...ticketData, [e.target.name]: e.target.value });
    }

    // Función para controlar el checkbox de exclusivo, ya que solo puede ser uno de los dos
    const handleBetweenExclusive = (e) => {
        setTicketData(prevState => ({ ...prevState, exclusive: !prevState.exclusive }));
    }

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
        input.required = true;
        input.type = "file";
        input.ref = inputRef;
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
    const { preview, visible, smallDescEs, largeDescEs, smallDescVal, largeDescVal, unlimited, ticketNumber, free, ticketPrice, exclusive, startDate, endingDate, image } = ticketData;

    // Mostrar los datos en consola
    console.log(ticketData);

    return (
        <>
            {ticketData.preview === true ? (
                <>
                    {visible === true ? (
                        <PreviewTicket
                            preview={preview} setPreview={handlePreview}
                            smallDescEs={smallDescEs} largeDescEs={largeDescEs}
                            smallDescVal={smallDescVal} largeDescVal={largeDescVal}
                            unlimited={unlimited} ticketNumber={ticketNumber}
                            free={free} ticketPrice={ticketPrice}
                            exclusive={exclusive} startDate={startDate}
                            endingDate={endingDate} image={image}
                            handleUploadImage={handleUploadImage}
                        />
                    ) : (
                        <NoPreviewTicket
                            preview={preview} setPreview={handlePreview}
                        />
                    )}
                </>
            ) : (
                <form>
                    <div className="form-ticket">
                        <div className="flex-center">
                            <h1 className="form-title">ENTRADA</h1>
                        </div >
                        <div className="flex-end">
                            <Button type="submit" className="form-button" style={{ marginRight: '1em' }}>
                                Guardar
                            </Button>
                            <Button className="form-button" onClick={handlePreview}>
                                Previsualizar
                            </Button>
                            <Button className="form-button-checkbox" onClick={handleChecked}>
                                <Checkbox
                                    style={{ marginTop: '-0.1em' }}
                                    checked={ticketData.visible}
                                    size="small"
                                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                    name="visible"
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
                                        {smallDescEs.length > 50 ? (
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
                                                onChange={handleChangeInput}
                                                className="form-input"
                                                variant="outlined"
                                                fullWidth
                                                value={ticketData.smallDescEs}
                                                required
                                                name="smallDescEs"
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={3} lg={2}>
                                    <div className="form-desc-title">
                                        <h4>Descripción larga</h4>
                                        {largeDescEs.length > 500 ? (
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
                                                onChange={handleChangeInput}
                                                className="form-input"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                value={ticketData.largeDescEs}
                                                required
                                                name="largeDescEs"
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
                                        {smallDescVal.length > 50 ? (
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
                                                onChange={handleChangeInput}
                                                className="form-input"
                                                variant="outlined"
                                                fullWidth
                                                value={ticketData.smallDescVal}
                                                required
                                                name="smallDescVal"
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={3} lg={2}>
                                    <div className="form-desc-title">
                                        <h4>Descripció llarga</h4>
                                        {largeDescVal.length > 500 ? (
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
                                                onChange={handleChangeInput}
                                                className="form-input"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                value={ticketData.largeDescVal}
                                                required
                                                name="largeDescVal"
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
                                                    onChange={handleChangeInput}
                                                    className="form-input"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={ticketData.ticketNumber}
                                                    style={{ paddingLeft: '1.7em', paddingTop: '0.4em' }}
                                                    required
                                                    name="ticketNumber"
                                                />
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid item xs={5} sm={8} lg={9}>
                                        <Button className="form-data-checkbox" onClick={handleChecked}>
                                            <Checkbox
                                                checked={ticketData.unlimited}
                                                style={{ marginTop: '-0.1em' }}
                                                size="small"
                                                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                name="unlimited"
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
                                                    onChange={handleChangeInput}
                                                    className="form-input"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={ticketData.ticketPrice}
                                                    style={{ paddingLeft: '2em', paddingTop: '0.4em' }}
                                                    required
                                                    name="ticketPrice"
                                                />
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid item xs={5} sm={8} lg={9}>
                                        <Button className="form-data-checkbox" onClick={handleChecked}>
                                            <Checkbox
                                                style={{ marginTop: '-0.1em' }}
                                                checked={ticketData.free}
                                                size="small"
                                                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                name="free"
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
                                        <Button className="form-data-checkbox" onClick={handleBetweenExclusive}>
                                            <Checkbox
                                                icon={<RadioButtonUncheckedIcon />}
                                                checkedIcon={<RadioButtonCheckedIcon />}
                                                checked={ticketData.exclusive === true ? true : false}
                                                shape='round'
                                                size="small"
                                                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                name="exclusive"
                                            />
                                            Si
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} sm={8} lg={9}>
                                        <Button className="form-data-checkbox" onClick={handleBetweenExclusive}>
                                            <Checkbox
                                                icon={<RadioButtonUncheckedIcon />}
                                                checkedIcon={<RadioButtonCheckedIcon />}
                                                checked={ticketData.exclusive === false ? true : false}
                                                size="small"
                                                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                name="exclusive"
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
                                            required
                                            name="startDate"
                                            min={DateTime.now().toISODate()}
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
                                            required
                                            name="endingDate"
                                            min={startDate}
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
                </form>
            )}
        </>
    );
};

export default FormTicket;
