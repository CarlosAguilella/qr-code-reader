import React, { useState } from "react";
import { Dialog, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputBase } from "@mui/material";

const EditTable = ({ open, onClose, data, handleUpdate }) => {
    const [editedData, setEditedData] = useState(data);

    const handleChange = (e, key) => {
        const newValue = e.target.value;
        setEditedData(prevData => ({
            ...prevData,
            [key]: newValue
        }));
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className="form-dialog">
                <TableContainer component={Paper}>
                    <Table aria-label="preview table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Clave</TableCell>
                                <TableCell>Valor</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(editedData).map((key) => (
                                <TableRow key={key}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>
                                        <InputBase
                                            value={editedData[key]}
                                            onChange={(e) => handleChange(e, key)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="flex-end">
                    <div className="preview-button">
                    <Button onClick={() => handleUpdate(editedData)}>Guardar Cambios</Button>
                        <Button onClick={handleClose}>Cerrar</Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default EditTable;
