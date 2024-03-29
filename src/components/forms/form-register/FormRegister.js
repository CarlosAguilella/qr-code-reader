import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Toaster, toast } from 'react-hot-toast';

import "./formRegister.css";

const FormRegister = () => {

    // this is the state for the form values
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

    // this function will handle the errors/success with a toast
    const handleErrors = (e) => {
        e.preventDefault();
        const errors = {};
        if (formValues.nombre === "") {
            toast.error("El nombre es obligatorio");
        } else if (formValues.apellido === "") {
            toast.error("El apellido es obligatorio");
        } else if (formValues.fecha_nacimiento === "") {
            toast.error("La fecha de nacimiento es obligatoria");
        } else if (formValues.NIF_NIE === "") {
            toast.error("El NIF/NIE es obligatorio");
        } else if (formValues.telefono === "") {
            toast.error("El teléfono es obligatorio");
        } else if (formValues.domicilio === "") {
            toast.error("El domicilio es obligatorio");
        } else if (formValues.localidad === "") {
            toast.error("La localidad es obligatoria");
        } else if (formValues.codigo_postal === "") {
            toast.error("El código postal es obligatorio");
        } else if (formValues.provincia === "") {
            toast.error("La provincia es obligatoria");
        } else {
            toast.success("Formulario enviado");
            console.log(formValues);
        }
        return errors;
    }

    // this function will handle the input changes
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
                    className="form-input"
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
                    className="form-input"
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
                    className="form-input"
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
                    className="form-input"
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
                    className="form-input"
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
                    className="form-input"
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
                    className="form-input"
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
                    className="form-input"
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
                    className="form-input"
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
            <Toaster />
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