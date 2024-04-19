import React from "react";
import { Grid, InputBase, Button, Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { DateTime } from "luxon";

import "./formCreate.css";

const MYIMAGE = "imagen.png"

const FormTicket = ({ formCreate, handleChangeInput, handleCheckedInfo, handleBetweenExclusive, handleStartingDate, handleEndingDate, handleUploadImage, inputRef, setFormCreate, width }) => {
    return (
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
                            {formCreate.unlimited === true ? (
                                <div className="form-info">Ilimitadas</div>
                            ) : (
                                <div className="form-info">
                                    <InputBase
                                        onChange={handleChangeInput}
                                        className="form-input"
                                        variant="outlined"
                                        fullWidth
                                        value={formCreate.eventNumber}
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
            <div className="event-data">
                <Grid container>
                    <Grid item xs={12} sm={5} lg={3}>
                        <h4>Precio (IVA incluido)</h4>
                        {formCreate.ticketPrice === "" ? (
                            <h6 className="form-alert">(Si está vacío será gratuito)</h6>
                        ) : (
                            <h6 style={{ display: 'none' }}>()</h6>
                        )}
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <div className={width > 900 ? 'flex-start' : 'flex-center'}>
                            {formCreate.free === true ? (
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
                            <Button className="form-data-checkbox" onClick={handleCheckedInfo}>
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
    )
}

export default FormTicket;