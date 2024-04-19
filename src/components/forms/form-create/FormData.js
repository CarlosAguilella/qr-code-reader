import React from "react";

import { Grid, InputBase, Button, Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import "./formCreate.css";

const formCreate = ({ formCreate, handleInput, handleBetweenSocios, handleAllPeople, handleChecked, handleEndingDateExpirate }) => {
    return (
        <div className="form-create">
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
                        <Grid item xs={3}>
                            <h4 className="form-data-title-info">Socios</h4>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="flex-start">
                                <Button className="form-data-checkbox" onClick={handleBetweenSocios}>
                                    <Checkbox
                                        icon={<RadioButtonUncheckedIcon />}
                                        checkedIcon={<RadioButtonCheckedIcon />}
                                        checked={formCreate.sociosValue}
                                        shape='round'
                                        size="small"
                                        name="socios"
                                        className="form-checkbox"
                                    />
                                    <span>Si</span>
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="flex-start">
                                <Button className="form-data-checkbox" onClick={handleBetweenSocios}>
                                    <Checkbox
                                        icon={<RadioButtonUncheckedIcon />}
                                        checkedIcon={<RadioButtonCheckedIcon />}
                                        checked={!formCreate.sociosValue}
                                        size="small"
                                        name="socios"
                                        className="form-checkbox"
                                    />
                                    <span>No</span>
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="flex-start">
                                <Button className="form-data-checkbox" onClick={handleAllPeople}>
                                    <Checkbox
                                        icon={<RadioButtonUncheckedIcon />}
                                        checkedIcon={<RadioButtonCheckedIcon />}
                                        checked={formCreate.sociosValue === null}
                                        shape='round'
                                        size="small"
                                        name="socios"
                                        className="form-checkbox"
                                    />
                                    <span>Todos</span>
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
    );
};

export default formCreate;