import React, { useState, useEffect } from "react";
import { Dialog, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const PreviewTable = ({ open, data }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
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
                        <Button onClick={() => setIsOpen(false)}>Cerrar</Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default PreviewTable;
