import React, { useState } from "react";
import { Grid, Checkbox } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';
import { DateTime } from "luxon";

import PreviewTable from './PreviewTable';

import './formTable.css';

const FormTable = ({ arrayMagico }) => {
    const [arrayMagicoState, setArrayMagico] = useState(arrayMagico);
    const [previewComponent, setPreviewComponent] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);

    const handleArrayMagico = (arrayMagico) => {
        if (Array.isArray(arrayMagico)) {
            setArrayMagico(arrayMagico);
        }
    };

    const handlePreview = (id) => {
        const fila = arrayMagicoState.find(row => row.id === id);
        const previewData = {
            'ID': fila.id,
            'TIPO': fila.tipo,
            'PRODUCTO': fila.producto,
            'ACCESOS': fila.accesos,
            'SOCIOS': fila.socios ? 'Si' : 'No',
            'PRECIO': fila.precio + ' €',
            'STOCK': fila.stock,
            'EXPIRACION': DateTime.fromISO(fila.expiracion).toLocaleString(DateTime.DATETIME_MED),
            'VISIBLE': fila.visible ? 'Si' : 'No',
            'DELETED': fila.deleted ? 'Si' : 'No',
        };
        setPreviewOpen(true);
        setPreviewComponent(<PreviewTable open={previewOpen} onClose={handlePreviewClose} data={previewData} />);
    };

    const handlePreviewClose = () => {
        setPreviewOpen(false);
    };

    const handleDuplicar = (id) => {
        const filaDuplicada = arrayMagicoState.find(row => row.id === id);
        const nuevoId = Math.floor(Math.random() * 10000);
        const filaDuplicadaConNuevoId = { ...filaDuplicada, id: nuevoId };
        setArrayMagico([...arrayMagicoState, filaDuplicadaConNuevoId]);
    }

    const handleEliminar = (id) => {
        const nuevasFilas = arrayMagicoState.map(row => {
            if (row.id === id) {
                return { ...row, deleted: true };
            }
            return row;
        });
        setArrayMagico(nuevasFilas);
    };

    const handleMostrarDeNuevo = (id) => {
        const nuevasFilas = arrayMagicoState.map(row => {
            if (row.id === id) {
                return { ...row, deleted: false };
            }
            return row;
        });
        setArrayMagico(nuevasFilas);
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
        { field: 'visible', headerName: 'VISIBLE', width: 150, renderCell: (params) =>
            params.row.visible && (
                <Checkbox checked={params.row.visible} />
            )
        },
        {
            field: 'acciones', headerName: 'ACCIONES', width: 150, renderCell: (params) => (
                <div>
                    <VisibilityIcon onClick={() => handlePreview(params.row.id)} />
                    <BorderColorIcon />
                    <ContentCopyIcon onClick={() => handleDuplicar(params.row.id)} />
                    <HighlightOffIcon onClick={() => handleEliminar(params.row.id)} />
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
                    <VisibilityIcon onClick={() => handlePreview(params.row.id)} />
                    <BorderColorIcon />
                    <ContentCopyIcon onClick={() => handleDuplicar(params.row.id)} />
                    <HighlightOffIcon onClick={() => handleMostrarDeNuevo(params.row.id)} />
                </div>
            )
        },
    ];

    const rowsNoEliminadas = arrayMagicoState.filter(row => !row.deleted);
    const rowsEliminadas = arrayMagicoState.filter(row => row.deleted);

    return (
        <div className="form-table" onChange={handleArrayMagico}>
            {previewComponent}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <div className="flex-center">
                        <div className="form-table-title">
                            <h2>Ver productos de la tienda</h2>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    {arrayMagicoState.length === 0 ? (
                        <div className="flex-center">
                            <p>No hay filas disponibles.</p>
                        </div>
                    ) : (
                        <div className="form-table-rows">
                            <DataGrid showCellVerticalBorder showColumnVerticalBorder rows={rowsNoEliminadas} columns={columns} pageSize={5} />
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