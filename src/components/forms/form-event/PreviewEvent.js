import React from "react";
import { Dialog, Button } from "@mui/material";

const PreviewEvent = ({ preview, setPreview, smallDescEs, largeDescEs, smallDescVal, largeDescVal, unlimited, eventNumber, free, eventPrice, exclusive, startDate, endingDate, image, winterProgram, summerProgram, adultsProgram, poolProgram }) => {
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
                            <span className="preview-data-value">{smallDescEs === "" ? "No hay descripción corta" : smallDescEs}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripción larga:</span>
                            <span className="preview-data-value">{largeDescEs === "" ? "No hay descripción larga" : largeDescEs}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripció curta:</span>
                            <span className="preview-data-value">{smallDescVal === "" ? "No hi ha descripció curta" : smallDescVal}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripció llarga:</span>
                            <span className="preview-data-value">{largeDescVal === "" ? "No hi ha descripció llarga" : largeDescVal}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Entradas disponibles:</span>
                            <span className="preview-data-value">{(unlimited === true || eventNumber === "") ? "Ilimitadas" : (eventNumber === "0") ? "No hay entradas disponibles" : eventNumber}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Precio:</span>
                            <span className="preview-data-value">{(free === true || eventPrice === "" || eventPrice === "0") ? "Gratuito" : eventPrice}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Exclusivo para soci@s:</span>
                            <span className="preview-data-value">{exclusive === true ? "Si" : "No"}</span>
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
                        <div className="preview-data-item">
                            <span className="preview-data-label">Programa de Invierno:</span>
                            <span className="preview-data-value">{winterProgram === true ? "Si" : "No"}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Programa de Verano:</span>
                            <span className="preview-data-value">{summerProgram === true ? "Si" : "No"}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Programa de...:</span>
                            <span className="preview-data-value">{adultsProgram === true ? "Adultos/Jovenes" : "Niños"}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Programa de Piscina:</span>
                            <span className="preview-data-value">{poolProgram === true ? "Si" : "No"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-end">
                <div className="preview-button">
                    <Button onClick={() => setPreview(!preview)}>
                        Cerrar
                    </Button>
                </div>
            </div>
        </Dialog >
    );
};

export default PreviewEvent;