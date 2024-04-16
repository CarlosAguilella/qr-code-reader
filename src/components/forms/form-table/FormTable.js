import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from "luxon";

import PreviewTicket from "../form-ticket/PreviewTicket";
import PreviewEvent from "../form-event/PreviewEvent";
import PreviewCourse from "../form-course/PreviewCourse";

import './formTable.css';

const FormTable = ({ arrayMagico }) => {
    const [arrayMagicoState, setArrayMagico] = useState(arrayMagico);
    const [eliminadas, setEliminadas] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingRow, setEditingRow] = useState(null);
    const [tipo, setTipo] = useState("");
    const [producto, setProducto] = useState("");
    const [accesos, setAccesos] = useState(5);
    const [socios, setSocios] = useState(true);
    const [precio, setPrecio] = useState(5);
    const [stock, setStock] = useState(45);
    const [expiracion, setExpiracion] = useState(DateTime.now().plus({ days: 30 }).toISODate());
    const [visible, setVisible] = useState(true);
    const [previewComponent, setPreviewComponent] = useState(null);

    const handleArrayMagico = (arrayMagico) => {
        setArrayMagico(arrayMagico);
    }

    const handlePreview = (tipo) => {
        let previewComponent = null;

        if (tipo === "curso") {
            previewComponent = <PreviewCourse />;
            console.log("Curso");
        } else if (tipo === "evento") {
            previewComponent = <PreviewEvent />;
            console.log("Evento");
        } else if (tipo === "ticket") {
            previewComponent = <PreviewTicket />;
            console.log("Ticket");
        } else {
            console.log("Tipo no reconocido");
        }

        setPreviewComponent(previewComponent);
    }

    const handleEliminar = (id) => {
        const nuevasFilas = arrayMagicoState.filter(row => row.id !== id);
        setArrayMagico(nuevasFilas);
        const eliminada = arrayMagicoState.find(row => row.id === id);
        setEliminadas([...eliminadas, eliminada]);
    }

    const handleEditar = (id) => {
        const filaEditada = arrayMagicoState.find(row => row.id === id);
        setEditingRow(filaEditada);
        setTipo(filaEditada.TIPO);
        setProducto(filaEditada.PRODUCTO);
        setAccesos(filaEditada.ACCESOS);
        setSocios(filaEditada.SOCIOS);
        setPrecio(filaEditada.PRECIO);
        setStock(filaEditada.STOCK);
        setExpiracion(filaEditada.EXPIRACION);
        setVisible(filaEditada.VISIBLE);
        setEditModalOpen(true);
    }

    const handleSaveChanges = () => {
        const nuevasFilas = arrayMagicoState.map(row => {
            if (row.id === editingRow.id) {
                return editingRow;
            }
            return row;
        });
        setEditModalOpen(false);
    }

    const handleDuplicar = (id) => {
        const filaDuplicada = arrayMagicoState.find(row => row.id === id);
        const nuevoId = uuidv4();
        const filaDuplicadaConNuevoId = { ...filaDuplicada, id: nuevoId };
        setArrayMagico([...arrayMagicoState, filaDuplicadaConNuevoId]);
    }

    const handleMostrarDeNuevo = (id) => {
        const mostrada = eliminadas.find(row => row.id === id);
        const nuevasEliminadas = eliminadas.filter(row => row.id !== id);
        setEliminadas(nuevasEliminadas);
        setArrayMagico([...arrayMagicoState, mostrada]);
    }

    const columns = [
        { field: 'id', headerName: 'id', width: 200 },
        { field: 'tipo', headerName: 'Tipo', width: 80 },
        { field: 'producto', headerName: 'Producto', width: 160 },
        { field: 'accesos', headerName: 'Accesos', width: 80 },
        { field: 'socios', headerName: 'Socios', width: 80 },
        { field: 'precio', headerName: 'Precio', width: 80 },
        { field: 'stock', headerName: 'Stock', width: 80 },
        { field: 'expiracion', headerName: 'Expiración', width: 150 },
        { field: 'visible', headerName: 'Visible', width: 80 },
        {
            field: 'acciones', headerName: 'Acciones', width: 110, renderCell: (params) => (
                <div>
                    <VisibilityIcon onClick={() => handlePreview(params.row.tipo)} />
                    <BorderColorIcon onClick={() => handleEditar(params.row.id)} />
                    <ContentCopyIcon onClick={() => handleDuplicar(params.row.id)} />
                    <HighlightOffIcon onClick={() => handleEliminar(params.row.id)} />
                </div>
            )
        },
    ];

    const columnsEliminadas = [
        { field: 'id', headerName: 'id', width: 200 },
        { field: 'tipo', headerName: 'Tipo', width: 80 },
        { field: 'producto', headerName: 'Producto', width: 160 },
        { field: 'acceso', headerName: 'Accesos', width: 80 },
        { field: 'socios', headerName: 'Socios', width: 80 },
        { field: 'precio', headerName: 'Precio', width: 80 },
        { field: 'stock', headerName: 'Stock', width: 80 },
        { field: 'expiracion', headerName: 'Expiración', width: 150 },
        { field: 'visible', headerName: 'Visible', width: 80 },
        {
            field: 'acciones', headerName: 'Acciones', width: 110, renderCell: (params) => (
                <div>
                    <VisibilityIcon onClick={() => handlePreview(params.row.tipo)} />
                    <BorderColorIcon onClick={() => handleEditar(params.row.id)} />
                    <ContentCopyIcon onClick={() => handleDuplicar(params.row.id)} />
                    <HighlightOffIcon onClick={() => handleMostrarDeNuevo(params.row.id)} />
                </div>
            )
        },
    ];

    return (
        <div className="form-table" onChange={handleArrayMagico}>
            {previewComponent}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <div className="form-table-title">
                        <h2>TABLA CURSOS</h2>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="form-table-rows">
                        <DataGrid rows={arrayMagicoState} columns={columns} pageSize={5} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="form-table-title">
                        <h2>ELIMINADAS</h2>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="form-table-rows">
                        <DataGrid rows={eliminadas} columns={columnsEliminadas} pageSize={5} />
                    </div>
                </Grid>
            </Grid>
            <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                <DialogTitle>Editar Fila</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    />
                    <TextField
                        label="Producto"
                        value={producto}
                        onChange={(e) => setProducto(e.target.value)}
                    />
                    <TextField
                        label="Accesos"
                        value={accesos}
                        onChange={(e) => setAccesos(e.target.value)}
                    />
                    <TextField
                        label="Socios"
                        value={socios}
                        onChange={(e) => setSocios(e.target.value)}
                    />
                    <TextField
                        label="Precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                    <TextField
                        label="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    <TextField
                        label="Expiración"
                        value={expiracion}
                        onChange={(e) => setExpiracion(e.target.value)}
                    />
                    <TextField
                        label="Visible"
                        value={visible}
                        onChange={(e) => setVisible(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditModalOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormTable;
