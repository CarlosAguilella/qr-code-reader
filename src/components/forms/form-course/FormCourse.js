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
    const [formInfo, setFormInfo] = useState({
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
        // if (!formInfo.smallDescEs || !formInfo.largeDescEs || !formInfo.smallDescVal || !formInfo.largeDescVal) {
        //     toast.error("Debes rellenar todos los campos de descripción");
        // } else if (formInfo.courseNumber < 1 && !formInfo.unlimited) {
        //     toast.error("El número de plazas debe ser mayor a 0 plazas");
        // } else if (!formInfo.startDate || !formInfo.endingDate || !formInfo.preStartingDate || !formInfo.preEndingDate) {
        //     toast.error("Debes rellenar todas las fechas");
        // } else if (formInfo.startDate > formInfo.endingDate) {
        //     toast.error("La fecha de inicio no puede ser mayor a la fecha de fin");
        // } else if (formInfo.preStartingDate > formInfo.preEndingDate) {
        //     toast.error("La fecha de inicio de preinscripción no puede ser mayor a la fecha de fin de preinscripción");
        // } else if (formInfo.preStartingDate > formInfo.startDate) {
        //     toast.error("La fecha de inicio no puede ser menor a la fecha de inicio de preinscripción");
        // } else if (!formInfo.image) {
        //     toast.error("Debes subir una imagen");
        // } else if (!formInfo.winterProgram && !formInfo.summerProgram) {
        //     toast.error("Debes seleccionar al menos una temporada");
        // } else if (!formInfo.childrenProgram && !formInfo.adultsProgram) {
        //     toast.error("Debes seleccionar al menos un rango de edad");
        // } else {
        setFormInfo({
            ...formInfo,
            createTableForm: [
                ...formInfo.createTableForm,
                {
                    type: "Curso",
                    product: formInfo.largeDescEs ? formInfo.largeDescEs : "No hay descripción",
                    access: 5,
                    members: ((formInfo.memberFree && formInfo.nonMemberFree) || (!formInfo.memberFree && !formInfo.nonMemberFree)) ? "TODOS" : !formInfo.memberFree && formInfo.nonMemberFree ? "SI" : "NO",
                    price: formInfo.memberFree && formInfo.nonMemberFree ? "Gratuito" : !formInfo.memberFree ? formInfo.memberDues : formInfo.nonMemberDues,
                    stock: formInfo.unlimited ? "Ilimitadas" : formInfo.courseNumber,
                    expiration: formInfo.endingDate ? formInfo.endingDate : "No hay fecha de fin",
                    visible: formInfo.visible ? "Si" : "No",
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

        setFormInfo({
            ...formInfo,
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

        setFormInfo({
            ...formInfo,
            duesNumber: numberOfDues,
            duesInfo: duesInfo
        });
    };

    const handlePreview = () => {
        setFormInfo({ ...formInfo, preview: !formInfo.preview });
    }

    const handleChecked = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.checked });
    }

    const handleChangeInput = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    }

    const handleBetweenWaitingList = () => {
        setFormInfo({ ...formInfo, waitingList: !formInfo.waitingList });
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

    const handleBetweenPayment = () => {
        setFormInfo({ ...formInfo, payment: !formInfo.payment });
    }

    const handleStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();

        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            setFormInfo({ ...formInfo, startDate: date1 });
        }
    }

    const handleEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = formInfo.startDate;

        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setFormInfo({ ...formInfo, endingDate: date2 });
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

    const handleUploadImage = () => {
        const file = inputRef.current.files[0];
        const url = URL.createObjectURL(file);
        setFormInfo({ ...formInfo, image: url });
    }

    return (
        <>
            {!formInfo.preview ? (
                <form>
                    <div className="form-course">
                        <div className="flex-center">
                            <h1 className="form-title">CURSO</h1>
                        </div>
                        <div className="flex-end">
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item xs={6}>
                                    <div className="flex-end">
                                        <Button className="form-button" onClick={handleCreateTableForm}>
                                            <span>Guardar</span>
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="flex-start">
                                        <Button className="form-button" onClick={handlePreview}>
                                            <span>Previsualizar</span>
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="flex-center">
                                        <Button className="form-button-checkbox" onClick={handleChecked}>
                                            <Checkbox
                                                checked={formInfo.visible}
                                                size="small"
                                                name="visible"
                                            />
                                            <span>Producto visible</span>
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
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
                                        {formInfo.smallDescEs.length > 50 && (
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
                                        {formInfo.largeDescEs.length > 500 && (
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
                                        {formInfo.smallDescVal.length > 50 && (
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
                                                value={formInfo.smallDescVal}
                                                name="smallDescVal"
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={3} lg={2}>
                                    <div className="form-desc-title">
                                        <h4>Descripció llarga</h4>
                                        {formInfo.largeDescVal.length > 500 && (
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
                                                value={formInfo.largeDescVal}
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
                                            <Button className="form-data-checkbox" onClick={handleChecked}>
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
                            <div className="course-data">
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
                                            <Button className="form-data-checkbox" onClick={handleChecked}>
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
                                            <Button className="form-data-checkbox" onClick={handleChecked}>
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
                            <div className="course-image">
                                <Grid container alignItems='center'>
                                    <Grid item xs={12} lg={4}>
                                        <div className="flex-start">
                                            <h4 className="form-data-title-info">Imagen</h4>
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
                    </div>
                </form>
            ) : (
                <>
                    {formInfo.visible ? (
                        <PreviewCourse
                            formInfo={formInfo}
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