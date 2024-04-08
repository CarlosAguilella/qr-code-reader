import React from "react";
import { Dialog, Button } from "@mui/material";

const PreviewCourse = ({ duesData1, duesData2, duesData3, duesData4, nonMemberDues, nonMemberFree, memberDues, memberFree, duesNumber, payment, preStartingDate, preEndingDate, preview, visible, smallDescEs, largeDescEs, smallDescVal, largeDescVal, unlimited, courseNumber, waitingList, startDate, endingDate, image, winterProgram, summerProgram, adultsProgram, poolProgram, free, setPreview, coursePrice, exclusive }) => {
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
                            {smallDescEs.length > 50 ? (
                                <span className="preview-data-value">La descripción no puede ser más larga de 50 carácteres</span>
                            ) : (
                                <span className="preview-data-value">{smallDescEs === "" ? "No hay descripción corta" : smallDescEs}</span>
                            )}
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripción larga:</span>
                            {largeDescEs.length > 500 ? (
                                <span className="preview-data-value">La descripción no puede ser más larga de 500 carácteres</span>
                            ) : (
                                <span className="preview-data-value">{largeDescEs === "" ? "No hay descripción larga" : largeDescEs}</span>
                            )}
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripció curta:</span>
                            {smallDescVal.length > 50 ? (
                                <span className="preview-data-value">La descripció no pot ser més llarga de 50 caràcters</span>
                            ) : (
                                <span className="preview-data-value">{smallDescVal === "" ? "No hi ha descripció curta" : smallDescVal}</span>
                            )}
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Descripció llarga:</span>
                            {largeDescVal.length > 500 ? (
                                <span className="preview-data-value">La descripció no pot ser més llarga de 500 caràcters</span>
                            ) : (
                                <span className="preview-data-value">{largeDescVal === "" ? "No hi ha descripció llarga" : largeDescVal}</span>
                            )}
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Plazas disponibles:</span>
                            <span className="preview-data-value">{(unlimited === true || courseNumber === "") ? "Ilimitadas" : (courseNumber === "0") ? "No hay entradas disponibles" : courseNumber}</span>
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
                            <span className="preview-data-label">Permitir lista de espera:</span>
                            <span className="preview-data-value">{waitingList === true ? "Si" : "No"}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Inicio Preinscrición:</span>
                            <span className="preview-data-value">{preStartingDate === "" ? "No hay fecha de inicio de preinscripción" : preStartingDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Fin Preinscrición:</span>
                            <span className="preview-data-value">{preEndingDate === "" ? "No hay fecha de fin de preinscripción" : preEndingDate}</span>
                        </div>
                        <div className="preview-data-item">
                            <span className="preview-data-label">Permitir pago a plazos</span>
                            <span className="preview-data-value">{payment === true ? "Si" : "No"}</span>
                        </div>
                        {payment === true && (
                            <>
                                <div className="preview-data-item">
                                    <span className="preview-data-label">Número de cuotas:</span>
                                    <span className="preview-data-value">{duesNumber === "" ? "No hay número de cuotas" : duesNumber}</span>
                                </div>
                                <div className="preview-data-item">
                                    <span className="preview-data-label">Precio para soci@s:</span>
                                    <span className="preview-data-value">{memberDues === 0 || memberDues === "" ? "Gratuito" : memberDues}</span>
                                </div>
                                <div className="preview-data-item">
                                    <span className="preview-data-label">Precio para no soci@s:</span>
                                    <span className="preview-data-value">{nonMemberDues === 0 || nonMemberDues === "" ? "Gratuito" : nonMemberDues}</span>
                                </div>
                            </>

                        )}
                        {payment === true && duesNumber === 1 && (
                            <div className="preview-data-item">
                                <span className="preview-data-label">Cuota 1:</span>
                                <span className="preview-data-value">{duesData1 === "" ? "No hay cuota 1" : duesData1}</span>
                            </div>
                        )}
                        {payment === true && duesNumber === 2 && (
                            <>
                                <div className="preview-data-item">
                                    <span className="preview-data-label">Cuota 1:</span>
                                    <span className="preview-data-value">{duesData1 === "" ? "No hay cuota 1" : duesData1}</span>
                                </div>
                                <div className="preview-data-item">
                                    <span className="preview-data-label">Cuota 2:</span>
                                    <span className="preview-data-value">{duesData2 === "" ? "No hay cuota 2" : duesData2}</span>
                                </div>
                            </>
                        )}
                        {payment === true && duesNumber === 3 && (
                            <>
                                <div className="preview-data-item">
                                    <span className="preview-data-label">Cuota 1:</span>
                                    <span className="preview-data-value">{duesData1 === "" ? "No hay cuota 1" : duesData1}</span>
                                </div>
                                <div className="preview-data-item">
                                    <span className="preview-data-label">Cuota 2:</span>
                                    <span className="preview-data-value">{duesData2 === "" ? "No hay cuota 2" : duesData2}</span>
                                </div>
                                <div className="preview-data-item">
                                    <span className="preview-data-label">Cuota 3:</span>
                                    <span className="preview-data-value">{duesData3 === "" ? "No hay cuota 3" : duesData3}</span>
                                </div>
                            </>
                        )}
                        {payment === true && duesNumber === 4 && (
                            <>
                                <div className="preview-data-item">
                                    <span className="preview-data-label">Cuota 1:</span>
                                    <span className="preview-data-value">{duesData1 === "" ? "No hay cuota 1" : duesData1}</span>
                                </div>
                                <div className="preview-data-item">
                                    <span className="preview-data-label">Cuota 2:</span>
                                    <span className="preview-data-value">{duesData2 === "" ? "No hay cuota 2" : duesData2}</span>
                                </div>
                                <div className="preview-data-item">
                                    <span className="preview-data-label">Cuota 3:</span>
                                    <span className="preview-data-value">{duesData3 === "" ? "No hay cuota 3" : duesData3}</span>
                                </div>
                                <div className="preview-data-item">
                                    <span className="preview-data-label">Cuota 4:</span>
                                    <span className="preview-data-value">{duesData4 === "" ? "No hay cuota 4" : duesData4}</span>
                                </div>
                            </>
                        )}
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

export default PreviewCourse;