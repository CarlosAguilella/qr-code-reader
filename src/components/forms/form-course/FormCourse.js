import React, { useState, useRef, useEffect } from "react";
import { Grid, InputBase, Checkbox, Button, MenuItem, Select } from "@mui/material";
import { DateTime } from "luxon";

// TODO desestructura botones 
// lo he intentado y no funciona
// import { RadioButtonUncheckedIcon, RadioButtonCheckedIcon } from '@mui/icons-material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import { useWindowSize } from '../../hooks/useWindowSize';

import PreviewCourse from "./PreviewCourse";
import NoPreviewCourse from "./NoPreviewCourse";

import "./formCourse.css";

const MYIMAGE = "imagen.png";

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
        // TODO Guardar sólo un valor string
        duration: "",
        winterProgram: false,
        summerProgram: false,
        // TODO Guardar sólo un valor string
        ageDescription: "",
        childrenProgram: false,
        adultsProgram: false,
        // TODO Guardar sólo un valor string
        poolProgramOption: "",
        poolProgram: false,
        preStartingDate: "",
        preEndingDate: "",
        payment: false,
        duesNumber: 1,
        memberDues: 100,
        memberFree: false,
        nonMemberDues: 400,
        nonMemberFree: false,
        duesInfo: []
    });

    useEffect(() => {
        const firstDayOfNextMonth = DateTime.now().plus({ months: 1 }).startOf('month').toFormat('dd-MM-yyyy');

        // Establecer la fecha de inicio como el primer día del próximo mes
        setCourseData(prevState => ({
            ...prevState,
            startDate: firstDayOfNextMonth,
            duesInfo: [firstDayOfNextMonth]
        }));
    }, []);

    // TODO no está funcionando, solo muestra la cuota 1 y despues para
    // const handleSetDuesInfo = () => {
    //     const firstDayOfNextMonth = DateTime.now().plus({ months: 1 }).startOf('month').toFormat('dd-MM-yyyy');

    //     // Establecer la fecha de inicio como el primer día del próximo mes
    //     // TODO Cambiar estado
    //     setCourseData({
    //         ...courseData,
    //         startDate: firstDayOfNextMonth,
    //         duesInfo: [firstDayOfNextMonth]
    //     });
    // }


    useEffect(() => {
        handleDuration();
    }, [courseData.winterProgram, courseData.summerProgram]);

    useEffect(() => {
        handleAgeDescription();
    }, [courseData.childrenProgram, courseData.adultsProgram]);

    useEffect(() => {
        handleCategorization();
    }, [courseData.poolProgram]);

    const handleDuration = () => {
        let duration = "";

        if (courseData.winterProgram && courseData.summerProgram) {
            duration = "allYear";
        } else if (courseData.winterProgram && !courseData.summerProgram) {
            duration = "winter";
        } else if (!courseData.winterProgram && courseData.summerProgram) {
            duration = "summer";
        } else {
            duration = "noSeason";
        }
        setCourseData(prevState => ({ ...prevState, duration }));
    }

    const handleAgeDescription = () => {
        let ageDescription = "";
        if (courseData.childrenProgram && courseData.adultsProgram) {
            ageDescription = "allAges";
        } else if (courseData.childrenProgram && !courseData.adultsProgram) {
            ageDescription = "children";
        } else if (!courseData.childrenProgram && courseData.adultsProgram) {
            ageDescription = "adults";
        } else {
            ageDescription = "noAge";
        }
        setCourseData(prevState => ({ ...prevState, ageDescription }));
    }

    const handleCategorization = () => {
        let poolProgramOption = "";
        if (courseData.poolProgram) {
            poolProgramOption = "pool";
        } else {
            poolProgramOption = "noPool";
        }
        setCourseData(prevState => ({ ...prevState, poolProgramOption }));
    }

    // Función para manejar el cambio en el número de cuotas
    const handleChangeSelect = (e) => {
        const numberOfDues = parseInt(e.target.value);
        const { startDate } = courseData;
        let duesInfo = [startDate];

        // Generar fechas de cuotas adicionales
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

    const handleBetweenWaitingList = (e) => {
        setCourseData({ ...courseData, waitingList: !courseData.waitingList });
    }

    // Cambiar
    const handleAdultsProgram = (e) => {
        setCourseData({ ...courseData, adultsProgram: !courseData.adultsProgram });
    }

    const handleChildrenProgram = (e) => {
        setCourseData({ ...courseData, childrenProgram: !courseData.childrenProgram });
    }

    const handleBetweenPayment = (e) => {
        setCourseData({ ...courseData, payment: !courseData.payment });
    }

    const handleStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();

        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            setCourseData(...courseData, { startDate: date1 });
        }
    }

    //TODO QUITAR PREVSTATEEEEEEEEEEEEEEEEEEEE !!!!

    const handleEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = courseData.startDate;

        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setCourseData(...courseData, { endingDate: date2 });
        }
    }

    const handlePreStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();

        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            //TODO PREVSTATEEEEEEEEEEEEEEEEEEEE !!!!
            setCourseData(...courseData, { preStartingDate: date1 });
        }
    }

    const handlePreEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = courseData.preStartingDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            //TODO PREVSTATEEEEEEEEEEEEEEEEEEEE !!!!
            setCourseData(...courseData, { preEndingDate: date2 });
        }
    }

    const handleUploadImage = () => {
        const file = inputRef.current.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            // Verificar si se ha cargado un archivo
            if (file) {
                // Verificar si el archivo es una imagen
                if (file.type.startsWith('image/')) {
                    setCourseData({ ...courseData, image: reader.result });
                } else {
                    alert("Por favor, seleccione una imagen válida.");
                }
            } else {
                alert("Por favor, seleccione un archivo.");
            }
        };

        // Leer el contenido del archivo seleccionado
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    // TODO NO DESESCTRUCTURAR
    // const { preStartingDate, preEndingDate, startDate, endingDate, image, memberDues, nonMemberDues, duesNumber, waitingList, childrenProgram, adultsProgram, poolProgram, memberFree, nonMemberFree, unlimited, courseNumber, smallDescEs, largeDescEs, smallDescVal, largeDescVal, winterProgram, summerProgram, visible, preview, duration, ageDescription, poolProgramOption, payment, duesInfo } = courseData;

    return (
        <>
            {!courseData.preview ? (
                <form>
                    <div className="form-course">
                        <div className="flex-center">
                            <h1 className="form-title">CURSO</h1>
                        </div>
                        {/* TODO  QUITAR ESTILOS EN LÍNEA */}
                        <div className="flex-end">
                            {/* TODO style={{ marginRight: '0,66rem' }}> */}
                            {/* TODO ALIGN ITEMS CENTER*/}
                            <Grid container spacing={2} alignItems='center'>
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
                                    {/* TODO EVITA USAR NBSP / PARRAFO / PADDING */}
                                    <p className="form-line">
                                    </p>
                                </Grid>
                                <Grid item xs={12} sm={3} lg={2}>
                                    <div className="form-desc-title">
                                        <h4>Descripción corta</h4>
                                        {/* TODO AÑADIR CONDICIONAL &&  */}
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
                                    {/* NBSP */}
                                    <p className="form-line">
                                    </p>
                                </Grid>
                                <Grid item xs={12} sm={3} lg={2}>
                                    <div className="form-desc-title">
                                        <h4>Descripció curta</h4>
                                        {/* CONDICIONAL */}
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
                                    <Grid item xs={12} sm={5} lg={3}>
                                        <h4>Plazas disponibles</h4>
                                        {/* TODO condicional */}
                                        {courseData.courseNumber === "" && (
                                            <h6 className="form-alert">(Si está vacío será ilimitado)</h6>
                                        )}
                                    </Grid>
                                    <Grid item xs={6} sm={2} >
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            {/* TODO QUITAR TRUE */}
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
                                    <Grid item xs={6} sm={5} lg={7}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleChecked}>
                                                {/* TODO ESTILO EN LINEA Y SX */}
                                                <Checkbox
                                                    checked={courseData.unlimited}
                                                    size="small"
                                                    name="unlimited"
                                                />
                                                Ilimitadas
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="course-data">
                                <Grid container alignItems='center'>
                                    <Grid item xs={12} md={5} lg={3}>
                                        <div className="flex-start">
                                            <h4>Inicio Preinscripción</h4>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={7} lg={9}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
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
                                    <Grid item xs={12} md={5} lg={3}>
                                        <div className="flex-start">
                                            <h4>Final Preinscripción</h4>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={7} lg={9}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
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
                                    <Grid item xs={12} sm={5} lg={3}>
                                        <h4>Permitir lista de espera</h4>
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleBetweenWaitingList}>
                                                <Checkbox
                                                    icon={<RadioButtonUncheckedIcon />}
                                                    checkedIcon={<RadioButtonCheckedIcon />}
                                                    checked={courseData.waitingList}
                                                    shape='round'
                                                    size="small"
                                                    name="waitingList"
                                                />
                                                Si
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={5} lg={7}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleBetweenWaitingList}>
                                                <Checkbox
                                                    icon={<RadioButtonUncheckedIcon />}
                                                    checkedIcon={<RadioButtonCheckedIcon />}
                                                    checked={!courseData.waitingList}
                                                    size="small"
                                                    name="waitingList"
                                                />
                                                No
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="course-data">
                                <Grid container alignItems={'center'}>
                                    <Grid item xs={12} md={5} lg={3}>
                                        <div className="flex-start">
                                            <h4>Fecha inicio</h4>
                                            {/* TODO EN CSS BUSCAS .COURSE-DATA H6 (PADDING/MARGIN) */}
                                            {/* no ha sido necesario, era muy pequeño el cambio, no se aprecia */}
                                            <h6 className="form-subtitle-data">(cuando podrá comenzar a usarse las entradas)</h6>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={7} lg={9}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
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
                                    <Grid item xs={12} md={5} lg={3}>
                                        <div className="flex-start">
                                            <h4>Fecha fin</h4>
                                            <h6 className="form-subtitle-data">(cuando expirará las entradas)</h6>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={7} lg={9}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
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
                                    <Grid item xs={12} sm={5} lg={3}>
                                        <h4>Importe cuota SOCIOS</h4>
                                    </Grid>
                                    <Grid item xs={6} sm={5} lg={1}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
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
                                    <Grid item xs={6} sm={2} lg={8}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleChecked}>
                                                <Checkbox
                                                    checked={courseData.memberFree}
                                                    size="small"
                                                    name="memberFree"
                                                />
                                                Gratuito
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={5} lg={3}>
                                        <h4>Importe cuota NO SOCIOS</h4>
                                    </Grid>
                                    <Grid item xs={6} sm={5} lg={1}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
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
                                    <Grid item xs={6} sm={2} lg={8}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleChecked}>
                                                <Checkbox
                                                    checked={courseData.nonMemberFree}
                                                    size="small"
                                                    name="nonMemberFree"
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
                                            <Grid item xs={12} sm={5} lg={3}>
                                                <h4>Permitir pago a plazos</h4>
                                            </Grid>
                                            <Grid item xs={6} sm={2}>
                                                <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                    <Button className="form-data-checkbox" onClick={handleBetweenPayment}>
                                                        <Checkbox
                                                            icon={<RadioButtonUncheckedIcon />}
                                                            checkedIcon={<RadioButtonCheckedIcon />}
                                                            checked={courseData.payment}
                                                            shape='round'
                                                            size="small"
                                                            name="payment"
                                                        />
                                                        Si
                                                    </Button>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} sm={5} lg={7}>
                                                <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                    <Button className="form-data-checkbox" onClick={handleBetweenPayment}>
                                                        <Checkbox
                                                            icon={<RadioButtonUncheckedIcon />}
                                                            checkedIcon={<RadioButtonCheckedIcon />}
                                                            checked={!courseData.payment}
                                                            size="small"
                                                            name="payment"
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
                                                <Grid item xs={12} sm={6} lg={3}>
                                                    <h4>Nº de Cuotas</h4>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <div className="flex-start">
                                                        <div className="form-info">
                                                            <Select
                                                                onChange={handleChangeSelect}
                                                                className="form-input"
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
                                                {/* TODO poner divs */}
                                                {/* <div>
                                                    <div className="flex-start">
                                                        <h4>Precio por cuota:</h4>
                                                    </div>
                                                    {!courseData.memberFree && (
                                                        <div className="flex-start">
                                                            <h4>Socios: {(courseData.memberDues / courseData.duesNumber).toFixed(2)} €</h4>
                                                        </div>
                                                    )}
                                                    {!courseData.nonMemberFree && (
                                                        <div className="flex-start">
                                                            <h4>No socios: {(courseData.nonMemberDues / courseData.duesNumber).toFixed(2)} €</h4>
                                                        </div>
                                                    )}
                                                    <div className="flex-start">
                                                        <h4>Fecha de pago:</h4>
                                                    </div>
                                                    {courseData.duesInfo.map((due) => (
                                                        <div key={due.id} className="flex-start">
                                                            <h4>{`Cuota ${due.id}, Día ${due.date}`}</h4>
                                                        </div>
                                                    ))}
                                                </div> */}
                                                <Grid item xs={12}>
                                                    <h4>Precio por cuota:</h4>
                                                </Grid>
                                                {courseData.memberFree === false && (
                                                    <>
                                                        <Grid item xs={1}>
                                                        </Grid>
                                                        <Grid item xs={11}>
                                                            <h4>Socios: {(courseData.memberDues / courseData.duesNumber).toFixed(2)} €</h4>
                                                        </Grid>
                                                    </>
                                                )}
                                                {courseData.nonMemberFree === false && (
                                                    <>
                                                        <Grid item xs={1}>
                                                        </Grid>
                                                        <Grid item xs={11}>
                                                            <h4>No socios: {(courseData.nonMemberDues / courseData.duesNumber).toFixed(2)} €</h4>
                                                        </Grid>
                                                    </>
                                                )}
                                                <Grid item xs={12}>
                                                    <h4>Fecha de pago:</h4>
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
                                    <Grid item xs={3}>
                                        <div className="flex-start">
                                            <h4>Imagen</h4>
                                        </div>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            {courseData.image === null ? (
                                                <>
                                                    <input type="file" ref={inputRef} className="form-button-image" onChange={handleUploadImage} />
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
                                    <h4>Duración:</h4>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                checked={courseData.winterProgram}
                                                size="small"
                                                name="winterProgram"
                                                onClick={handleChecked}
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
                                                onClick={handleChecked}
                                            />
                                            Verano
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <h4>Edad:</h4>
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
                                    <h4>Otros:</h4>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <div className="form-cat-checkbox">
                                        <Button className="form-data-checkbox">
                                            <Checkbox
                                                checked={courseData.poolProgram}
                                                size="small"
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
            ) : (
                <>
                    {/* TODO AL FINAL DEL COMPONENTE*/}
                    {courseData.visible ? (
                        <PreviewCourse
                            // TODO NO DESESTRUCTURAR
                            courseData={courseData}
                            setPreview={handlePreview}
                        />
                    ) : (
                        <NoPreviewCourse
                            preview={courseData.preview} setPreview={handlePreview}
                        />
                    )}
                </>
            )}
        </>
    );
}

export default FormCourse;