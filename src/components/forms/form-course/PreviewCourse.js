import React from "react";
import { Dialog, Button } from "@mui/material";

const PreviewCourse = ({ formCreate, setPreview }) => {
    return (
        <Dialog open={formCreate.preview} onClose={() => setPreview(formCreate.preview)}>
            <div className="form-dialog">
                <div className="preview-container">
                    <div className="preview-title">
                        <h1>Contenido introducido</h1>
                    </div>
                    <div className="preview-data">
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripción corta:</span>
                            <span className="preview-data-value">{formCreate.smallDescEs === "" ? "No hay descripción corta" : formCreate.smallDescEs}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripción larga:</span>
                            <span className="preview-data-value">{formCreate.largeDescEs === "" ? "No hay descripción larga" : formCreate.largeDescEs}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripció curta:</span>
                            <span className="preview-data-value">{formCreate.smallDescVal === "" ? "No hi ha descripció curta" : formCreate.smallDescVal}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripció llarga:</span>
                            <span className="preview-data-value">{formCreate.largeDescVal === "" ? "No hi ha descripció llarga" : formCreate.largeDescVal}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Plazas disponibles:</span>
                            <span className="preview-data-value">{(formCreate.unlimited === true || formCreate.courseNumber === "") ? "Ilimitadas" : (formCreate.courseNumber === "0") ? "No hay entradas disponibles" : formCreate.courseNumber}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Inicio Preinscrición:</span>
                            <span className="preview-data-value">{formCreate.preStartingDate === "" ? "No hay fecha de inicio" : formCreate.preStartingDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Fin Preinscrición:</span>
                            <span className="preview-data-value">{formCreate.preEndingDate === "" ? "No hay fecha de fin" : formCreate.preEndingDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Fecha inicio:</span>
                            <span className="preview-data-value">{formCreate.startDate === "" ? "No hay fecha de inicio" : formCreate.startDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Fecha fin:</span>
                            <span className="preview-data-value">{formCreate.endingDate === "" ? "No hay fecha de fin" : formCreate.endingDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Imagen:</span>
                            <span className="preview-data-value">{formCreate.image === null ? ("No hay imagen") : (<div className="flex-center"><img src={formCreate.image} alt="imagen"></img></div>)}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Permitir lista de espera:</span>
                            <span className="preview-data-value">{formCreate.waitingList === true ? "Si" : "No"}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Precio para soci@s:</span>
                            <span className="preview-data-value">{formCreate.memberDues === "0" || formCreate.memberDues === "" ? "Gratuito" : formCreate.memberDues}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Precio para no soci@s:</span>
                            <span className="preview-data-value">{formCreate.nonMemberDues === "0" || formCreate.nonMemberDues === "" ? "Gratuito" : formCreate.nonMemberDues}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Permitir pago a plazos</span>
                            <span className="preview-data-value">{formCreate.payment === true ? "Si" : "No"}</span>
                        </div>
                        {formCreate.payment && (
                            <div className="preview-data-item">
                                <span className="preview-data-label">Número de cuotas:</span>
                                <span className="preview-data-value">{formCreate.duesNumber === "" ? "No hay número de cuotas" : formCreate.duesNumber}</span>
                            </div>
                        )}
                        <div className="preview-data-item">
                            <span className="preview-data-label">Programa:</span>
                            <span className="preview-data-value">
                                <br />
                                Duración: {formCreate.duration}
                                <br />
                                Edad: {formCreate.ageDescription}
                                <br />
                                Otros: {formCreate.poolProgramOption}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-end">
                <div className="preview-button">
                    <Button onClick={() => setPreview(!formCreate.preview)}>
                        Cerrar
                    </Button>
                </div>
            </div>
        </Dialog >
    );
};

export default PreviewCourse;