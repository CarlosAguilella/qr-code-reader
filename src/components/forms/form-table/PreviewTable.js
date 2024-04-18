import React from "react";
import { Dialog, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const PreviewTable = ({ open, onClose, data }) => {
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
                            {Object.entries(data).map(([key, value]) => (
                                <TableRow key={key}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="flex-end">
                    <div className="preview-button">
                        <Button onClick={handleClose}>Cerrar</Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default PreviewTable;
