import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const FormTable = ({ courseData }) => {
    const columns = [
        { field: 'id', headerName: 'id', width: 50 },
        { field: 'TIPO', headerName: 'Tipo', width: 100 },
        { field: 'PRODUCTO', headerName: 'Producto', width: 180 },
        { field: 'ACCESOS', headerName: 'Accesos', width: 110 },
        { field: 'SOCIOS', headerName: 'Socios', width: 110 },
        { field: 'PRECIO', headerName: 'Precio', width: 110 },
        { field: 'STOCK', headerName: 'Stock', width: 110 },
        { field: 'EXPIRACION', headerName: 'Expiración', width: 180 },
        { field: 'VISIBLE', headerName: 'Visible', width: 110 },
        {
            field: 'ACCIONES', headerName: 'Acciones', width: 180, renderCell: () => (
                <div>
                    <VisibilityIcon />
                    <BorderColorIcon />
                    <ContentCopyIcon />
                    <HighlightOffIcon />
                </div>
            )
        },
    ];

    let idCounter = 1;

    const rows = courseData.createTableForm.map(item => ({
        id: idCounter++,
        TIPO: item.type,
        PRODUCTO: item.product,
        ACCESOS: item.access,
        SOCIOS: item.members,
        PRECIO: item.price,
        STOCK: item.stock,
        EXPIRACION: item.expiration,
        VISIBLE: item.visible,
        ACCIONES: item.actions,
    }));

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
    );
}

export default FormTable;
