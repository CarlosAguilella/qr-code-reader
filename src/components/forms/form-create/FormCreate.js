import React, { useState, useRef } from "react";
import { Grid, InputBase, Checkbox, Button, Select, MenuItem } from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { DateTime } from "luxon";
import { useWindowSize } from '../../hooks/useWindowSize';

import "./formCreate.css";

const MYIMAGE = "imagen.png";

const FormCreate = ({ onValueChange, arrayMagico, setArrayMagico }) => {
    const inputRef = useRef();
    const { width } = useWindowSize();

    const [formCreate, setFormCreate] = useState({
        id: Math.floor(Math.random() * 10000),
        tipo: "",
        producto: "",
        accesos: 0,
        socios: false,
        precio: 0,
        stock: 0,
        expiracion: DateTime.now().plus({ days: 1 }).toISODate(),
        visible: false,
        deleted: false
    });

    const [formInfo, setFormInfo] = useState({
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
        poolProgram: false,
        childrenProgram: false,
        duration: "",
        ageDescription: "",
        poolProgramOption: "",
        memberFree: true,
        memberDues: 0,
        nonMemberFree: true,
        nonMemberDues: 0,
        payment: false,
        duesNumber: 1,
        duesInfo: [],
        preStartingDate: "",
        preEndingDate: "",
        ticketPrice: 0,
        waitingList: false
    });

    const handleChange = (e) => {
        setFormCreate({
            ...formCreate,
            [e.target.name]: e.target.value
        });
    }

    const handleChecked = () => {
        setFormCreate({
            ...formCreate,
            visible: !formCreate.visible
        });
    }

    const handleCheckedInfo = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.checked });
    }

    const handleInput = (e) => {
        setFormCreate({
            ...formCreate,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeInput = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    }

    const handleBetweenExclusive = (e) => {
        setFormInfo({ ...formInfo, exclusive: !formInfo.exclusive });
    }

    const handleBetweenWaitingList = () => {
        setFormInfo({ ...formInfo, waitingList: !formInfo.waitingList });
    }

    const handleBetweenPayment = () => {
        setFormInfo({ ...formInfo, payment: !formInfo.payment });
    }

    const handleBetweenSocios = () => {
        setFormCreate({ ...formCreate, socios: !formCreate.socios });
    }

    const handleChangeSelect = (e) => {
        const numberOfDues = parseInt(e.target.value);
        const today = DateTime.now().plus({ months: 1 }).toFormat('01-MM-yyyy');
        let duesInfo = [today];

        for (let i = 1; i < numberOfDues; i++) {
            const nextDueDate = DateTime.fromFormat(duesInfo[i - 1], 'dd-MM-yyyy').plus({ months: 1 }).toFormat('dd-MM-yyyy');
            duesInfo.push(nextDueDate);
        }

        setFormInfo({
            ...formInfo,
            duesNumber: numberOfDues,
            duesInfo: duesInfo
        });
    };

    const handleStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();
        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            setFormInfo(prevState => ({ ...prevState, startDate: date1 }));
        }
    }

    const handleEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = formInfo.startDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setFormInfo(prevState => ({ ...prevState, endingDate: date2 }));
        }
    }

    const handlePreStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();

        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            setFormInfo({ ...formInfo, preStartingDate: date1 });
        }
    }

    const handlePreEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = formInfo.preStartingDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setFormInfo({ ...formInfo, preEndingDate: date2 });
        }
    }


    const handleEndingDateExpirate = (e) => {
        setFormCreate({
            ...formCreate,
            expiracion: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onValueChange(false);
        formCreate.id = Math.floor(Math.random() * 10000);
        arrayMagico.push(formCreate);
    }

    const handleReturnAndSave = () => {
        const updatedArrayMagico = [...arrayMagico, formCreate];
        setArrayMagico(updatedArrayMagico);
        onValueChange(false);
        formInfo.preview = true;
    }

    const handleWinterProgram = () => {
        const updatedWinterProgram = !formInfo.winterProgram;
        let updatedDuration = formInfo.duration;

        if (updatedWinterProgram && formInfo.summerProgram) {
            updatedDuration = "allYear";
        } else if (updatedWinterProgram && !formInfo.summerProgram) {
            updatedDuration = "winter";
        } else if (!updatedWinterProgram && formInfo.summerProgram) {
            updatedDuration = "summer";
        }

        setFormInfo({
            ...formInfo,
            winterProgram: updatedWinterProgram,
            duration: updatedDuration
        });
    };

    const handleSummerProgram = () => {
        const updatedSummerProgram = !formInfo.summerProgram;
        let updatedDuration = formInfo.duration;

        if (formInfo.winterProgram && updatedSummerProgram) {
            updatedDuration = "allYear";
        } else if (formInfo.winterProgram && !updatedSummerProgram) {
            updatedDuration = "winter";
        } else if (!formInfo.winterProgram && updatedSummerProgram) {
            updatedDuration = "summer";
        }

        setFormInfo({
            ...formInfo,
            summerProgram: updatedSummerProgram,
            duration: updatedDuration
        });
    };

    const handleAdultsProgram = () => {
        const updatedAdultsProgram = !formInfo.adultsProgram;
        let updatedAgeDescription = formInfo.ageDescription;

        if (formInfo.childrenProgram && updatedAdultsProgram) {
            updatedAgeDescription = "allAges";
        } else if (formInfo.childrenProgram && !updatedAdultsProgram) {
            updatedAgeDescription = "children";
        } else if (!formInfo.childrenProgram && updatedAdultsProgram) {
            updatedAgeDescription = "adults";
        }

        setFormInfo({
            ...formInfo,
            adultsProgram: updatedAdultsProgram,
            ageDescription: updatedAgeDescription
        });
    };

    const handleChildrenProgram = () => {
        const updatedChildrenProgram = !formInfo.childrenProgram;
        let updatedAgeDescription = formInfo.ageDescription;

        if (updatedChildrenProgram && formInfo.adultsProgram) {
            updatedAgeDescription = "allAges";
        } else if (updatedChildrenProgram && !formInfo.adultsProgram) {
            updatedAgeDescription = "children";
        } else if (!updatedChildrenProgram && formInfo.adultsProgram) {
            updatedAgeDescription = "adults";
        }

        setFormInfo({
            ...formInfo,
            childrenProgram: updatedChildrenProgram,
            ageDescription: updatedAgeDescription
        });
    };

    const handlePoolProgram = () => {
        const updatedPoolProgram = !formInfo.poolProgram;
        let updatedPoolProgramOption = formInfo.poolProgramOption;

        if (updatedPoolProgram) {
            updatedPoolProgramOption = "pool";
        }

        setFormInfo({
            ...formInfo,
            poolProgram: updatedPoolProgram,
            poolProgramOption: updatedPoolProgramOption
        });
    };

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
                setFormInfo(prevState => ({ ...prevState, image: reader.result }));
            };
        };
        input.click();
    }

    return (
        <>
            <div className="form-create" onSubmit={handleSubmit}>
                <div className="flex-center">
                    <div className="form-title">
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <h2>Tipo</h2>
                            </Grid>
                            <Grid item xs={8}>
                                <Select
                                    label="Tipo"
                                    name="tipo"
                                    value={formCreate.tipo}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <MenuItem value="curso">Curso</MenuItem>
                                    <MenuItem value="entrada">Entrada</MenuItem>
                                    <MenuItem value="evento">Evento</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="create-data">
                    <div className="flex-center">
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <h4 className="form-data-title-info">Producto</h4>
                            </Grid>
                            <Grid item xs={8}>
                                <div className="flex-start">
                                    <div className="form-desc">
                                        <InputBase
                                            onChange={handleInput}
                                            className="form-input"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            value={formCreate.producto}
                                            required
                                            name="producto"
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <h4 className="form-data-title-info">Accesos</h4>
                            </Grid>
                            <Grid item xs={8}>
                                <div className="flex-start">
                                    <div className="form-desc">
                                        <InputBase
                                            onChange={handleInput}
                                            className="form-input"
                                            variant="outlined"
                                            fullWidth
                                            value={formCreate.accesos}
                                            name="accesos"
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <h4 className="form-data-title-info">Socios</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="flex-start">
                                    <Button className="form-data-checkbox" onClick={handleBetweenSocios}>
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<RadioButtonCheckedIcon />}
                                            checked={formCreate.socios}
                                            shape='round'
                                            size="small"
                                            name="socios"
                                            className="form-checkbox"
                                        />
                                        <span>Si</span>
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="flex-start">
                                    <Button className="form-data-checkbox" onClick={handleBetweenSocios}>
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<RadioButtonCheckedIcon />}
                                            checked={!formCreate.socios}
                                            size="small"
                                            name="socios"
                                            className="form-checkbox"
                                        />
                                        <span>No</span>
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <h4 className="form-data-title-info">Precio</h4>
                            </Grid>
                            <Grid item xs={8}>
                                <div className="flex-start">
                                    <div className="form-desc">
                                        <InputBase
                                            onChange={handleInput}
                                            className="form-input"
                                            variant="outlined"
                                            fullWidth
                                            value={formCreate.precio}
                                            name="precio"
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <h4 className="form-data-title-info">Stock</h4>
                            </Grid>
                            <Grid item xs={8}>
                                <div className="flex-start">
                                    <div className="form-desc">
                                        <InputBase
                                            onChange={handleInput}
                                            className="form-input"
                                            variant="outlined"
                                            fullWidth
                                            value={formCreate.stock}
                                            name="stock"
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <h4 className="form-data-title-info">Fecha Expiracion</h4>
                            </Grid>
                            <Grid item xs={8}>
                                <div className="flex-start">
                                    <input
                                        onChange={handleEndingDateExpirate}
                                        type="date"
                                        value={formCreate.expiracion}
                                        className="form-button-date"
                                        required
                                        name="expiracion"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <h4 className="form-data-title-info">Visible</h4>
                            </Grid>
                            <Grid item xs={8}>
                                <div className="flex-start">
                                    <Button className="create-button" onClick={handleChecked}>
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<RadioButtonCheckedIcon />}
                                            name="visible"
                                            value={formCreate.visible}
                                        />
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
            <div className="form-event">
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
                                {formInfo.smallDescEs.length > 50 ? (
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
                                        value={formInfo.smallDescEs}
                                        required
                                        name="smallDescEs"
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3} lg={2}>
                            <div className="form-desc-title">
                                <h4>Descripción larga</h4>
                                {formInfo.largeDescEs.length > 500 ? (
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
                                        value={formInfo.largeDescEs}
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
                                {formInfo.smallDescVal.length > 50 ? (
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
                                        value={formInfo.smallDescVal}
                                        required
                                        name="smallDescVal"
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3} lg={2}>
                            <div className="form-desc-title">
                                <h4>Descripció llarga</h4>
                                {formInfo.largeDescVal.length > 500 ? (
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
                                        value={formInfo.largeDescVal}
                                        required
                                        name="largeDescVal"
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div>
                {formCreate.tipo === "curso" ? (
                    <div className="form-data">
                        <div className="event-data">
                            <Grid container alignItems='center'>
                                <Grid item xs={12}>
                                    <div className="form-data-title">
                                        <h2>ENTRADA</h2>
                                    </div>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <h4 className="form-data-title-info">Plazas disponibles</h4>
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        {formInfo.unlimited ? (
                                            <div className="form-info">Ilimitadas</div>
                                        ) : (
                                            <div className="form-info">
                                                <InputBase
                                                    onChange={handleChangeInput}
                                                    className="form-input"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={formInfo.courseNumber}
                                                    name="courseNumber"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        <Button className="form-data-checkbox" onClick={handleCheckedInfo}>
                                            <Checkbox
                                                checked={formInfo.unlimited}
                                                size="small"
                                                name="unlimited"
                                                className="form-checkbox"
                                            />
                                            <span>Ilimitadas</span>
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="event-data">
                            <Grid container alignItems='center'>
                                <Grid item xs={12} md={5} lg={4}>
                                    <div className="flex-start">
                                        <h4 className="form-data-title-info">Inicio Preinscripción</h4>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={7} lg={8}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        <input
                                            onChange={handlePreStartingDate}
                                            type="date"
                                            value={formInfo.preStartingDate}
                                            className="form-button-date"
                                            required
                                            name="preStartDate"
                                            min={DateTime.now().toISODate()}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="event-data">
                            <Grid container alignItems='center'>
                                <Grid item xs={12} md={5} lg={4}>
                                    <div className="flex-start">
                                        <h4 className="form-data-title-info">Final Preinscripción</h4>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={7} lg={8}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        <input
                                            onChange={handlePreEndingDate}
                                            type="date"
                                            value={formInfo.preEndingDate}
                                            className="form-button-date"
                                            required
                                            name="preEndingDate"
                                            max={formInfo.startDate}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="event-data">
                            <Grid container alignItems='center'>
                                <Grid item xs={12} lg={4}>
                                    <h4 className="form-data-title-info">Permitir lista de espera</h4>
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        <Button className="form-data-checkbox" onClick={handleBetweenWaitingList}>
                                            <Checkbox
                                                icon={<RadioButtonUncheckedIcon />}
                                                checkedIcon={<RadioButtonCheckedIcon />}
                                                checked={formInfo.waitingList}
                                                shape='round'
                                                size="small"
                                                name="waitingList"
                                                className="form-checkbox"
                                            />
                                            <span>Si</span>
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        <Button className="form-data-checkbox" onClick={handleBetweenWaitingList}>
                                            <Checkbox
                                                icon={<RadioButtonUncheckedIcon />}
                                                checkedIcon={<RadioButtonCheckedIcon />}
                                                checked={!formInfo.waitingList}
                                                shape='round'
                                                size="small"
                                                name="waitingList"
                                                className="form-checkbox"
                                            />
                                            <span>No</span>
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="event-data">
                            <Grid container alignItems={'center'}>
                                <Grid item xs={12} md={5} lg={4}>
                                    <div className="flex-start">
                                        <h4 className="form-data-title-info">Fecha inicio</h4>
                                        <h6 className="form-subtitle-data">(cuando podrá comenzar a usarse las entradas)</h6>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={7} lg={8}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        <input
                                            onChange={handleStartingDate}
                                            type="date"
                                            value={formInfo.startDate}
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
                            <Grid container alignItems='center'>
                                <Grid item xs={12} md={5} lg={4}>
                                    <div className="flex-start">
                                        <h4 className="form-data-title-info">Fecha fin</h4>
                                        <h6 className="form-subtitle-data">(cuando expirará las entradas)</h6>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={7} lg={8}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        <input
                                            onChange={handleEndingDate}
                                            type="date"
                                            value={formInfo.endingDate}
                                            className="form-button-date"
                                            required
                                            name="endingDate"
                                            min={formInfo.startDate}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="event-data">
                            <Grid container alignItems='center'>
                                <Grid item xs={12} lg={4}>
                                    <h4 className="form-data-title-info">Importe cuota SOCIOS</h4>
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        {formInfo.memberFree ? (
                                            <div className="form-info">Gratuito</div>
                                        ) : (
                                            <div className="form-info">
                                                <InputBase
                                                    onChange={handleChangeInput}
                                                    className="form-input"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={formInfo.memberDues}
                                                    name="memberDues"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        <Button className="form-data-checkbox" onClick={handleCheckedInfo}>
                                            <Checkbox
                                                checked={formInfo.memberFree}
                                                size="small"
                                                name="memberFree"
                                                className="form-checkbox"
                                            />
                                            <span>Gratuito</span>
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <h4 className="form-data-title-info">Importe cuota NO SOCIOS</h4>
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        {formInfo.nonMemberFree ? (
                                            <div className="form-info">Gratuito</div>
                                        ) : (
                                            <div className="form-info">
                                                <InputBase
                                                    onChange={handleChangeInput}
                                                    className="form-input"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={formInfo.nonMemberDues}
                                                    name="nonMemberDues"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        <Button className="form-data-checkbox" onClick={handleCheckedInfo}>
                                            <Checkbox
                                                checked={formInfo.nonMemberFree}
                                                size="small"
                                                name="nonMemberFree"
                                                className="form-checkbox"
                                            />
                                            <span>Gratuito</span>
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        {(!formInfo.memberFree || !formInfo.nonMemberFree) && (
                            <>
                                <div className="event-data">
                                    <Grid container alignItems='center'>
                                        <Grid item xs={12} lg={4}>
                                            <h4 className="form-data-title-info">Permitir pago a plazos</h4>
                                        </Grid>
                                        <Grid item xs={6} lg={4}>
                                            <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                                <Button className="form-data-checkbox" onClick={handleBetweenPayment}>
                                                    <Checkbox
                                                        icon={<RadioButtonUncheckedIcon />}
                                                        checkedIcon={<RadioButtonCheckedIcon />}
                                                        checked={formInfo.payment}
                                                        shape='round'
                                                        size="small"
                                                        name="payment"
                                                        className="form-checkbox"
                                                    />
                                                    <span>Si</span>
                                                </Button>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6} lg={4}>
                                            <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                                <Button className="form-data-checkbox" onClick={handleBetweenPayment}>
                                                    <Checkbox
                                                        icon={<RadioButtonUncheckedIcon />}
                                                        checkedIcon={<RadioButtonCheckedIcon />}
                                                        checked={!formInfo.payment}
                                                        size="small"
                                                        name="payment"
                                                        className="form-checkbox"
                                                    />
                                                    <span>No</span>
                                                </Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                                {formInfo.payment && (
                                    <div className="event-data">
                                        <Grid container alignItems='center'>
                                            <Grid item xs={12} lg={4}>
                                                <h4 className="form-data-title-info">Nº de Cuotas</h4>
                                            </Grid>
                                            <Grid item xs={12} lg={8}>
                                                <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                                    <div className="form-info">
                                                        <Select
                                                            onChange={handleChangeSelect}
                                                            className="form-input-select"
                                                            variant="outlined"
                                                            fullWidth
                                                            defaultValue={1}
                                                            name="duesNumber"
                                                        >
                                                            <MenuItem value={1} key={1}>1</MenuItem>
                                                            <MenuItem value={2} key={2}>2</MenuItem>
                                                            <MenuItem value={3} key={3}>3</MenuItem>
                                                            <MenuItem value={4} key={4}>4</MenuItem>
                                                            <MenuItem value={6} key={6}>6</MenuItem>
                                                            <MenuItem value={12} key={12}>12</MenuItem>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} lg={4}>
                                                <h4 className="form-data-title-info">Precio por cuota:</h4>
                                            </Grid>
                                            {!formInfo.memberFree && (
                                                <>
                                                    {width < 1200 && (
                                                        <Grid item xs={1}></Grid>
                                                    )}
                                                    <Grid item xs={11} sm={5} lg={4}>
                                                        <h4 className="form-data-title-info">Socios: {(formInfo.memberDues / formInfo.duesNumber).toFixed(2)} €</h4>
                                                    </Grid>
                                                </>
                                            )}
                                            {!formInfo.nonMemberFree && (
                                                <>
                                                    {width < 1200 && (
                                                        <Grid item xs={1}></Grid>
                                                    )}
                                                    <Grid item xs={11} sm={5} lg={4}>
                                                        <h4 className="form-data-title-info">No socios: {(formInfo.nonMemberDues / formInfo.duesNumber).toFixed(2)} €</h4>
                                                    </Grid>
                                                </>
                                            )}
                                            <Grid item xs={12}>
                                                <h4 className="form-data-title-info">Fecha de pago:</h4>
                                            </Grid>
                                            {formInfo.duesInfo.map((due, index) => (
                                                <Grid key={index} item xs={12} sm={6} lg={4}>
                                                    <h4 className="dues-table">{`Cuota ${index + 1}, Día ${due}`}</h4>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div>
                                )}
                            </>
                        )}
                        <div className="event-data">
                            <Grid container>
                                <Grid item xs={12} md={6} lg={3}>
                                    <div className="flex-start">
                                        <h4>Imagen</h4>
                                    </div>
                                </Grid>
                                <Grid item xs={12} lg={8}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        {!formInfo.image ? (
                                            <>
                                                <label htmlFor="input-image" onClick={() => { inputRef.current.click() }}>
                                                    <img src={MYIMAGE} alt="imagen" />
                                                </label>
                                                <input style={{ display: 'none' }} id="input-image" type="file" ref={inputRef} className="form-button-image" onChange={handleUploadImage} />
                                            </>
                                        ) : (
                                            <div className="form-image flex-center">
                                                <img src={formInfo.image} alt="imagen" />
                                                <Button onClick={() => setFormInfo({ ...formInfo, image: null })} className="form-button-image">
                                                    <span>¿Borrar?</span>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                ) : formCreate.tipo === "entrada" ? (
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
                                </Grid>
                                <Grid item xs={6} sm={2} >
                                    <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                        {formInfo.unlimited === true ? (
                                            <div className="form-info">Ilimitadas</div>
                                        ) : (
                                            <div className="form-info">
                                                <InputBase
                                                    onChange={handleChangeInput}
                                                    className="form-input"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={formInfo.eventNumber}
                                                    style={{ paddingTop: '0.4em' }}
                                                    name="eventNumber"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={6} sm={5} lg={7}>
                                    <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                        <Button className="form-data-checkbox" onClick={handleCheckedInfo}>
                                            <Checkbox
                                                checked={formInfo.unlimited}
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
                                    {formInfo.ticketPrice === "" ? (
                                        <h6 className="form-alert">(Si está vacío será gratuito)</h6>
                                    ) : (
                                        <h6 style={{ display: 'none' }}>()</h6>
                                    )}
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                        {formInfo.free === true ? (
                                            <div className="form-info">Gratuito</div>
                                        ) : (
                                            <div className="form-info">
                                                <InputBase
                                                    onChange={handleChangeInput}
                                                    className="form-input"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={formInfo.ticketPrice}
                                                    style={{ paddingTop: '0.4em' }}
                                                    name="ticketPrice"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={6} sm={5} lg={7}>
                                    <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                        <Button className="form-data-checkbox" onClick={handleCheckedInfo}>
                                            <Checkbox
                                                style={{ marginTop: '-0.1em' }}
                                                checked={formInfo.free}
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
                                                checked={formInfo.exclusive === true ? true : false}
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
                                                checked={formInfo.exclusive === false ? true : false}
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
                                            value={formInfo.startDate}
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
                                            value={formInfo.endingDate}
                                            className="form-button-date"
                                            required
                                            name="endingDate"
                                            min={formInfo.startDate}
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
                                <Grid item xs={12} lg={8}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        {!formInfo.image ? (
                                            <>
                                                <label htmlFor="input-image" onClick={() => { inputRef.current.click() }}>
                                                    <img src={MYIMAGE} alt="imagen" />
                                                </label>
                                                <input style={{ display: 'none' }} id="input-image" type="file" ref={inputRef} className="form-button-image" onChange={handleUploadImage} />
                                            </>
                                        ) : (
                                            <div className="form-image flex-center">
                                                <img src={formInfo.image} alt="imagen" />
                                                <Button onClick={() => setFormInfo({ ...formInfo, image: null })} className="form-button-image">
                                                    <span>¿Borrar?</span>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                ) : formCreate.tipo === "evento" ? (
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
                                    {formInfo.eventNumber === "" ? (
                                        <h6 className="form-alert">(Si está vacío será ilimitado)</h6>
                                    ) : (
                                        <h6 style={{ display: 'none' }}>()</h6>
                                    )}
                                </Grid>
                                <Grid item xs={6} sm={2} >
                                    <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                        {formInfo.unlimited === true ? (
                                            <div className="form-info">Ilimitadas</div>
                                        ) : (
                                            <div className="form-info">
                                                <InputBase
                                                    onChange={handleChangeInput}
                                                    className="form-input"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={formInfo.eventNumber}
                                                    style={{ paddingTop: '0.4em' }}
                                                    name="eventNumber"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={6} sm={5} lg={7}>
                                    <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                        <Button className="form-data-checkbox" onClick={handleCheckedInfo}>
                                            <Checkbox
                                                checked={formInfo.unlimited}
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
                                    {formInfo.eventPrice === "" ? (
                                        <h6 className="form-alert">(Si está vacío será gratuito)</h6>
                                    ) : (
                                        <h6 style={{ display: 'none' }}>()</h6>
                                    )}
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                        {formInfo.free === true ? (
                                            <div className="form-info">Gratuito</div>
                                        ) : (
                                            <div className="form-info">
                                                <InputBase
                                                    onChange={handleChangeInput}
                                                    className="form-input"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={formInfo.eventPrice}
                                                    style={{ paddingTop: '0.4em' }}
                                                    name="eventPrice"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={6} sm={5} lg={7}>
                                    <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                        <Button className="form-data-checkbox" onClick={handleCheckedInfo}>
                                            <Checkbox
                                                style={{ marginTop: '-0.1em' }}
                                                checked={formInfo.free}
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
                                                checked={formInfo.exclusive === true ? true : false}
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
                                                checked={formInfo.exclusive === false ? true : false}
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
                                            value={formInfo.startDate}
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
                                            value={formInfo.endingDate}
                                            className="form-button-date"
                                            required
                                            name="endingDate"
                                            min={formInfo.startDate}
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
                                <Grid item xs={12} lg={8}>
                                    <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                        {!formInfo.image ? (
                                            <>
                                                <label htmlFor="input-image" onClick={() => { inputRef.current.click() }}>
                                                    <img src={MYIMAGE} alt="imagen" />
                                                </label>
                                                <input style={{ display: 'none' }} id="input-image" type="file" ref={inputRef} className="form-button-image" onChange={handleUploadImage} />
                                            </>
                                        ) : (
                                            <div className="form-image flex-center">
                                                <img src={formInfo.image} alt="imagen" />
                                                <Button onClick={() => setFormInfo({ ...formInfo, image: null })} className="form-button-image">
                                                    <span>¿Borrar?</span>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                ) : null}
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
                                    checked={formInfo.winterProgram}
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
                                    checked={formInfo.summerProgram}
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
                                    checked={formInfo.childrenProgram}
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
                                    checked={formInfo.adultsProgram}
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
                                    checked={formInfo.poolProgram}
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
            <div className="flex-center">
                <Button onClick={handleReturnAndSave}>
                    <span className="create-button-option">Crear</span>
                </Button>
                <Button onClick={() => onValueChange(false)}>
                    <span className="create-button-option">Cancelar</span>
                </Button>
            </div>
        </>
    );
}

export default FormCreate;
