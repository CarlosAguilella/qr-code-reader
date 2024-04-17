import React from "react";
import { Dialog, Button } from "@mui/material";

const PreviewCourse = ({ formInfo, setPreview }) => {
    return (
        <Dialog open={formInfo.preview} onClose={() => setPreview(formInfo.preview)}>
            <div className="form-dialog">
                <div className="preview-container">
                    <div className="preview-title">
                        <h1>Contenido introducido</h1>
                    </div>
                    <div className="preview-data">
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripción corta:</span>
                            <span className="preview-data-value">{formInfo.smallDescEs === "" ? "No hay descripción corta" : formInfo.smallDescEs}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripción larga:</span>
                            <span className="preview-data-value">{formInfo.largeDescEs === "" ? "No hay descripción larga" : formInfo.largeDescEs}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripció curta:</span>
                            <span className="preview-data-value">{formInfo.smallDescVal === "" ? "No hi ha descripció curta" : formInfo.smallDescVal}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripció llarga:</span>
                            <span className="preview-data-value">{formInfo.largeDescVal === "" ? "No hi ha descripció llarga" : formInfo.largeDescVal}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Plazas disponibles:</span>
                            <span className="preview-data-value">{(formInfo.unlimited === true || formInfo.courseNumber === "") ? "Ilimitadas" : (formInfo.courseNumber === "0") ? "No hay entradas disponibles" : formInfo.courseNumber}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Inicio Preinscrición:</span>
                            <span className="preview-data-value">{formInfo.preStartingDate === "" ? "No hay fecha de inicio" : formInfo.preStartingDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Fin Preinscrición:</span>
                            <span className="preview-data-value">{formInfo.preEndingDate === "" ? "No hay fecha de fin" : formInfo.preEndingDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Fecha inicio:</span>
                            <span className="preview-data-value">{formInfo.startDate === "" ? "No hay fecha de inicio" : formInfo.startDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Fecha fin:</span>
                            <span className="preview-data-value">{formInfo.endingDate === "" ? "No hay fecha de fin" : formInfo.endingDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Imagen:</span>
                            <span className="preview-data-value">{formInfo.image === null ? ("No hay imagen") : (<div className="flex-center"><img src={formInfo.image} alt="imagen"></img></div>)}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Permitir lista de espera:</span>
                            <span className="preview-data-value">{formInfo.waitingList === true ? "Si" : "No"}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Precio para soci@s:</span>
                            <span className="preview-data-value">{formInfo.memberDues === "0" || formInfo.memberDues === "" ? "Gratuito" : formInfo.memberDues}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Precio para no soci@s:</span>
                            <span className="preview-data-value">{formInfo.nonMemberDues === "0" || formInfo.nonMemberDues === "" ? "Gratuito" : formInfo.nonMemberDues}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Permitir pago a plazos</span>
                            <span className="preview-data-value">{formInfo.payment === true ? "Si" : "No"}</span>
                        </div>
                        {formInfo.payment && (
                            <div className="preview-data-item">
                                <span className="preview-data-label">Número de cuotas:</span>
                                <span className="preview-data-value">{formInfo.duesNumber === "" ? "No hay número de cuotas" : formInfo.duesNumber}</span>
                            </div>
                        )}
                        <div className="preview-data-item">
                            <span className="preview-data-label">Programa:</span>
                            <span className="preview-data-value">
                                <br />
                                Duración: {formInfo.duration}
                                <br />
                                Edad: {formInfo.ageDescription}
                                <br />
                                Otros: {formInfo.poolProgramOption}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-end">
                <div className="preview-button">
                    <Button onClick={() => setPreview(!formInfo.preview)}>
                        Cerrar
                    </Button>
                </div>
            </div>
        </Dialog >
    );
};

export default PreviewCourse;