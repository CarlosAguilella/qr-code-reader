
import React from "react";
import { Dialog, Button, Grid } from "@mui/material";

const PreviewTicket = ({
    preview,
    setPreview,
    smallDesc,
    largeDesc,
    unlimited,
    free,
    exclusive,
    startDate,
    endingDate,
    image,
    handleUploadImage
}) => {
    return (
        <Dialog open={preview} onClose={() => setPreview(!preview)}>
            <div className="form-dialog">
                <div className="preview-container">
                    <div className="preview-title">
                        <h1>Contenido introducido</h1>
                    </div>
                    <div className="preview-data">
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripción corta:</span>
                            <span className="preview-data-value">{smallDesc === "" ? "No hay descripción corta" : smallDesc}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripción larga:</span>
                            <span className="preview-data-value">{largeDesc === "" ? "No hay descripción larga" : largeDesc}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Entradas disponibles:</span>
                            <span className="preview-data-value">{unlimited === true ? "Ilimitadas" : "45"}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Precio:</span>
                            <span className="preview-data-value">{free === true ? "Gratuito" : "3€"}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Exclusivo para soci@s:</span>
                            <span className="preview-data-value">{exclusive === true ? "Es exclusivo para soci@s" : "No es exclusivo para soci@s"}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Fecha inicio:</span>
                            <span className="preview-data-value">{startDate === "" ? "No hay fecha de inicio" : startDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Fecha fin:</span>
                            <span className="preview-data-value">{endingDate === "" ? "No hay fecha de fin" : endingDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Imagen:</span>
                            <span className="preview-data-value">
                                {image === null ? (
                                    "No hay imagen"
                                ) : (
                                    <div className="flex-center">
                                        <img src={image} alt="imagen"></img>
                                    </div>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex-end">
                    <Button className="form-button" onClick={() => setPreview(!preview)}>
                        Cerrar
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default PreviewTicket;
