import React, { useState, useEffect } from "react";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { v4 as uuidv4 } from 'uuid';

import './formTable.css';

const FormTable = ({ courseData }) => {
    const [rows, setRows] = useState([]);
    const [eliminadas, setEliminadas] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingRow, setEditingRow] = useState(null);

    useEffect(() => {
        setRows(courseData.createTableForm.map(item => ({
            id: uuidv4(),
            TIPO: item.type,
            PRODUCTO: item.product,
            ACCESOS: item.access,
            SOCIOS: item.members,
            PRECIO: item.price,
            STOCK: item.stock,
            EXPIRACION: item.expiration,
            VISIBLE: item.visible,
            ACCIONES: item.actions,
        })));
    }, [courseData.createTableForm]);

    const handleEliminar = (id) => {
        const eliminada = rows.find(row => row.id === id);
        const nuevasFilas = rows.filter(row => row.id !== id);
        setRows(nuevasFilas);
        setEliminadas([...eliminadas, eliminada]);
    }

    const handleEditar = (id) => {
        const filaEditada = rows.find(row => row.id === id);
        setEditingRow(filaEditada);
        setEditModalOpen(true);
    }

    const handleSaveChanges = () => {
        const nuevasFilas = rows.map(row => {
            if (row.id === editingRow.id) {
                return editingRow;
            }
            return row;
        });
        setRows(nuevasFilas);
        setEditModalOpen(false);
    }

    const handleDuplicar = (id) => {
        const filaDuplicada = rows.find(row => row.id === id);
        const nuevoId = uuidv4();
        const filaDuplicadaConNuevoId = { ...filaDuplicada, id: nuevoId };
        setRows([...rows, filaDuplicadaConNuevoId]);
    }

    const handleMostrarDeNuevo = (id) => {
        const mostrada = eliminadas.find(row => row.id === id);
        const nuevasEliminadas = eliminadas.filter(row => row.id !== id);
        setEliminadas(nuevasEliminadas);
        setRows([...rows, mostrada]);
    }

    const columns = [
        { field: 'id', headerName: 'id', width: 200 },
        { field: 'TIPO', headerName: 'Tipo', width: 80 },
        { field: 'PRODUCTO', headerName: 'Producto', width: 160 },
        { field: 'ACCESOS', headerName: 'Accesos', width: 80 },
        { field: 'SOCIOS', headerName: 'Socios', width: 80 },
        { field: 'PRECIO', headerName: 'Precio', width: 80 },
        { field: 'STOCK', headerName: 'Stock', width: 80 },
        { field: 'EXPIRACION', headerName: 'Expiración', width: 150 },
        { field: 'VISIBLE', headerName: 'Visible', width: 80 },
        {
            field: 'ACCIONES', headerName: 'Acciones', width: 110, renderCell: (params) => (
                <div>
                    <BorderColorIcon onClick={() => handleEditar(params.row.id)} />
                    <ContentCopyIcon onClick={() => handleDuplicar(params.row.id)} />
                    <HighlightOffIcon onClick={() => handleEliminar(params.row.id)} />
                </div>
            )
        },
    ];

    const columnsEliminadas = [
        { field: 'id', headerName: 'id', width: 200 },
        { field: 'TIPO', headerName: 'Tipo', width: 80 },
        { field: 'PRODUCTO', headerName: 'Producto', width: 160 },
        { field: 'ACCESOS', headerName: 'Accesos', width: 80 },
        { field: 'SOCIOS', headerName: 'Socios', width: 80 },
        { field: 'PRECIO', headerName: 'Precio', width: 80 },
        { field: 'STOCK', headerName: 'Stock', width: 80 },
        { field: 'EXPIRACION', headerName: 'Expiración', width: 150 },
        { field: 'VISIBLE', headerName: 'Visible', width: 80 },
        {
            field: 'ACCIONES', headerName: 'Acciones', width: 110, renderCell: (params) => (
                <div>
                    <VisibilityIcon onClick={() => handleMostrarDeNuevo(params.row.id)} />
                </div>
            )
        },
    ];

    return (
        <div className="form-table">
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <div className="form-table-title">
                        <h2>TABLA CURSOS</h2>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="form-table-rows">
                        <DataGrid rows={rows} columns={columns} pageSize={5} />
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
                        value={editingRow ? editingRow.TIPO : ''}
                        onChange={(e) => setEditingRow({ ...editingRow, TIPO: e.target.value })}
                    />
                    <TextField
                        label="Producto"
                        value={editingRow ? editingRow.PRODUCTO : ''}
                        onChange={(e) => setEditingRow({ ...editingRow, PRODUCTO: e.target.value })}
                    />
                    <TextField
                        label="Accesos"
                        value={editingRow ? editingRow.ACCESOS : ''}
                        onChange={(e) => setEditingRow({ ...editingRow, ACCESOS: e.target.value })}
                    />
                    <TextField
                        label="Socios"
                        value={editingRow ? editingRow.SOCIOS : ''}
                        onChange={(e) => setEditingRow({ ...editingRow, SOCIOS: e.target.value })}
                    />
                    <TextField
                        label="Precio"
                        value={editingRow ? editingRow.PRECIO : ''}
                        onChange={(e) => setEditingRow({ ...editingRow, PRECIO: e.target.value })}
                    />
                    <TextField
                        label="Stock"
                        value={editingRow ? editingRow.STOCK : ''}
                        onChange={(e) => setEditingRow({ ...editingRow, STOCK: e.target.value })}
                    />
                    <TextField
                        label="Expiración"
                        value={editingRow ? editingRow.EXPIRACION : ''}
                        onChange={(e) => setEditingRow({ ...editingRow, EXPIRACION: e.target.value })}
                    />
                    <TextField
                        label="Visible"
                        value={editingRow ? editingRow.VISIBLE : ''}
                        onChange={(e) => setEditingRow({ ...editingRow, VISIBLE: e.target.value })}
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
