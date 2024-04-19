import React, { useState, useEffect, useRef } from 'react';
import { Grid, InputBase, Button, Checkbox, Select, MenuItem } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { DateTime } from 'luxon';

import './formCreate.css';

const MYIMAGE = "imagen.png";

const FormCourse = ({ formCreate, setFormCreate, width, handleChangeInput, handleUploadImage, handleBetweenPayment, handleBetweenWaitingList, handleCheckedInfo, handlePreEndingDate, handlePreStartingDate, handleEndingDate, handleStartingDate, handleChangeSelect, inputRef }) => {
    return (
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
                            <Button className="form-data-checkbox" onClick={handleCheckedInfo}>
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
            <div className="event-data">
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
                            <Button className="form-data-checkbox" onClick={handleCheckedInfo}>
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
                            <Button className="form-data-checkbox" onClick={handleCheckedInfo}>
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
            <div className="event-data">
                <Grid container>
                    <Grid item xs={12} md={6} lg={3}>
                        <div className="flex-start">
                            <h4>Imagen</h4>
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
    );
}

export default FormCourse;