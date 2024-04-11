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
    const [courseData, setCourseData] = useState({
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
        duesInfo: []
    });

    const handleSaveCourse = (e) => {
        if (!courseData.smallDescEs || !courseData.largeDescEs || !courseData.smallDescVal || !courseData.largeDescVal) {
            toast.error("Debes rellenar todos los campos de descripción");
        } else if (!courseData.startDate || !courseData.endingDate || !courseData.preStartingDate || !courseData.preEndingDate) {
            toast.error("Debes rellenar todas las fechas");
        } else if (courseData.startDate > courseData.endingDate) {
            toast.error("La fecha de inicio no puede ser mayor a la fecha de fin");
        } else if (courseData.preStartingDate > courseData.preEndingDate) {
            toast.error("La fecha de inicio de preinscripción no puede ser mayor a la fecha de fin de preinscripción");
        } else if (courseData.preStartingDate > courseData.startDate) {
            toast.error("La fecha de inicio no puede ser menor a la fecha de inicio de preinscripción");
        } else if (!courseData.image) {
            toast.error("Debes subir una imagen");
        } else if (!courseData.winterProgram && !courseData.summerProgram) {
            toast.error("Debes seleccionar al menos una temporada");
        } else if (!courseData.childrenProgram && !courseData.adultsProgram) {
            toast.error("Debes seleccionar al menos un rango de edad");
        } else {
            toast.success("Curso guardado correctamente");
        }
    }

    useEffect(() => {
        handleSetDuesInfo();
    }, []);

    const handleSetDuesInfo = () => {
        const firstDayOfNextMonth = DateTime.now().plus({ months: 1 }).startOf('month').toFormat('dd-MM-yyyy');

        setCourseData({
            ...courseData,
            startDate: firstDayOfNextMonth,
            duesInfo: [firstDayOfNextMonth]
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

        setCourseData({
            ...courseData,
            duesNumber: numberOfDues,
            duesInfo: duesInfo
        });
    };

    const handlePreview = () => {
        setCourseData({ ...courseData, preview: !courseData.preview });
    }

    const handleChecked = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.checked });
    }

    const handleChangeInput = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    }

    const handleBetweenWaitingList = () => {
        setCourseData({ ...courseData, waitingList: !courseData.waitingList });
    }

    const handleWinterProgram = () => {
        const updatedWinterProgram = !courseData.winterProgram;
        let updatedDuration = courseData.duration;

        if (updatedWinterProgram && courseData.summerProgram) {
            updatedDuration = "allYear";
        } else if (updatedWinterProgram && !courseData.summerProgram) {
            updatedDuration = "winter";
        } else if (!updatedWinterProgram && courseData.summerProgram) {
            updatedDuration = "summer";
        }

        setCourseData({
            ...courseData,
            winterProgram: updatedWinterProgram,
            duration: updatedDuration
        });
    };

    const handleSummerProgram = () => {
        const updatedSummerProgram = !courseData.summerProgram;
        let updatedDuration = courseData.duration;

        if (courseData.winterProgram && updatedSummerProgram) {
            updatedDuration = "allYear";
        } else if (courseData.winterProgram && !updatedSummerProgram) {
            updatedDuration = "winter";
        } else if (!courseData.winterProgram && updatedSummerProgram) {
            updatedDuration = "summer";
        }

        setCourseData({
            ...courseData,
            summerProgram: updatedSummerProgram,
            duration: updatedDuration
        });
    };

    const handleAdultsProgram = () => {
        const updatedAdultsProgram = !courseData.adultsProgram;
        let updatedAgeDescription = courseData.ageDescription;

        if (courseData.childrenProgram && updatedAdultsProgram) {
            updatedAgeDescription = "allAges";
        } else if (courseData.childrenProgram && !updatedAdultsProgram) {
            updatedAgeDescription = "children";
        } else if (!courseData.childrenProgram && updatedAdultsProgram) {
            updatedAgeDescription = "adults";
        }

        setCourseData({
            ...courseData,
            adultsProgram: updatedAdultsProgram,
            ageDescription: updatedAgeDescription
        });
    };

    const handleChildrenProgram = () => {
        const updatedChildrenProgram = !courseData.childrenProgram;
        let updatedAgeDescription = courseData.ageDescription;

        if (updatedChildrenProgram && courseData.adultsProgram) {
            updatedAgeDescription = "allAges";
        } else if (updatedChildrenProgram && !courseData.adultsProgram) {
            updatedAgeDescription = "children";
        } else if (!updatedChildrenProgram && courseData.adultsProgram) {
            updatedAgeDescription = "adults";
        }

        setCourseData({
            ...courseData,
            childrenProgram: updatedChildrenProgram,
            ageDescription: updatedAgeDescription
        });
    };

    const handlePoolProgram = () => {
        const updatedPoolProgram = !courseData.poolProgram;
        let updatedPoolProgramOption = courseData.poolProgramOption;

        if (updatedPoolProgram) {
            updatedPoolProgramOption = "pool";
        }

        setCourseData({
            ...courseData,
            poolProgram: updatedPoolProgram,
            poolProgramOption: updatedPoolProgramOption
        });
    };

    const handleBetweenPayment = () => {
        setCourseData({ ...courseData, payment: !courseData.payment });
    }

    const handleStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();

        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            setCourseData({ ...courseData, startDate: date1 });
        }
    }

    const handleEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = courseData.startDate;

        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setCourseData({ ...courseData, endingDate: date2 });
        }
    }

    const handlePreStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();

        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            setCourseData({ ...courseData, preStartingDate: date1 });
        }
    }

    const handlePreEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = courseData.preStartingDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setCourseData({ ...courseData, preEndingDate: date2 });
        }
    }

    const handleUploadImage = () => {
        const file = inputRef.current.files[0];
        const url = URL.createObjectURL(file);
        setCourseData({ ...courseData, image: url });
    }

    return (
        <>
            {!courseData.preview ? (
                <form>
                    <div className="form-course">
                        <div className="flex-center">
                            <h1 className="form-title">CURSO</h1>
                        </div>
                        <div className="flex-end">
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item xs={6}>
                                    <div className="flex-end">
                                        <Button className="form-button" onClick={handleSaveCourse}>
                                            <span>Guardar</span>
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="flex-start">
                                        <Button className="form-button" onClick={handlePreview}>
                                            Previsualizar
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="flex-center">
                                        <Button className="form-button-checkbox" onClick={handleChecked}>
                                            <Checkbox
                                                checked={courseData.visible}
                                                size="small"
                                                name="visible"
                                            />
                                            Producto visible
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
                                        {courseData.smallDescEs.length > 50 && (
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
                                                value={courseData.smallDescEs}
                                                required
                                                name="smallDescEs"
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={3} lg={2}>
                                    <div className="form-desc-title">
                                        <h4>Descripción larga</h4>
                                        {courseData.largeDescEs.length > 500 && (
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
                                                value={courseData.largeDescEs}
                                                required
                                                name="largeDescEs"
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="form-val">
                            {/* ALIGN ITEMS */}
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
                                        {courseData.smallDescVal.length > 50 && (
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
                                                value={courseData.smallDescVal}
                                                name="smallDescVal"
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={3} lg={2}>
                                    <div className="form-desc-title">
                                        <h4>Descripció llarga</h4>
                                        {courseData.largeDescVal.length > 500 && (
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
                                                value={courseData.largeDescVal}
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
                                        {!courseData.courseNumber && (
                                            <h6 className="form-alert">(Si está vacío será ilimitado)</h6>
                                        )}
                                    </Grid>
                                    <Grid item xs={6} lg={4}>
                                        <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                            {courseData.unlimited ? (
                                                <div className="form-info">Ilimitadas</div>
                                            ) : (
                                                <div className="form-info">
                                                    <InputBase
                                                        onChange={handleChangeInput}
                                                        className="form-input"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={courseData.courseNumber}
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
                                                    checked={courseData.unlimited}
                                                    size="small"
                                                    name="unlimited"
                                                    className="form-checkbox"
                                                />
                                                Ilimitadas
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
                                                value={courseData.preStartingDate}
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
                                                value={courseData.preEndingDate}
                                                className="form-button-date"
                                                required
                                                name="preEndingDate"
                                                max={courseData.startDate}
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
                                                    checked={courseData.waitingList}
                                                    shape='round'
                                                    size="small"
                                                    name="waitingList"
                                                    className="form-checkbox"
                                                />
                                                Si
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} lg={4}>
                                        <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleBetweenWaitingList}>
                                                <Checkbox
                                                    icon={<RadioButtonUncheckedIcon />}
                                                    checkedIcon={<RadioButtonCheckedIcon />}
                                                    checked={!courseData.waitingList}
                                                    size="small"
                                                    name="waitingList"
                                                    className="form-checkbox"
                                                />
                                                No
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
                                                value={courseData.startDate}
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
                                                value={courseData.endingDate}
                                                className="form-button-date"
                                                required
                                                name="endingDate"
                                                min={courseData.startDate}
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
                                            {courseData.memberFree ? (
                                                <div className="form-info">Gratuito</div>
                                            ) : (
                                                <div className="form-info">
                                                    <InputBase
                                                        onChange={handleChangeInput}
                                                        className="form-input"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={courseData.memberDues}
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
                                                    checked={courseData.memberFree}
                                                    size="small"
                                                    name="memberFree"
                                                    className="form-checkbox"
                                                />
                                                Gratuito
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <h4 className="form-data-title-info">Importe cuota NO SOCIOS</h4>
                                    </Grid>
                                    <Grid item xs={6} lg={4}>
                                        <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                            {courseData.nonMemberFree ? (
                                                <div className="form-info">Gratuito</div>
                                            ) : (
                                                <div className="form-info">
                                                    <InputBase
                                                        onChange={handleChangeInput}
                                                        className="form-input"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={courseData.nonMemberDues}
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
                                                    checked={courseData.nonMemberFree}
                                                    size="small"
                                                    name="nonMemberFree"
                                                    className="form-checkbox"
                                                />
                                                Gratuito
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            {(!courseData.memberFree || !courseData.nonMemberFree) && (
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
                                                            checked={courseData.payment}
                                                            shape='round'
                                                            size="small"
                                                            name="payment"
                                                            className="form-checkbox"
                                                        />
                                                        Si
                                                    </Button>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} lg={4}>
                                                <div className={width > 1200 ? 'flex-start' : 'flex-center'}>
                                                    <Button className="form-data-checkbox" onClick={handleBetweenPayment}>
                                                        <Checkbox
                                                            icon={<RadioButtonUncheckedIcon />}
                                                            checkedIcon={<RadioButtonCheckedIcon />}
                                                            checked={!courseData.payment}
                                                            size="small"
                                                            name="payment"
                                                            className="form-checkbox"
                                                        />
                                                        No
                                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    {courseData.payment && (
                                        <div className="course-data">
                                            <Grid container alignItems='center'>
                                                <Grid item xs={12} lg={4}>
                                                    <h4 className="form-data-title-info">Nº de Cuotas</h4>
                                                </Grid>
                                                <Grid item xs={12}lg={8}>
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
                                                {!courseData.memberFree && (
                                                    <>
                                                        {width < 1200 && (
                                                            <Grid item xs={1}></Grid>
                                                        )}
                                                        <Grid item xs={11} sm={5} lg={4}>
                                                            <h4 className="form-data-title-info">Socios: {(courseData.memberDues / courseData.duesNumber).toFixed(2)} €</h4>
                                                        </Grid>
                                                    </>
                                                )}
                                                {!courseData.nonMemberFree && (
                                                    <>
                                                        {width < 1200 && (
                                                            <Grid item xs={1}></Grid>
                                                        )}
                                                        <Grid item xs={11} sm={5} lg={4}>
                                                            <h4 className="form-data-title-info">No socios: {(courseData.nonMemberDues / courseData.duesNumber).toFixed(2)} €</h4>
                                                        </Grid>
                                                    </>
                                                )}
                                                <Grid item xs={12}>
                                                    <h4 className="form-data-title-info">Fecha de pago:</h4>
                                                </Grid>
                                                {courseData.duesInfo.map((due, index) => (
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
                                            {!courseData.image ? (
                                                <>
                                                    <label htmlFor="input-image" onClick={() => { inputRef.current.click() }}>
                                                        <img src={MYIMAGE} alt="imagen" />
                                                    </label>
                                                    <input style={{ display: 'none' }} id="input-image" type="file" ref={inputRef} className="form-button-image" onChange={handleUploadImage} />
                                                </>
                                            ) : (
                                                <div className="form-image flex-center">
                                                    <img src={courseData.image} alt="imagen" />
                                                    <Button onClick={() => setCourseData({ ...courseData, image: null })} className="form-button-image">
                                                        ¿Borrar?
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
                                                checked={courseData.winterProgram}
                                                size="small"
                                                name="winterProgram"
                                                onClick={handleWinterProgram}
                                            />
                                            Invierno
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                checked={courseData.summerProgram}
                                                size="small"
                                                name="summerProgram"
                                                onClick={handleSummerProgram}
                                            />
                                            Verano
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
                                                checked={courseData.childrenProgram}
                                                size="small"
                                                name="childrenProgram"
                                                onClick={handleChildrenProgram}
                                            />
                                            Niñ@s
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                checked={courseData.adultsProgram}
                                                size="small"
                                                name="adultsProgram"
                                                onClick={handleAdultsProgram}
                                            />
                                            Jóvenes/Adultos
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
                                                checked={courseData.poolProgram}
                                                size="small"
                                                name="poolProgram"
                                                onClick={handlePoolProgram}
                                            />
                                            Piscina
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </form>
            ) : (
                <>
                    {courseData.visible ? (
                        <PreviewCourse
                            courseData={courseData}
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
                                            Cerrar
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