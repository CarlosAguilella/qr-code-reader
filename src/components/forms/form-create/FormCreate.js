import React, { useState } from "react";
import { Grid, InputBase, Checkbox, Button, Select, MenuItem } from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

import FormCourse from "../form-course/FormCourse";
import FormTicket from "../form-ticket/FormTicket";
import FormEvent from "../form-event/FormEvent";

import "./formCreate.css";

const FormCreate = ({ onValueChange, arrayMagico, setArrayMagico }) => {
    const [formCreate, setFormCreate] = useState({
        id: uuidv4(),
        tipo: "",
        producto: "Deberías editar...",
        accesos: 0,
        socios: false,
        precio: 0,
        stock: 0,
        expiracion: DateTime.now().plus({ days: 1 }).toISODate(),
        visible: false
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

    const handleInput = (e) => {
        setFormCreate({
            ...formCreate,
            [e.target.name]: e.target.value
        });
    }

    const handleEndingDate = (e) => {
        setFormCreate({
            ...formCreate,
            expiracion: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onValueChange(false);
        formCreate.id = Math.random().toString(36).substr(2, 9);
        arrayMagico.push(formCreate);
    }

    const handleReturnAndSave = () => {
        const updatedArrayMagico = [...arrayMagico, formCreate];
        setArrayMagico(updatedArrayMagico);
        onValueChange(false);
    }

    return (
        <>
            <div className="form-create" onSubmit={handleSubmit}>
                <div className="flex-center">
                    <div className="form-title">
                        <h2>Tipo</h2>
                        <Select
                            label="Tipo"
                            name="tipo"
                            value={formCreate.tipo}
                            onChange={handleChange}
                        >
                            <MenuItem value="curso">Curso</MenuItem>
                            <MenuItem value="entrada">Entrada</MenuItem>
                            <MenuItem value="evento">Evento</MenuItem>
                        </Select>
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
                                    <Button className="form-data-checkbox" onClick={handleChange}>
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
                                    <Button className="form-data-checkbox" onClick={handleChange}>
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
                                        onChange={handleEndingDate}
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
            <div className="flex-center">
                {formCreate.tipo === "curso" ? (
                    <FormCourse />
                ) : formCreate.tipo === "entrada" ? (
                    <FormTicket />
                ) : formCreate.tipo === "evento" ? (
                    <FormEvent />
                ) : null}
            </div>
            <div className="flex-center">
                <Button onClick={handleReturnAndSave}>
                    <span>Crear</span>
                </Button>
            </div>
        </>
    );
}

export default FormCreate;
