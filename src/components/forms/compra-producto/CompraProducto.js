import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import { pdfjs } from 'react-pdf';
import jsPDF from 'jspdf';

import "./compraProducto.css";
import PdfCreator from "./PdfCreator";

const MYIMAGE = "AyuntamientoDeLasAlquerias.png";
const MYIMAGE2 = "personasPiscina.png";
const MYIMAGE3 = "qrInfoCompra.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const CompraProducto = () => {
    const descCorta = "Entrada válida para el acceso durante un día (mayores de 13 años).";

    const descCortaM = 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'; // 51 caracteres y 1 línea

    const descLarga = "Ubicación: Piscina Municipal de Les Alqueries, Via Augusta, 60.\n Horario: De lunes a viernes de 10:30h a 14:00h. Sábados y domingos de 11:00h a 20:00h.\n La entrada brinda acceso completo durante todo el día.\n Tras utilizar la entrada, si se necesita salir y regresar en el mismo día, se puede solicitar una pulsera de reacceso en el mostrador. Esta pulsera te permitirá reingresar durante el resto de la jornada.\n La entrada no asegura en ningún caso la entrada a la piscina, si el aforo está completo tendrá que esperar en cola, sin ninguna preferencia respecto a los usuarios que hayan llegado antes.\n Se podrá solicitar la veracidad de todos los datos, por lo que en caso de falsear los mismos quedará bloqueado el acceso al recinto.\n Normativa general de uso piscina municipal:\n - Menores de 12 años: han de ir obligatoriamente acompañados de un adulto, los de 13 años podrán ir solos a la piscina con una autorización de la madre, padre o tutor legal Por cada adulto se permite un máximo de 4 menores a su cargo.\n - Se debe seguir en todo momento las indicaciones del personal técnico y de los socorristas.\n - Respetar las normas de seguridad de las instalaciones.\n - Queda prohibido la entrada de animales.\n - No se permite la entrada de comida ni bebidas alcohólicas de alta graduación.\n - No se permite la entrada de vidrio.\n - Obligatorio usar ropa de baño y chanclas.\n - En la zona de playa no se podrá circular con calzado de calle.\n - No se permite fumar.\n - Es obligatorio ducharse antes del baño.\n - No está permitida la entrada de mesas, sillas o sombrillas, a excepción de causas justificadas.\n - Los bebes que lleven pañal será obligatorio el uso de pañal de agua para evitar la contaminación del agua por deposiciones.\n - El resto de normas de uso de la instalación estarán a disposición del público.\n";

    const descLargaM = 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'; // 73 caracteres y 25 líneas

    // "MMMMMMMMMMMMMMMMMMM" // 19 caracteres de M para todos los campos de abajo

    const dataCompra = {
        "Nombre": "Laura",
        "Apellidos": "García Pérez",
        "NIF/NIE": "16254901V",
        "Tarjeta (Les Alqueries en forma)": "U8PKFX8L2WKR3"
    };

    const dataDirigido = {
        "Nombre": "Marcos",
        "Apellidos": "Gómez García",
        "NIF/NIE": "56879614M",
        "Parentesco": "Hijo",
        "Tarjeta (Les Alqueries en forma)": "-"
    };

    const dataCompraInfo = {
        "Fecha de compra": "30/04/2024",
        "Descripción": "Entrada diaria piscina adulto",
        "Metodo de pago": "Tarjeta de crédito",
        "Precio": "2,60€"
    };

    const dataQR = "P8PKFX8L2WKR3";

    const reportTemplateRef = useRef(null);

    const [seePdf, setSeePdf] = useState(false);

    const separarTexto = () => {
        const fragmentos = descLarga.split('\n ');

        return fragmentos.map((fragmento, index) => (
            <span key={index} style={{ color: 'gray' }}>
                {fragmento.trim()}
                <br />
            </span>
        ));
    };

    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4',
        });

        const font = './Montserrat-normal.js';
        
        pdf.addFileToVFS('Montserrat-normal.js', font);
        pdf.addFont('Montserrat-normal.js', 'Montserrat-normal', 'normal');
        pdf.setFont('Montserrat-normal');
        
        setTimeout(() => {
            pdf.html(reportTemplateRef.current, {
                callback(pdf) {
                    pdf.save('card.pdf');
                    setSeePdf(false);
                },
            });
        }, 0);
    };

    const handleSeePDF = () => {
        setSeePdf(true);
        generatePDF();
        setTimeout(() => {
            setSeePdf(false);
        },);
    }

    return (
        <div className="compra-producto">
            <div>
                <button onClick={handleSeePDF}>Convertir a PDF</button>
            </div>
            <Grid container>
                <Grid item xs={12}>
                    <div className="flex-start">
                        <div>
                            <img src={MYIMAGE} className="logo" alt="logo" />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="flex-center">
                        <p className="compra-title"><strong>Entrada diaria piscina adulto</strong></p>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="flex-start">
                        <p className="descripcion-corta">
                            <img src={MYIMAGE2} className="image" alt="imagen" />
                            {descCorta}
                            {/* <br />
                            {descCortaM} */}
                            <br />
                            <br />
                            {separarTexto(descLarga)}
                            {/* <br />
                            {descLargaM} */}
                        </p>
                    </div>
                    <div className="flex-center">
                        <Grid container>
                            <Grid item xs={6}>
                                <div>
                                    <p className="compra-subtitle1"><strong>Comprado por</strong></p>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <p className="compra-subtitle2"><strong>Dirigido a</strong></p>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="compra-data1">
                                    <Grid container>
                                        {Object.entries(dataCompra).map(([key, value], index) => (
                                            <React.Fragment key={index}>
                                                <Grid item xs={6}>
                                                    {key === "Tarjeta (Les Alqueries en forma)" ? (
                                                        <p className="compra-info1" style={{ color: 'gray' }}>
                                                            <span>Tarjeta</span>
                                                            <span style={{ fontSize: '0.8em' }}> (Les Alqueries en forma)</span>
                                                        </p>
                                                    ) : (
                                                        <p className="compra-info1">{key}</p>
                                                    )}
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <p className="compra-info2">{value}</p>
                                                </Grid>
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="compra-data2">
                                    <Grid container>
                                        {Object.entries(dataDirigido).map(([key, value], index) => (
                                            <React.Fragment key={index}>
                                                <Grid item xs={6}>
                                                    {key === "Tarjeta (Les Alqueries en forma)" ? (
                                                        <p className="compra-info1" style={{ color: 'gray' }}>
                                                            <span>Tarjeta</span>
                                                            <span style={{ fontSize: '0.8em' }}> (Les Alqueries en forma)</span>
                                                        </p>
                                                    ) : (
                                                        <p className="compra-info1">{key}</p>
                                                    )}
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <p className="compra-info2">{value}</p>
                                                </Grid>
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <p className="compra-subtitle3"><strong>Información de la compra</strong></p>
                                </div>
                            </Grid>
                            <Grid item xs={9}>
                                <div className="compra-data3">
                                    <Grid container>
                                        {Object.entries(dataCompraInfo).map(([key, value], index) => (
                                            <React.Fragment key={index}>
                                                <Grid item xs={6}>
                                                    <p className="compra-info1">{key}</p>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <p className="compra-info2">{value}</p>
                                                </Grid>
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>
                                    <img src={MYIMAGE3} className="image-qr" alt="imagen qr" />
                                    <p className="compra-qr">{dataQR}</p>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="flex-start">
                                    <div>
                                        <img src={MYIMAGE} className="logo" alt="logo" />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <p className="compra-subtitle4"><strong>Condicionado del producto</strong></p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            {seePdf ? (
                <div ref={reportTemplateRef} className='flex-start montserrat'>
                    <PdfCreator
                        descCorta={descCorta}
                        descCortaM={descCortaM}
                        descLarga={descLarga}
                        descLargaM={descLargaM}
                        dataCompra={dataCompra}
                        dataDirigido={dataDirigido}
                        dataCompraInfo={dataCompraInfo}
                        dataQR={dataQR}
                        MYIMAGE={MYIMAGE}
                        MYIMAGE2={MYIMAGE2}
                        MYIMAGE3={MYIMAGE3}
                    />
                </div>
            ) : (
                <div ref={reportTemplateRef} className='flex-start montserrat' style={{ display: 'none' }}>
                    <PdfCreator
                        descCorta={descCorta}
                        descCortaM={descCortaM}
                        descLarga={descLarga}
                        descLargaM={descLargaM}
                        dataCompra={dataCompra}
                        dataDirigido={dataDirigido}
                        dataCompraInfo={dataCompraInfo}
                        dataQR={dataQR}
                        MYIMAGE={MYIMAGE}
                        MYIMAGE2={MYIMAGE2}
                        MYIMAGE3={MYIMAGE3}
                    />
                </div>
            )}
        </div>
    );
}

export default CompraProducto;
