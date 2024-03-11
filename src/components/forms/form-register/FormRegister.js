import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

import "./formRegister.css";

const FormRegister = () => {
    const [formValues, setFormValues] = useState({
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        NIF_NIE: "",
        telefono: "",
        domicilio: "",
        localidad: "",
        codigo_postal: "",
        provincia: "",
    });

    const handleErrors = (e) => {
        e.preventDefault();
        const errors = {};
        if (formValues.nombre === "") {
            errors.nombre = "El nombre es obligatorio";
            console.log(errors.nombre);
        } else if (formValues.apellido === "") {
            errors.apellido = "El apellido es obligatorio";
            console.log(errors.apellido);
        } else if (formValues.fecha_nacimiento === "") {
            errors.fecha_nacimiento = "La fecha de nacimiento es obligatoria";
            console.log(errors.fecha_nacimiento);
        } else if (formValues.NIF_NIE === "") {
            errors.NIF_NIE = "El NIF/NIE es obligatorio";
            console.log(errors.NIF_NIE);
        } else if (formValues.telefono === "") {
            errors.telefono = "El teléfono es obligatorio";
            console.log(errors.telefono);
        } else if (formValues.domicilio === "") {
            errors.domicilio = "El domicilio es obligatorio";
            console.log(errors.domicilio);
        } else if (formValues.localidad === "") {
            errors.localidad = "La localidad es obligatoria";
            console.log(errors.localidad);
        } else if (formValues.codigo_postal === "") {
            errors.codigo_postal = "El código postal es obligatorio";
            console.log(errors.codigo_postal);
        } else if (formValues.provincia === "") {
            errors.provincia = "La provincia es obligatoria";
            console.log(errors.provincia);
        } else {
            console.log(formValues);
        }
        return errors;
    }

    const handleChangeInput = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div className="form-register">
            <div className="flex-start">
                <h1 className="form-title">Datos del Usuario</h1>
            </div>
            <div className="form-nombre">
                <TextField
                    id='nombre'
                    name='nombre'
                    type='text'
                    variant='standard'
                    placeholder='Nombre'
                    fullWidth
                    required
                    value={formValues.nombre}
                    onChange={handleChangeInput}
                    style={{ marginRight: '0.5em' }}
                />
            </div>
            <div className="form-apellido">
                <TextField
                    id='apellido'
                    name='apellido'
                    type='text'
                    variant='standard'
                    placeholder='Apellido'
                    fullWidth
                    required
                    value={formValues.apellido}
                    onChange={handleChangeInput}
                    style={{ marginRight: '0.5em' }}
                />
            </div>
            <div className="form-fecha-nacimiento">
                <TextField
                    id='fecha_nacimiento'
                    name='fecha_nacimiento'
                    type='number'
                    variant='standard'
                    placeholder='Fecha de nacimiento'
                    fullWidth
                    required
                    value={formValues.fecha_nacimiento}
                    onChange={handleChangeInput}
                    style={{ marginRight: '0.5em' }}
                />
            </div>
            <div className="form-NIF-NIE">
                <TextField
                    id='NIF_NIE'
                    name='NIF_NIE'
                    type='number'
                    variant='standard'
                    placeholder='NIF/NIE(numérico)'
                    fullWidth
                    required
                    value={formValues.NIF_NIE}
                    onChange={handleChangeInput}
                    style={{ marginRight: '0.5em' }}
                />
            </div>
            <div className="form-telefono">
                <TextField
                    id='telefono'
                    name='telefono'
                    type='number'
                    variant='standard'
                    placeholder='Teléfono(numérico)'
                    fullWidth
                    required
                    value={formValues.telefono}
                    onChange={handleChangeInput}
                    style={{ marginRight: '0.5em' }}
                />
            </div>
            <div className="form-domicilio">
                <TextField
                    id='domicilio'
                    name='domicilio'
                    type='text'
                    variant='standard'
                    placeholder='Domicilio'
                    fullWidth
                    required
                    value={formValues.domicilio}
                    onChange={handleChangeInput}
                    style={{ marginRight: '0.5em' }}
                />
            </div>
            <div className="form-localidad">
                <TextField
                    id='localidad'
                    name='localidad'
                    type='text'
                    variant='standard'
                    placeholder='Localidad'
                    fullWidth
                    required
                    value={formValues.localidad}
                    onChange={handleChangeInput}
                    style={{ marginRight: '0.5em' }}
                />
            </div>
            <div className="form-codigo-postal">
                <TextField
                    id='codigo_postal'
                    name='codigo_postal'
                    type='number'
                    variant='standard'
                    placeholder='Código postal(numérico)'
                    fullWidth
                    required
                    value={formValues.codigo_postal}
                    onChange={handleChangeInput}
                    style={{ marginRight: '0.5em' }}
                />
            </div>
            <div className="form-provincia">
                <TextField
                    id='provincia'
                    name='provincia'
                    type='text'
                    variant='standard'
                    placeholder='Provincia'
                    fullWidth
                    required
                    value={formValues.provincia}
                    onChange={handleChangeInput}
                    style={{ marginRight: '0.5em' }}
                />
            </div>
            <div className="flex-end">
                <Button
                    className='form-button'
                    onClick={handleErrors}
                >
                    Enviar
                </Button>
            </div>
        </div>
    );
};

export default FormRegister;


/*
form values ''                  done
crear handles para cada uno     done
textfield                       done
errors                          done

*/