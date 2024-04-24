import React, { useState } from "react";
import { Grid, Checkbox } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CancelIcon from '@mui/icons-material/Cancel';
import { DataGrid } from '@mui/x-data-grid';
import { DateTime } from "luxon";
import { v4 as uuidv4 } from 'uuid';

import PreviewTable from './PreviewTable';
import EditTable from './EditTable';

import './formTable.css';

const FormTable = ({ magicArray, setMagicArray }) => {
    const [previewComponent, setPreviewComponent] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [editComponent, setEditComponent] = useState(null);
    const uniqueId = uuidv4();
    const smallId = uniqueId.slice(0, 6);

    const handleMagicArray = (magicArray) => {
        let tmpMagicArray = [...magicArray];
        setMagicArray(tmpMagicArray);
    };

    const handlePreview = (id) => {
        setPreviewOpen(true);
        const fila = magicArray.find(row => row.id === id);
        const previewData = {
            'ID': fila.id,
            'TIPO': !fila.tipo ? 'No disponible' : fila.tipo,
            'PRODUCTO': !fila.producto ? 'No disponible' : fila.producto,
            'ACCESOS': !fila.accesos ? 'No disponible' : fila.accesos,
            'SOCIOS': !fila.socios ? 'No disponible' : fila.socios,
            'PRECIO': !fila.precio ? 'No disponible' : fila.precio + ' €',
            'STOCK': !fila.stock ? 'No disponible' : fila.stock,
            'EXPIRACION': DateTime.fromISO(fila.expiracion).toLocaleString(DateTime.DATETIME_MED),
            'VISIBLE': fila.visible ? 'Si' : 'No',
            'DELETED': fila.deleted ? 'Si' : 'No',
        };
        setPreviewComponent(
            <PreviewTable open={setPreviewOpen} onClose={handlePreviewClose} data={previewData} />
        );
    };

    const handlePreviewClose = () => {
        setPreviewOpen(false);
        setPreviewComponent(null);
    };

    const handleEditar = (id) => {
        setPreviewOpen(true);
        const fila = magicArray.find(row => row.id === id);
        setEditComponent(
            <EditTable open={true} onClose={handleEditClose} data={fila} handleUpdate={handleUpdate} />
        );
    };

    const handleUpdate = (updatedData) => {
        const nuevasFilas = magicArray.map(row => {
            if (row.id === updatedData.id) {
                return updatedData;
            }
            return row;
        });
        setMagicArray(nuevasFilas);
        setEditComponent(null);
    };

    const handleEditClose = () => {
        setPreviewOpen(false);
        setEditComponent(null);
    };

    const handleDuplicar = (id) => {
        let tmpArray = [...magicArray];
        const nuevoId = smallId;
        const filaDuplicada = tmpArray.find(row => row.id === id);
        let newRow = { ...filaDuplicada, id: nuevoId };
        tmpArray.push(newRow);
        setMagicArray(tmpArray);
    };

    const handleEliminar = (id) => {
        let tmpArray = [...magicArray];
        tmpArray.find(row => row.id === id).deleted = true;
        setMagicArray(tmpArray);
    };

    const handleMostrarDeNuevo = (id) => {
        const nuevasFilas = magicArray.map(row => {
            if (row.id === id) {
                return { ...row, deleted: false };
            }
            return row;
        });
        setMagicArray(nuevasFilas);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'tipo', headerName: 'TIPO', width: 150 },
        { field: 'producto', headerName: 'PRODUCTO', width: 250 },
        { field: 'accesos', headerName: 'ACCESOS', width: 150 },
        { field: 'socios', headerName: 'SOCIOS', width: 150 },
        { field: 'precio', headerName: 'PRECIO', width: 150 },
        { field: 'stock', headerName: 'STOCK', width: 150 },
        { field: 'expiracion', headerName: 'EXPIRACION', width: 150 },
        {
            field: 'visible', headerName: 'VISIBLE', width: 150, renderCell: (params) =>
                params.row.visible && (
                    <Checkbox checked={params.row.visible} />
                )
        },
        {
            field: 'acciones', headerName: 'ACCIONES', width: 150, renderCell: (params) => (
                <div>
                    <VisibilityOutlinedIcon onClick={() => handlePreview(params.row.id)} />
                    <BorderColorIcon onClick={() => handleEditar(params.row.id)} />
                    <ContentCopyIcon onClick={() => handleDuplicar(params.row.id)} />
                    <CancelIcon onClick={() => handleEliminar(params.row.id)} style={{ color: 'red' }} />
                </div>
            )
        },
    ];

    const columnsEliminadas = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'tipo', headerName: 'TIPO', width: 150 },
        { field: 'producto', headerName: 'PRODUCTO', width: 250 },
        { field: 'accesos', headerName: 'ACCESOS', width: 150 },
        { field: 'socios', headerName: 'SOCIOS', width: 150 },
        { field: 'precio', headerName: 'PRECIO', width: 150 },
        { field: 'stock', headerName: 'STOCK', width: 150 },
        { field: 'expiracion', headerName: 'EXPIRACION', width: 150 },
        {
            field: 'acciones', headerName: 'ACCIONES', width: 150, renderCell: (params) => (
                <div>
                    <VisibilityOutlinedIcon onClick={() => handlePreview(params.row.id)} />
                    <BorderColorIcon onClick={() => handleEditar(params.row.id)} />
                    <ContentCopyIcon onClick={() => handleDuplicar(params.row.id)} />
                    <CancelIcon onClick={() => handleMostrarDeNuevo(params.row.id)} style={{ color: 'red' }} />
                </div>
            )
        },
    ];

    const rowsNoEliminadas = magicArray.filter(row => !row.deleted);
    const rowsEliminadas = magicArray.filter(row => row.deleted);

    return (
        <div className="form-table" onChange={handleMagicArray}>
            {previewComponent}{editComponent}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <div className="flex-center">
                        <div className="form-table-title">
                            <h2>Ver productos de la tienda</h2>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    {magicArray.length === 0 ? (
                        <div className="flex-center">
                            <p>No hay filas disponibles.</p>
                        </div>
                    ) : (
                        <div className="form-table-rows">
                            <DataGrid hover showCellVerticalBorder showColumnVerticalBorder rows={rowsNoEliminadas} columns={columns} pageSize={5} />
                        </div>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <div className="flex-center">
                        <div className="form-table-title-erased">
                            <h2>Ver productos eliminados de la tienda</h2>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="form-table-rows">
                        {rowsEliminadas.length === 0 ? (
                            <div className="flex-center">
                                <p>No hay filas eliminadas.</p>
                            </div>
                        ) : (
                            <DataGrid showCellVerticalBorder showColumnVerticalBorder rows={rowsEliminadas} columns={columnsEliminadas} pageSize={5} />
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default FormTable;