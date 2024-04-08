import React, { useState, useRef } from "react";
import { DateTime } from "luxon";
import { Grid, InputBase, Checkbox, Button, MenuItem, Select } from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useWindowSize } from '../../hooks/useWindowSize';

import PreviewCourse from "./PreviewCourse";
import NoPreviewCourse from "./NoPreviewCourse";

import "./formCourse.css";

const MYIMAGE = "imagen.png";

const FormCourse = () => {
    // Global Utils
    const inputRef = useRef();
    const { width } = useWindowSize();

    const [courseData, setCourseData] = useState({
        preview: false,
        visible: false,
        smallDescEs: "",
        largeDescEs: "",
        smallDescVal: "",
        largeDescVal: "",
        unlimited: true,
        courseNumber: 45,
        waitingList: true,
        startDate: "",
        endingDate: "",
        image: null,
        payment: false,
        winterProgram: false,
        summerProgram: false,
        adultsProgram: false,
        poolProgram: false,
        preStartingDate: "",
        preEndingDate: "",
        payment: false,
        duesNumber: 1,
        memberDues: 0,
        memberFree: false,
        nonMemberDues: 0,
        nonMemberFree: false,
        duesData1: "",
        duesData2: "",
        duesData3: "",
        duesData4: "",
    });

    const handlePreview = () => {
        setCourseData({ ...courseData, preview: !courseData.preview });
    }

    const handleChecked = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.checked });
    }

    const handleChangeInput = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    }

    const handleChangeSelect = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    }

    const handleBetweenWaitingList = (e) => {
        setCourseData({ ...courseData, waitingList: !courseData.waitingList });
    }
    const handleBetweenAdults = (e) => {
        setCourseData({ ...courseData, adultsProgram: !courseData.adultsProgram });
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
            setCourseData(prevState => ({ ...prevState, startDate: date1 }));
        }
    }

    const handleEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = courseData.startDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setCourseData(prevState => ({ ...prevState, endingDate: date2 }));
        }
    }

    const handlePreStartingDate = (e) => {
        const date1 = e.target.value;
        const today = DateTime.now().toISODate();
        if (date1 < today) {
            alert("La fecha de inicio no puede ser menor a la fecha actual");
        } else {
            setCourseData(prevState => ({ ...prevState, preStartingDate: date1 }));
        }
    }

    const handlePreEndingDate = (e) => {
        const date2 = e.target.value;
        const date1 = courseData.preStartingDate;
        if (date2 < date1) {
            alert("La fecha de fin no puede ser menor a la fecha de inicio");
        } else {
            setCourseData(prevState => ({ ...prevState, preEndingDate: date2 }));
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
                setCourseData(prevState => ({ ...prevState, image: reader.result }));
            };
        };
        input.click();
    }

    const { duesData1, duesData2, duesData3, duesData4, nonMemberDues, nonMemberFree, memberDues, memberFree, duesNumber, payment, preStartingDate, preEndingDate, preview, visible, smallDescEs, largeDescEs, smallDescVal, largeDescVal, unlimited, courseNumber, waitingList, startDate, endingDate, image, winterProgram, summerProgram, adultsProgram, poolProgram } = courseData;

    console.log(courseData);

    return (
        <>
            {courseData.preview === true ? (
                <>
                    {visible === true ? (
                        <PreviewCourse
                            preview={preview} setPreview={handlePreview}
                            smallDescEs={smallDescEs} largeDescEs={largeDescEs}
                            smallDescVal={smallDescVal} largeDescVal={largeDescVal}
                            unlimited={unlimited} courseNumber={courseNumber}
                            waitingList={waitingList} startDate={startDate}
                            endingDate={endingDate} image={image}
                            handleUploadImage={handleUploadImage}
                            winterProgram={winterProgram} summerProgram={summerProgram}
                            adultsProgram={adultsProgram} poolProgram={poolProgram}
                            preStartingDate={preStartingDate} preEndingDate={preEndingDate}
                            payment={payment} duesNumber={duesNumber}
                            memberDues={memberDues} nonMemberDues={nonMemberDues}
                            memberFree={memberFree} nonMemberFree={nonMemberFree}
                            duesData1={duesData1} duesData2={duesData2}
                            duesData3={duesData3} duesData4={duesData4}
                        />
                    ) : (
                        <NoPreviewCourse
                            preview={preview} setPreview={handlePreview}
                        />
                    )}
                </>
            ) : (
                <form>
                    <div className="form-course">
                        <div className="flex-center">
                            <h1 className="form-title">CURSO</h1>
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
                                                checked={courseData.visible}
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
                                                value={courseData.smallDescVal}
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
                                <Grid container>
                                    <Grid item xs={12}>
                                        <div className="form-data-title">
                                            <h2>ENTRADA</h2>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={5} lg={3}>
                                        <h4>Plazas disponibles</h4>
                                        {courseNumber === "" ? (
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
                                                        value={courseData.courseNumber}
                                                        style={{ paddingTop: '0.4em' }}
                                                        name="courseNumber"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={5} lg={7}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleChecked}>
                                                <Checkbox
                                                    checked={courseData.unlimited}
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
                            <div className="course-data">
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
                            <div className="course-data">
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
                            <div className="course-data">
                                <Grid container>
                                    <Grid item xs={12} sm={5} lg={3}>
                                        <h4>Permitir lista de espera</h4>
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleBetweenWaitingList}>
                                                <Checkbox
                                                    icon={<RadioButtonUncheckedIcon />}
                                                    checkedIcon={<RadioButtonCheckedIcon />}
                                                    checked={courseData.waitingList === true ? true : false}
                                                    shape='round'
                                                    size="small"
                                                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
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
                                                    checked={courseData.waitingList === false ? true : false}
                                                    size="small"
                                                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                    name="waitingList"
                                                />
                                                No
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                            <div className="course-data">
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



                            <div className="course-data">
                                <Grid container>
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
                                                value={startDate}
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
                                <Grid container>
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
                                                value={startDate}
                                                className="form-button-date"
                                                required
                                                name="preEndingDate"
                                                min={DateTime.now().toISODate()}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>


                            <div className="course-data">
                                <Grid container>
                                    <Grid item xs={12} sm={5} lg={3}>
                                        <h4>Permitir pago a plazos</h4>
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                            <Button className="form-data-checkbox" onClick={handleBetweenPayment}>
                                                <Checkbox
                                                    icon={<RadioButtonUncheckedIcon />}
                                                    checkedIcon={<RadioButtonCheckedIcon />}
                                                    checked={courseData.payment === true ? true : false}
                                                    shape='round'
                                                    size="small"
                                                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
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
                                                    checked={courseData.payment === false ? true : false}
                                                    size="small"
                                                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                    name="payment"
                                                />
                                                No
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            {payment === true ? (
                                <div className="course-data">
                                    <Grid container>
                                        <Grid item xs={12} sm={5} lg={3}>
                                            <h4>Nº de Cuotas</h4>
                                        </Grid>
                                        <Grid item xs={6} sm={7}>
                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                <div className="form-info">
                                                    <Select
                                                        onChange={handleChangeSelect}
                                                        className="form-input"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={courseData.duesNumber}
                                                        style={{ paddingTop: '0.4em' }}
                                                        name="duesNumber"
                                                    >
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                    </Select>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={5} lg={3}>
                                            <h4>Importe cuota SOCIOS</h4>
                                        </Grid>
                                        <Grid item xs={6} sm={5} lg={1}>
                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                {memberFree === true ? (
                                                    <div className="form-info">Gratuito</div>
                                                ) : (
                                                    <div className="form-info">
                                                        <InputBase
                                                            onChange={handleChangeInput}
                                                            className="form-input"
                                                            variant="outlined"
                                                            fullWidth
                                                            value={courseData.memberDues}
                                                            style={{ paddingTop: '0.4em' }}
                                                            name="memberDues"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={2} lg={8}>
                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                <Button className="form-data-checkbox" onClick={handleChecked}>
                                                    <Checkbox
                                                        checked={courseData.memberFree}
                                                        style={{ marginTop: '-0.1em' }}
                                                        size="small"
                                                        sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
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
                                                {nonMemberFree === true ? (
                                                    <div className="form-info">Gratuito</div>
                                                ) : (
                                                    <div className="form-info">
                                                        <InputBase
                                                            onChange={handleChangeInput}
                                                            className="form-input"
                                                            variant="outlined"
                                                            fullWidth
                                                            value={courseData.nonMemberDues}
                                                            style={{ paddingTop: '0.4em' }}
                                                            name="nonMemberDues"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={2} lg={8}>
                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                <Button className="form-data-checkbox" onClick={handleChecked}>
                                                    <Checkbox
                                                        checked={courseData.nonMemberFree}
                                                        style={{ marginTop: '-0.1em' }}
                                                        size="small"
                                                        sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                                        name="nonMemberFree"
                                                    />
                                                    Gratuito
                                                </Button>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {duesNumber === 1 ? (
                                                <>
                                                    <Grid container>
                                                        <Grid item xs={1}>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <h4>Fecha cuota 1</h4>
                                                        </Grid>
                                                        <Grid item xs={9}>
                                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                                <input
                                                                    onChange={handleStartingDate}
                                                                    type="date"
                                                                    value={courseData.duesData1}
                                                                    className="form-button-date"
                                                                    required
                                                                    name="startDate"
                                                                    min={DateTime.now().toISODate()}
                                                                />
                                                            </div>
                                                        </Grid>
                                                    </Grid>

                                                </>
                                            ) : duesNumber === 2 ? (
                                                <>
                                                    <Grid container>
                                                        <Grid item xs={1}>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <h4>Fecha cuota 1</h4>
                                                        </Grid>
                                                        <Grid item xs={9}>
                                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                                <input
                                                                    onChange={handleStartingDate}
                                                                    type="date"
                                                                    value={courseData.duesData1}
                                                                    className="form-button-date"
                                                                    required
                                                                    name="startDate"
                                                                    min={DateTime.now().toISODate()}
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <h4>Fecha cuota 2</h4>
                                                        </Grid>
                                                        <Grid item xs={9}>
                                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                                <input
                                                                    onChange={handleStartingDate}
                                                                    type="date"
                                                                    value={courseData.duesData2}
                                                                    className="form-button-date"
                                                                    required
                                                                    name="startDate"
                                                                    min={courseData.duesData1}
                                                                />
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            ) : duesNumber === 3 ? (
                                                <>
                                                    <Grid container>
                                                        <Grid item xs={1}>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <h4>Fecha cuota 1</h4>
                                                        </Grid>
                                                        <Grid item xs={9}>
                                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                                <input
                                                                    onChange={handleStartingDate}
                                                                    type="date"
                                                                    value={courseData.duesData1}
                                                                    className="form-button-date"
                                                                    required
                                                                    name="startDate"
                                                                    min={DateTime.now().toISODate()}
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <h4>Fecha cuota 2</h4>
                                                        </Grid>
                                                        <Grid item xs={9}>
                                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                                <input
                                                                    onChange={handleStartingDate}
                                                                    type="date"
                                                                    value={courseData.duesData2}
                                                                    className="form-button-date"
                                                                    required
                                                                    name="startDate"
                                                                    min={courseData.duesData1}
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <h4>Fecha cuota 3</h4>
                                                        </Grid>
                                                        <Grid item xs={9}>
                                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                                <input
                                                                    onChange={handleStartingDate}
                                                                    type="date"
                                                                    value={courseData.duesData3}
                                                                    className="form-button-date"
                                                                    required
                                                                    name="startDate"
                                                                    min={courseData.duesData2}
                                                                />
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            ) : (
                                                <>
                                                    <Grid container>
                                                        <Grid item xs={1}>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <h4>Fecha cuota 1</h4>
                                                        </Grid>
                                                        <Grid item xs={9}>
                                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                                <input
                                                                    onChange={handleStartingDate}
                                                                    type="date"
                                                                    value={courseData.duesData1}
                                                                    className="form-button-date"
                                                                    required
                                                                    name="startDate"
                                                                    min={DateTime.now().toISODate()}
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <h4>Fecha cuota 2</h4>
                                                        </Grid>
                                                        <Grid item xs={9}>
                                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                                <input
                                                                    onChange={handleStartingDate}
                                                                    type="date"
                                                                    value={courseData.duesData2}
                                                                    className="form-button-date"
                                                                    required
                                                                    name="startDate"
                                                                    min={courseData.duesData1}
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <h4>Fecha cuota 3</h4>
                                                        </Grid>
                                                        <Grid item xs={9}>
                                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                                <input
                                                                    onChange={handleStartingDate}
                                                                    type="date"
                                                                    value={courseData.duesData3}
                                                                    className="form-button-date"
                                                                    required
                                                                    name="startDate"
                                                                    min={courseData.duesData2}
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <h4>Fecha cuota 4</h4>
                                                        </Grid>
                                                        <Grid item xs={9}>
                                                            <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                                                                <input
                                                                    onChange={handleStartingDate}
                                                                    type="date"
                                                                    value={courseData.duesData4}
                                                                    className="form-button-date"
                                                                    required
                                                                    name="startDate"
                                                                    min={courseData.duesData3}
                                                                />
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            )
                                            }
                                        </Grid>
                                    </Grid>
                                </div>
                            ) : (
                                <></>
                            )}
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
                                                checked={courseData.winterProgram}
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
                                                checked={courseData.summerProgram}
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
                                                checked={!courseData.adultsProgram}
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
                                                checked={courseData.adultsProgram}
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
                                                checked={courseData.poolProgram}
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

export default FormCourse;