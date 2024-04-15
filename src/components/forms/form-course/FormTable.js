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
    // Estado para almacenar las filas de la tabla principal
    const [rows, setRows] = useState([]);
    // Estado para almacenar las filas eliminadas
    const [eliminadas, setEliminadas] = useState([]);
    // Estado para almacenar si el modal de edición está abierto o cerrado
    const [editModalOpen, setEditModalOpen] = useState(false);
    // Estado para almacenar la fila que se está editando
    const [editingRow, setEditingRow] = useState(null);

    // Llenar las filas iniciales cuando se monta el componente
    useEffect(() => {
        // Mapear los datos del formulario de creación de la tabla a las filas de la tabla
        setRows(courseData.createTableForm.map(item => ({
            // Generar un UUID único para cada fila
            id: uuidv4(),
            // Asignar los valores de las propiedades del objeto a las columnas
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

    // Este boton es el de la x, solo va desde la tabla principal a la de eliminadas, al reves es el de mostrar (ojo)
    const handleEliminar = (id) => {
        // Encontrar la fila que se va a eliminar
        const eliminada = rows.find(row => row.id === id);
        // Filtrar las filas para eliminar la fila seleccionada
        const nuevasFilas = rows.filter(row => row.id !== id);
        // Actualizar el estado de las filas
        setRows(nuevasFilas);
        // Agregar la fila eliminada al estado de las filas eliminadas
        setEliminadas([...eliminadas, eliminada]);
    }

    // Este es el segundo boton, el de editar, que sirve para modificar los datos de la fila seleccionada
    const handleEditar = (id) => {
        // Encontrar la fila que se está editando
        const filaEditada = rows.find(row => row.id === id);
        // Establecer los datos de la fila que se está editando en el estado
        setEditingRow(filaEditada);
        // Abrir el modal de edición
        setEditModalOpen(true);
    }

    // Este es el boton de guardar cambios, que sirve para guardar los cambios realizados en la fila seleccionada
    const handleSaveChanges = () => {
        // Aquí puedes agregar lógica para guardar los cambios realizados por el usuario en los datos de la fila
        const nuevasFilas = rows.map(row => {
            // Si la fila es la que se está editando, devolver la fila editada
            if (row.id === editingRow.id) {
                return editingRow;
            }
            // Si no, devolver la fila sin cambios
            return row;
        });
        // Actualizar el estado de las filas con los cambios guardados
        setRows(nuevasFilas);
        // Cerrar el modal después de guardar los cambios
        setEditModalOpen(false);
    }

    // Este es el tercer boton, el de duplicar, que sirve para duplicar la fila seleccionada, siempre con un nuevo ID ya que sino puede haber problemas
    const handleDuplicar = (id) => {
        // Encontrar la fila que se va a duplicar
        const filaDuplicada = rows.find(row => row.id === id);
        // Generar un nuevo UUID único para la fila duplicada
        const nuevoId = uuidv4();
        // Crear una copia de la fila con un nuevo ID
        const filaDuplicadaConNuevoId = { ...filaDuplicada, id: nuevoId };
        // Agregar la fila duplicada a las filas existentes
        setRows([...rows, filaDuplicadaConNuevoId]);
    }

    // Este es el cuarto boton, el de mostrar, que sirve para mostrar la fila eliminada en la tabla principal, al reves es el de eliminar (X)
    const handleMostrarDeNuevo = (id) => {
        // Encontrar la fila que se va a mostrar de nuevo
        const mostrada = eliminadas.find(row => row.id === id);
        // Filtrar las filas eliminadas para eliminar la fila seleccionada
        const nuevasEliminadas = eliminadas.filter(row => row.id !== id);
        // Actualizar el estado de las filas eliminadas
        setEliminadas(nuevasEliminadas);
        // Agregar la fila mostrada de nuevo al estado de las filas
        setRows([...rows, mostrada]);
    }

    // Columnas de la tabla
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

    // Columnas de la tabla de eliminadas
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
