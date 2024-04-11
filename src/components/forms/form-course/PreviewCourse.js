import React from "react";
import { Dialog, Button } from "@mui/material";

const PreviewCourse = ({ courseData, setPreview }) => {
    return (
        <Dialog open={courseData.preview} onClose={() => setPreview(courseData.preview)}>
            <div className="form-dialog">
                <div className="preview-container">
                    <div className="preview-title">
                        <h1>Contenido introducido</h1>
                    </div>
                    <div className="preview-data">
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripción corta:</span>
                            <span className="preview-data-value">{courseData.smallDescEs === "" ? "No hay descripción corta" : courseData.smallDescEs}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripción larga:</span>
                            <span className="preview-data-value">{courseData.largeDescEs === "" ? "No hay descripción larga" : courseData.largeDescEs}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripció curta:</span>
                            <span className="preview-data-value">{courseData.smallDescVal === "" ? "No hi ha descripció curta" : courseData.smallDescVal}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripció llarga:</span>
                            <span className="preview-data-value">{courseData.largeDescVal === "" ? "No hi ha descripció llarga" : courseData.largeDescVal}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Plazas disponibles:</span>
                            <span className="preview-data-value">{(courseData.unlimited === true || courseData.courseNumber === "") ? "Ilimitadas" : (courseData.courseNumber === "0") ? "No hay entradas disponibles" : courseData.courseNumber}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Inicio Preinscrición:</span>
                            <span className="preview-data-value">{courseData.preStartingDate === "" ? "No hay fecha de inicio" : courseData.preStartingDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Fin Preinscrición:</span>
                            <span className="preview-data-value">{courseData.preEndingDate === "" ? "No hay fecha de fin" : courseData.preEndingDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Fecha inicio:</span>
                            <span className="preview-data-value">{courseData.startDate === "" ? "No hay fecha de inicio" : courseData.startDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Fecha fin:</span>
                            <span className="preview-data-value">{courseData.endingDate === "" ? "No hay fecha de fin" : courseData.endingDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Imagen:</span>
                            <span className="preview-data-value">{courseData.image === null ? ("No hay imagen") : (<div className="flex-center"><img src={courseData.image} alt="imagen"></img></div>)}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Permitir lista de espera:</span>
                            <span className="preview-data-value">{courseData.waitingList === true ? "Si" : "No"}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Precio para soci@s:</span>
                            <span className="preview-data-value">{courseData.memberDues === "0" || courseData.memberDues === "" ? "Gratuito" : courseData.memberDues}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Precio para no soci@s:</span>
                            <span className="preview-data-value">{courseData.nonMemberDues === "0" || courseData.nonMemberDues === "" ? "Gratuito" : courseData.nonMemberDues}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Permitir pago a plazos</span>
                            <span className="preview-data-value">{courseData.payment === true ? "Si" : "No"}</span>
                        </div>
                        {courseData.payment && (
                            <div className="preview-data-item">
                                <span className="preview-data-label">Número de cuotas:</span>
                                <span className="preview-data-value">{courseData.duesNumber === "" ? "No hay número de cuotas" : courseData.duesNumber}</span>
                            </div>
                        )}
                        <div className="preview-data-item">
                            <span className="preview-data-label">Programa:</span>
                            <span className="preview-data-value">
                                <br />
                                Duración: {courseData.duration}
                                <br />
                                Edad: {courseData.ageDescription}
                                <br />
                                Otros: {courseData.poolProgramOption}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-end">
                <div className="preview-button">
                    <Button onClick={() => setPreview(!courseData.preview)}>
                        Cerrar
                    </Button>
                </div>
            </div>
        </Dialog >
    );
};

export default PreviewCourse;