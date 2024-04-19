import React, { useState, useRef, useEffect } from "react";
import { Grid, InputBase, Checkbox, Button, MenuItem, Select } from "@mui/material";
import { DateTime } from "luxon";
import toast, { Toaster } from "react-hot-toast";

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import { useWindowSize } from '../../hooks/useWindowSize';

import PreviewCourse from "./PreviewCourse";

import "./formCourse.css";

const MYIMAGE = "imagen.png";
const MYIMAGE2 = "novisible.png";

const FormCourse = () => {
    // Global Utils
    const inputRef = useRef(null);
    const { width } = useWindowSize();

    // Values
    const [formCreate, setFormCreate] = useState({
        preview: false,
        visible: false,
        smallDescEs: "",
        largeDescEs: "",
        smallDescVal: "",
        largeDescVal: "",
        unlimited: false,
        courseNumber: 45,
        waitingList: false,
        startDate: "",
        endingDate: "",
        image: null,
        duration: "",
        winterProgram: false,
        summerProgram: false,
        ageDescription: "",
        childrenProgram: false,
        adultsProgram: false,
        poolProgramOption: "",
        poolProgram: false,
        preStartingDate: "",
        preEndingDate: "",
        payment: false,
        duesNumber: 1,
        memberDues: 40,
        memberFree: false,
        nonMemberDues: 70,
        nonMemberFree: false,
        duesInfo: [],
        createTableForm: []
    });

    const handleCreateTableForm = () => {
        // if (!formCreate.smallDescEs || !formCreate.largeDescEs || !formCreate.smallDescVal || !formCreate.largeDescVal) {
        //     toast.error("Debes rellenar todos los campos de descripción");
        // } else if (formCreate.courseNumber < 1 && !formCreate.unlimited) {
        //     toast.error("El número de plazas debe ser mayor a 0 plazas");
        // } else if (!formCreate.startDate || !formCreate.endingDate || !formCreate.preStartingDate || !formCreate.preEndingDate) {
        //     toast.error("Debes rellenar todas las fechas");
        // } else if (formCreate.startDate > formCreate.endingDate) {
        //     toast.error("La fecha de inicio no puede ser mayor a la fecha de fin");
        // } else if (formCreate.preStartingDate > formCreate.preEndingDate) {
        //     toast.error("La fecha de inicio de preinscripción no puede ser mayor a la fecha de fin de preinscripción");
        // } else if (formCreate.preStartingDate > formCreate.startDate) {
        //     toast.error("La fecha de inicio no puede ser menor a la fecha de inicio de preinscripción");
        // } else if (!formCreate.image) {
        //     toast.error("Debes subir una imagen");
        // } else if (!formCreate.winterProgram && !formCreate.summerProgram) {
        //     toast.error("Debes seleccionar al menos una temporada");
        // } else if (!formCreate.childrenProgram && !formCreate.adultsProgram) {
        //     toast.error("Debes seleccionar al menos un rango de edad");
        // } else {
        setFormCreate({
            ...formCreate,
            createTableForm: [
                ...formCreate.createTableForm,
                {
                    type: "Curso",
                    product: formCreate.largeDescEs ? formCreate.largeDescEs : "No hay descripción",
                    access: 5,
                    members: ((formCreate.memberFree && formCreate.nonMemberFree) || (!formCreate.memberFree && !formCreate.nonMemberFree)) ? "TODOS" : !formCreate.memberFree && formCreate.nonMemberFree ? "SI" : "NO",
                    price: formCreate.memberFree && formCreate.nonMemberFree ? "Gratuito" : !formCreate.memberFree ? formCreate.memberDues : formCreate.nonMemberDues,
                    stock: formCreate.unlimited ? "Ilimitadas" : formCreate.courseNumber,
                    expiration: formCreate.endingDate ? formCreate.endingDate : "No hay fecha de fin",
                    visible: formCreate.visible ? "Si" : "No",
                    actions: ""
                }
            ]
        });
        toast.success("Curso creado correctamente");
        // }
    }

    useEffect(() => {
        handleSetDuesInfo();
    }, []);

    const handleSetDuesInfo = () => {
        const day1 = DateTime.now().plus({ months: 1 }).startOf('month').toFormat('dd-MM-yyyy');

        setFormCreate({
            ...formCreate,
            startDate: day1,
            duesInfo: [day1]
        });
    }

    const handleChangeSelect = (e) => {
        const numberOfDues = parseInt(e.target.value);
        const today = DateTime.now().plus({ months: 1 }).toFormat('01-MM-yyyy');
        let duesInfo = [today];

        for (let i = 1; i < numberOfDues; i++) {
            const nextDueDate = DateTime.fromFormat(duesInfo[i - 1], 'dd-MM-yyyy').plus({ months: 1 }).toFormat('dd-MM-yyyy');
            duesInfo.push(nextDueDate);
        }

        setFormCreate({
            ...formCreate,
            duesNumber: numberOfDues,
            duesInfo: duesInfo
        });
    };

    const handlePreview = () => {
        setFormCreate({ ...formCreate, preview: !formCreate.preview });
    }

    const handleChecked = (e) => {
        setFormCreate({ ...formCreate, [e.target.name]: e.target.checked });
    }

    const handleChangeInput = (e) => {
        setFormCreate({ ...formCreate, [e.target.name]: e.target.value });
    }

    const handleBetweenWaitingList = () => {
        setFormCreate({ ...formCreate, waitingList: !formCreate.waitingList });
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

    const handleBetweenPayment = () => {
        setFormCreate({ ...formCreate, payment: !formCreate.payment });
    }

    const handleStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();

        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            setFormCreate({ ...formCreate, startDate: date1 });
        }
    }

    const handleEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = formCreate.startDate;

        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setFormCreate({ ...formCreate, endingDate: date2 });
        }
    }

    const handlePreStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();

        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            setFormCreate({ ...formCreate, preStartingDate: date1 });
        }
    }

    const handlePreEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = formCreate.preStartingDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setFormCreate({ ...formCreate, preEndingDate: date2 });
        }
    }

    const handleUploadImage = () => {
        const file = inputRef.current.files[0];
        const url = URL.createObjectURL(file);
        setFormCreate({ ...formCreate, image: url });
    }

    return (
        <>
            {!formCreate.preview ? (
                <form>
                    <div className="form-course">
                        <div className="form-es">
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item xs={12} sm={3} lg={2}>
                                    <div className="form-es-title">
                                        <h2>ES</h2>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={9} lg={10}>
                                    <p className="form-line">
                                    </p>
                                </Grid>
                                <Grid item xs={12} sm={3} lg={2}>
                                    <div className="form-desc-title">
                                        <h4>Descripción corta</h4>
                                        {formCreate.smallDescEs.length > 50 && (
                                            <h6 className="form-subtitle-data">(máximo de 50 carácteres)</h6>
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
                                        {formCreate.largeDescEs.length > 500 && (
                                            <h6 className="form-subtitle-data">(máximo de 500 carácteres)</h6>
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
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item xs={12} sm={3} lg={2}>
                                    <div className="form-val-title">
                                        <h2>VAL</h2>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={9} lg={10}>
                                    <p className="form-line">
                                    </p>
                                </Grid>
                                <Grid item xs={12} sm={3} lg={2}>
                                    <div className="form-desc-title">
                                        <h4>Descripció curta</h4>
                                        {formCreate.smallDescVal.length > 50 && (
                                            <h6 className="form-subtitle-data">(màxim de 50 caràcters)</h6>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={9} lg={10}>
                                    <div className="form-desc-small">
                                        <div className="flex-start">
                                            <InputBase
                                                required
                                                fullWidth
                                                onChange={handleChangeInput}
                                                className="form-input"
                                                variant="outlined"
                                                value={formCreate.smallDescVal}
                                                name="smallDescVal"
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={3} lg={2}>
                                    <div className="form-desc-title">
                                        <h4>Descripció llarga</h4>
                                        {formCreate.largeDescVal.length > 500 && (
                                            <h6 className="form-subtitle-data">(màxim de 500 caràcters)</h6>
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
                            <div className="course-data">
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
                                            {formCreate.unlimited ? (
                                                <div className="form-info">Ilimitadas</div>
                                            ) : (
                                                <div className="form-info">
                                                    <InputBase
                                                        onChange={handleChangeInput}
                                                        className="form-input"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={formCreate.courseNumber}
                                                        name="courseNumber"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} lg={4}>
                                        <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleChecked}>
                                                <Checkbox
                                                    checked={formCreate.unlimited}
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
                            <div className="course-data">
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
                                                value={formCreate.preStartingDate}
                                                className="form-button-date"
                                                required
                                                name="preStartDate"
                                                min={DateTime.now().toISODate()}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="course-data">
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
                                                value={formCreate.preEndingDate}
                                                className="form-button-date"
                                                required
                                                name="preEndingDate"
                                                max={formCreate.startDate}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="course-data">
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
                                                    checked={formCreate.waitingList}
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
                                                    checked={!formCreate.waitingList}
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
                            <div className="course-data">
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
                                                value={formCreate.startDate}
                                                className="form-button-date"
                                                required
                                                name="startDate"
                                                min={DateTime.now().toISODate()}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="course-data">
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
                                                value={formCreate.endingDate}
                                                className="form-button-date"
                                                required
                                                name="endingDate"
                                                min={formCreate.startDate}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="course-data">
                                <Grid container alignItems='center'>
                                    <Grid item xs={12} lg={4}>
                                        <h4 className="form-data-title-info">Importe cuota SOCIOS</h4>
                                    </Grid>
                                    <Grid item xs={6} lg={4}>
                                        <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                            {formCreate.memberFree ? (
                                                <div className="form-info">Gratuito</div>
                                            ) : (
                                                <div className="form-info">
                                                    <InputBase
                                                        onChange={handleChangeInput}
                                                        className="form-input"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={formCreate.memberDues}
                                                        name="memberDues"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} lg={4}>
                                        <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleChecked}>
                                                <Checkbox
                                                    checked={formCreate.memberFree}
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
                                            {formCreate.nonMemberFree ? (
                                                <div className="form-info">Gratuito</div>
                                            ) : (
                                                <div className="form-info">
                                                    <InputBase
                                                        onChange={handleChangeInput}
                                                        className="form-input"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={formCreate.nonMemberDues}
                                                        name="nonMemberDues"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} lg={4}>
                                        <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleChecked}>
                                                <Checkbox
                                                    checked={formCreate.nonMemberFree}
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
                            {(!formCreate.memberFree || !formCreate.nonMemberFree) && (
                                <>
                                    <div className="course-data">
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
                                                            checked={formCreate.payment}
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
                                                            checked={!formCreate.payment}
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
                                    {formCreate.payment && (
                                        <div className="course-data">
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
                                                {!formCreate.memberFree && (
                                                    <>
                                                        {width < 1200 && (
                                                            <Grid item xs={1}></Grid>
                                                        )}
                                                        <Grid item xs={11} sm={5} lg={4}>
                                                            <h4 className="form-data-title-info">Socios: {(formCreate.memberDues / formCreate.duesNumber).toFixed(2)} €</h4>
                                                        </Grid>
                                                    </>
                                                )}
                                                {!formCreate.nonMemberFree && (
                                                    <>
                                                        {width < 1200 && (
                                                            <Grid item xs={1}></Grid>
                                                        )}
                                                        <Grid item xs={11} sm={5} lg={4}>
                                                            <h4 className="form-data-title-info">No socios: {(formCreate.nonMemberDues / formCreate.duesNumber).toFixed(2)} €</h4>
                                                        </Grid>
                                                    </>
                                                )}
                                                <Grid item xs={12}>
                                                    <h4 className="form-data-title-info">Fecha de pago:</h4>
                                                </Grid>
                                                {formCreate.duesInfo.map((due, index) => (
                                                    <Grid key={index} item xs={12} sm={6} lg={4}>
                                                        <h4 className="dues-table">{`Cuota ${index + 1}, Día ${due}`}</h4>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="course-image">
                                <Grid container alignItems='center'>
                                    <Grid item xs={12} lg={4}>
                                        <div className="flex-start">
                                            <h4 className="form-data-title-info">Imagen</h4>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={8}>
                                        <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                            {!formCreate.image ? (
                                                <>
                                                    <label htmlFor="input-image" onClick={() => { inputRef.current.click() }}>
                                                        <img src={MYIMAGE} alt="imagen" />
                                                    </label>
                                                    <input style={{ display: 'none' }} id="input-image" type="file" ref={inputRef} className="form-button-image" onChange={handleUploadImage} />
                                                </>
                                            ) : (
                                                <div className="form-image flex-center">
                                                    <img src={formCreate.image} alt="imagen" />
                                                    <Button onClick={() => setFormCreate({ ...formCreate, image: null })} className="form-button-image">
                                                        <span>¿Borrar?</span>
                                                    </Button>
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
            ) : (
                <>
                    {formCreate.visible ? (
                        <PreviewCourse
                            formCreate={formCreate}
                            setPreview={handlePreview}
                        />
                    ) : (
                        <div className="form-dialog">
                            <div className="preview-container">
                                <div className="preview-title">
                                    <h1>Contenido no visible</h1>
                                </div>
                                <div className="flex-center">
                                    <div className="preview-image">
                                        <img src={MYIMAGE2} alt="No visible" />
                                    </div>
                                </div>
                                <div className="flex-end">
                                    <div className="preview-button">
                                        <Button onClick={handlePreview}>
                                            <span>Cerrar</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
            <Toaster />
        </>
    );
}

export default FormCourse;