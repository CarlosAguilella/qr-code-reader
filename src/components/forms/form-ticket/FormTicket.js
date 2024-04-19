import React, { useState, useRef } from "react";
import { DateTime } from "luxon"; // Librería para manejar fechas
import { Grid, InputBase, Checkbox, Button } from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useWindowSize } from '../../hooks/useWindowSize';

import PreviewTicket from "../form-table/PreviewTicket";
import NoPreviewTicket from "./NoPreviewTicket";

import "./formTicket.css";

const MYIMAGE = "imagen.png";

const FormTicket = () => {
    //Global Utils
    // Referencia para el input de subir imagen, ya que mostraba un error en consola
    const inputRef = useRef();
    const { width } = useWindowSize();

    // Estado para controlar los datos del ticket
    const [formCreate, setFormCreate] = useState({
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
        image: null,
        winterProgram: false,
        summerProgram: false,
        adultsProgram: false,
        poolProgram: false
    });

    // Función para controlar la vista previa
    const handlePreview = () => {
        setFormCreate(prevState => ({ ...prevState, preview: !prevState.preview }));
    }

    // Función para controlar los checkbox
    const handleChecked = (e) => {
        setFormCreate({ ...formCreate, [e.target.name]: e.target.checked });
    }

    // Función para controlar los inputs
    const handleChangeInput = (e) => {
        setFormCreate({ ...formCreate, [e.target.name]: e.target.value });
    }

    // Función para controlar el checkbox de exclusivo, ya que solo puede ser uno de los dos
    const handleBetweenExclusive = (e) => {
        setFormCreate(prevState => ({ ...prevState, exclusive: !prevState.exclusive }));
    }
    
    const handleWinterProgram = () => {
        const updatedWinterProgram = !formCreate.winterProgram;
        let updatedDuration = formCreate.duration;

        if (updatedWinterProgram && formCreate.summerProgram) {
            updatedDuration = "allYear";
        } else if (updatedWinterProgram && !formCreate.summerProgram) {
            updatedDuration = "winter";
        } else if (!updatedWinterProgram && formCreate.summerProgram) {
            updatedDuration = "summer";
        }

        setFormCreate({
            ...formCreate,
            winterProgram: updatedWinterProgram,
            duration: updatedDuration
        });
    };

    const handleSummerProgram = () => {
        const updatedSummerProgram = !formCreate.summerProgram;
        let updatedDuration = formCreate.duration;

        if (formCreate.winterProgram && updatedSummerProgram) {
            updatedDuration = "allYear";
        } else if (formCreate.winterProgram && !updatedSummerProgram) {
            updatedDuration = "winter";
        } else if (!formCreate.winterProgram && updatedSummerProgram) {
            updatedDuration = "summer";
        }

        setFormCreate({
            ...formCreate,
            summerProgram: updatedSummerProgram,
            duration: updatedDuration
        });
    };

    const handleAdultsProgram = () => {
        const updatedAdultsProgram = !formCreate.adultsProgram;
        let updatedAgeDescription = formCreate.ageDescription;

        if (formCreate.childrenProgram && updatedAdultsProgram) {
            updatedAgeDescription = "allAges";
        } else if (formCreate.childrenProgram && !updatedAdultsProgram) {
            updatedAgeDescription = "children";
        } else if (!formCreate.childrenProgram && updatedAdultsProgram) {
            updatedAgeDescription = "adults";
        }

        setFormCreate({
            ...formCreate,
            adultsProgram: updatedAdultsProgram,
            ageDescription: updatedAgeDescription
        });
    };

    const handleChildrenProgram = () => {
        const updatedChildrenProgram = !formCreate.childrenProgram;
        let updatedAgeDescription = formCreate.ageDescription;

        if (updatedChildrenProgram && formCreate.adultsProgram) {
            updatedAgeDescription = "allAges";
        } else if (updatedChildrenProgram && !formCreate.adultsProgram) {
            updatedAgeDescription = "children";
        } else if (!updatedChildrenProgram && formCreate.adultsProgram) {
            updatedAgeDescription = "adults";
        }

        setFormCreate({
            ...formCreate,
            childrenProgram: updatedChildrenProgram,
            ageDescription: updatedAgeDescription
        });
    };

    const handlePoolProgram = () => {
        const updatedPoolProgram = !formCreate.poolProgram;
        let updatedPoolProgramOption = formCreate.poolProgramOption;

        if (updatedPoolProgram) {
            updatedPoolProgramOption = "pool";
        }

        setFormCreate({
            ...formCreate,
            poolProgram: updatedPoolProgram,
            poolProgramOption: updatedPoolProgramOption
        });
    };

    // Función para controlar que la fecha de inicio no sea anterior a la fecha actual
    const handleStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate(); // Fecha actual(por LUXON)
        if (date1 < today) {
            alert("La fecha de inicio no puede ser anterior a la fecha actual");
        } else {
            setFormCreate(prevState => ({ ...prevState, startDate: date1 }));
        }
    }

    // Función para controlar que la fecha de fin no sea anterior a la fecha de inicio
    const handleEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = formCreate.startDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser anterior a la fecha de inicio");
        } else {
            setFormCreate(prevState => ({ ...prevState, endingDate: date2 }));
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
                setFormCreate(prevState => ({ ...prevState, image: reader.result }));
            };
        };
        input.click();
    }

    // Extraer los datos del estado
    const { preview, visible, smallDescEs, largeDescEs, smallDescVal, largeDescVal, unlimited, ticketNumber, free, ticketPrice, exclusive, startDate, endingDate, image, winterProgram, summerProgram, adultsProgram, poolProgram } = formCreate;

    return (
        <>
            {formCreate.preview === true ? (
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
                            winterProgram={winterProgram} summerProgram={summerProgram}
                            adultsProgram={adultsProgram} poolProgram={poolProgram}
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
                                                value={formCreate.smallDescEs}
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
                                                value={formCreate.largeDescEs}
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
                                                value={formCreate.smallDescVal}
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
                                                value={formCreate.largeDescVal}
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
                                    <Grid item xs={12}>
                                        <div className="form-data-title">
                                            <h2>ENTRADA</h2>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={5} lg={3}>
                                        <h4>N.Entradas disponibles</h4>
                                        {ticketNumber === "" ? (
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
                                                        value={formCreate.ticketNumber}
                                                        style={{ paddingTop: '0.4em' }}
                                                        name="ticketNumber"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={5} lg={7}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleChecked}>
                                                <Checkbox
                                                    checked={formCreate.unlimited}
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
                            <div className="ticket-data">
                                <Grid container>
                                    <Grid item xs={12} sm={5} lg={3}>
                                        <h4>Precio (IVA incluido)</h4>
                                        {ticketPrice === "" ? (
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
                                                        value={formCreate.ticketPrice}
                                                        style={{ paddingTop: '0.4em' }}
                                                        name="ticketPrice"
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
                                                    checked={formCreate.free}
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
                            <div className="ticket-data">
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
                                                    checked={formCreate.exclusive === true ? true : false}
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
                                                    checked={formCreate.exclusive === false ? true : false}
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
                            <div className="ticket-data">
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
                            <div className="ticket-data">
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
                            <div className="ticket-data">
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
                            <Grid container alignItems='center'>
                                <Grid item xs={12}>
                                    <div className="form-cat-title">
                                        <h2>CATEGORIZACIÓN</h2>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <h4 className="form-cat-title-info">Duración:</h4>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                checked={formCreate.winterProgram}
                                                size="small"
                                                name="winterProgram"
                                                onClick={handleWinterProgram}
                                            />
                                            <span>Invierno</span>
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                checked={formCreate.summerProgram}
                                                size="small"
                                                name="summerProgram"
                                                onClick={handleSummerProgram}
                                            />
                                            <span>Verano</span>
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <h4 className="form-cat-title-info">Edad:</h4>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                checked={formCreate.childrenProgram}
                                                size="small"
                                                name="childrenProgram"
                                                onClick={handleChildrenProgram}
                                            />
                                            <span>Niñ@s</span>
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                checked={formCreate.adultsProgram}
                                                size="small"
                                                name="adultsProgram"
                                                onClick={handleAdultsProgram}
                                            />
                                            <span>Jóvenes/Adultos</span>
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <h4 className="form-cat-title-info">Otros:</h4>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                checked={formCreate.poolProgram}
                                                size="small"
                                                name="poolProgram"
                                                onClick={handlePoolProgram}
                                            />
                                            <span>Piscina</span>
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default FormTicket;
