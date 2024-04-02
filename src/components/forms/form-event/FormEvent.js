import React, { useState, useRef } from "react";
import { DateTime } from "luxon";
import { Grid, InputBase, Checkbox, Button } from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useWindowSize } from '../../hooks/useWindowSize';

import PreviewEvent from "./PreviewEvent";
import NoPreviewEvent from "./NoPreviewEvent";

import "./formEvent.css";

const MYIMAGE = "imagen.png";

const FormEvent = () => {
    const inputRef = useRef();
    const { width } = useWindowSize();

    const [eventData, setEventData] = useState({
        preview: false,
        visible: false,
        smallDescEs: "",
        largeDescEs: "",
        smallDescVal: "",
        largeDescVal: "",
        unlimited: true,
        eventNumber: 45,
        free: true,
        eventPrice: 3,
        exclusive: true,
        startDate: "",
        endingDate: "",
        image: null,
        winterProgram: false,
        summerProgram: false,
        adultsProgram: false,
        poolProgram: false
    });

    const handlePreview = () => {
        setEventData({ ...eventData, preview: !eventData.preview });
    }

    const handleChecked = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.checked });
    }

    const handleChangeInput = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    }

    const handleBetweenExclusive = (e) => {
        setEventData({ ...eventData, exclusive: !eventData.exclusive });
    }
    const  handleBetweenAdults = (e) => {
        setEventData({ ...eventData, adultsProgram: !eventData.adultsProgram });
    }

    const handleStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();
        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            setEventData(prevState => ({ ...prevState, startDate: date1 }));
        }
    }

    const handleEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = eventData.startDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setEventData(prevState => ({ ...prevState, endingDate: date2 }));
        }
    }

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
                setEventData(prevState => ({ ...prevState, image: reader.result }));
            };
        };
        input.click();
    }

    const { preview, visible, smallDescEs, largeDescEs, smallDescVal, largeDescVal, unlimited, eventNumber, free, eventPrice, exclusive, startDate, endingDate, image, winterProgram, summerProgram, adultsProgram, poolProgram } = eventData;

    console.log(eventData);

    return (
        <>
            {eventData.preview === true ? (
                <>
                    {visible === true ? (
                        <PreviewEvent
                            preview={preview} setPreview={handlePreview}
                            smallDescEs={smallDescEs} largeDescEs={largeDescEs}
                            smallDescVal={smallDescVal} largeDescVal={largeDescVal}
                            unlimited={unlimited} eventNumber={eventNumber}
                            free={free} eventPrice={eventPrice}
                            exclusive={exclusive} startDate={startDate}
                            endingDate={endingDate} image={image}
                            handleUploadImage={handleUploadImage}
                            winterProgram={winterProgram} summerProgram={summerProgram}
                            adultsProgram={adultsProgram} poolProgram={poolProgram}
                        />
                    ) : (
                        <NoPreviewEvent
                            preview={preview} setPreview={handlePreview}
                        />
                    )}
                </>
            ) : (
                <form>
                    <div className="form-event">
                        <div className="flex-center">
                            <h1 className="form-title">EVENTO</h1>
                        </div>
                        <div className="flex-end" style={{ marginRight: '0,66rem' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} lg={10}>
                                    <div className="flex-end">
                                        <Button type="submit" className="form-button">
                                            Guardar
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={6} lg={1}>
                                    <div className={width > 1200 ? "flex-end" : "flex-start"}>
                                        <Button className="form-button" onClick={handlePreview}>
                                            Previsualizar
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12} lg={1}>
                                    <div className={width > 1200 ? "flex-start" : "flex-center"}>
                                        <Button className="form-button-checkbox" onClick={handleChecked}>
                                            <Checkbox
                                                style={{ marginTop: '-0.1em' }}
                                                checked={eventData.visible}
                                                size="small"
                                                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                name="visible"
                                            />
                                            Producto visible
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
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
                                                value={eventData.smallDescEs}
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
                                                value={eventData.largeDescEs}
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
                                                value={eventData.smallDescVal}
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
                                                value={eventData.largeDescVal}
                                                required
                                                name="largeDescVal"
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="form-data">
                            <div className="event-data">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <div className="form-data-title">
                                            <h2>ENTRADA</h2>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={5} lg={3}>
                                        <h4>N.Entradas disponibles</h4>
                                        {eventNumber === "" ? (
                                            <h6 className="form-alert">(Si está vacío será ilimitado)</h6>
                                        ) : (
                                            <h6 style={{ display: 'none' }}>()</h6>
                                        )}
                                    </Grid>
                                    <Grid item xs={6} sm={2} >
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            {unlimited === true ? (
                                                <div className="form-info">Ilimitadas</div>
                                            ) : (
                                                <div className="form-info">
                                                    <InputBase
                                                        onChange={handleChangeInput}
                                                        className="form-input"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={eventData.eventNumber}
                                                        style={{ paddingTop: '0.4em' }}
                                                        name="eventNumber"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={5} lg={7}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleChecked}>
                                                <Checkbox
                                                    checked={eventData.unlimited}
                                                    style={{ marginTop: '-0.1em' }}
                                                    size="small"
                                                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                    name="unlimited"
                                                />
                                                Ilimitadas
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="event-data">
                                <Grid container>
                                    <Grid item xs={12} sm={5} lg={3}>
                                        <h4>Precio (IVA incluido)</h4>
                                        {eventPrice === "" ? (
                                            <h6 className="form-alert">(Si está vacío será gratuito)</h6>
                                        ) : (
                                            <h6 style={{ display: 'none' }}>()</h6>
                                        )}
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            {free === true ? (
                                                <div className="form-info">Gratuito</div>
                                            ) : (
                                                <div className="form-info">
                                                    <InputBase
                                                        onChange={handleChangeInput}
                                                        className="form-input"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={eventData.eventPrice}
                                                        style={{ paddingTop: '0.4em' }}
                                                        name="eventPrice"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={5} lg={7}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleChecked}>
                                                <Checkbox
                                                    style={{ marginTop: '-0.1em' }}
                                                    checked={eventData.free}
                                                    size="small"
                                                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                    name="free"
                                                />
                                                Gratuito
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="event-data">
                                <Grid container>
                                    <Grid item xs={12} sm={5} lg={3}>
                                        <h4>Exclusivo para soci@s</h4>
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleBetweenExclusive}>
                                                <Checkbox
                                                    icon={<RadioButtonUncheckedIcon />}
                                                    checkedIcon={<RadioButtonCheckedIcon />}
                                                    checked={eventData.exclusive === true ? true : false}
                                                    shape='round'
                                                    size="small"
                                                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                    name="exclusive"
                                                />
                                                Si
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={5} lg={7}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleBetweenExclusive}>
                                                <Checkbox
                                                    icon={<RadioButtonUncheckedIcon />}
                                                    checkedIcon={<RadioButtonCheckedIcon />}
                                                    checked={eventData.exclusive === false ? true : false}
                                                    size="small"
                                                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                    name="exclusive"
                                                />
                                                No
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="event-data">
                                <Grid container>
                                    <Grid item xs={12} md={5} lg={3}>
                                        <div className="flex-start">
                                            <h4>Fecha inicio</h4>
                                            <h6 className="form-subtitle-data">&nbsp;(cuando podrá comenzar a usarse las entradas)</h6>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={7} lg={9}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <input
                                                onChange={handleStartingDate}
                                                type="date"
                                                value={startDate}
                                                className="form-button-date"
                                                required
                                                name="startDate"
                                                min={DateTime.now().toISODate()}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="event-data">
                                <Grid container>
                                    <Grid item xs={12} md={5} lg={3}>
                                        <div className="flex-start">
                                            <h4>Fecha fin</h4>
                                            <h6 className="form-subtitle-data">&nbsp;(cuando expirará las entradas)</h6>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={7} lg={9}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <input
                                                onChange={handleEndingDate}
                                                type="date"
                                                value={endingDate}
                                                className="form-button-date"
                                                required
                                                name="endingDate"
                                                min={startDate}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="event-data">
                                <Grid container>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <div className="flex-start">
                                            <h4>Imagen</h4>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={1} lg={9}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            {image === null ? (
                                                <div className="form-button-image" onClick={handleUploadImage}>
                                                    <img src={MYIMAGE} alt="imagen"></img>
                                                </div>
                                            ) : (
                                                <div className="form-image">
                                                    <img src={image} alt="imagen"></img>
                                                </div>
                                            )}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <div className="form-cat">
                            <Grid container>
                                <Grid item xs={12}>
                                    <div className="form-cat-title">
                                        <h2>CATEGORIZACIÓN</h2>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <h4>Duración:</h4>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                style={{ marginTop: '-0.1em' }}
                                                checked={eventData.winterProgram}
                                                size="small"
                                                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                name="winterProgram"
                                                onClick={handleChecked}
                                            />
                                            Programa de invierno
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                style={{ marginTop: '-0.1em' }}
                                                checked={eventData.summerProgram}
                                                size="small"
                                                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                name="summerProgram"
                                                onClick={handleChecked}
                                            />
                                            Programa de verano
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <h4>Edad:</h4>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                style={{ marginTop: '-0.1em' }}
                                                checked={!eventData.adultsProgram}
                                                size="small"
                                                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                name="adultsProgram"
                                                onClick={handleBetweenAdults}
                                            />
                                            Para niñ@s
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                style={{ marginTop: '-0.1em' }}
                                                checked={eventData.adultsProgram}
                                                size="small"
                                                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                name="adultsProgram"
                                                onClick={handleBetweenAdults}
                                            />
                                            Para jóvenes/adultos
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <h4>Otros:</h4>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                style={{ marginTop: '-0.1em' }}
                                                checked={eventData.poolProgram}
                                                size="small"
                                                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                name="poolProgram"
                                                onClick={handleChecked}
                                            />
                                            Piscina
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </form>
            )
        }
        </>
    );
}

export default FormEvent;