import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import './formCard.css';
import { Button } from '@mui/material';
import { pdfjs } from 'react-pdf';
import jsPDF from 'jspdf';

import ReportTemplate from './ReportTemplate';

const MYIMAGE = 'AjuntamentDeLesAlqueries.png';
const MYIMAGE3 = 'background.png';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FormCard = () => {
    const name = 'ROBERTO EDUARDO';
    const surname1 = 'DE LA TORRE';
    const surname2 = 'MARTÍNEZ';
    const code = '20456894V';
    const image = 'fotoCarnet.png';
    const [qrDataURL, setQRDataURL] = useState('');
    const reportTemplateRef = useRef(null);

    useEffect(() => {
        const qrContent = 'nombre';
        QRCode.toDataURL(qrContent)
            .then(url => setQRDataURL(url))
            .catch(err => console.error(err));
    }, [name, surname1, surname2, code]);

    const generatePDF = () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.html(reportTemplateRef.current, {
            callback(pdf) {
                pdf.save('card.pdf');
            },
        });
    };

    return (
        <>
            <div className='card'>
                <div className='flex-center'>
                    <img src={MYIMAGE} className='card-logo' />
                </div>
                <div className='flex-center'>
                    <h1 className='card-input-name'>Nombre: {name}</h1>
                </div>
                <div className='flex-center'>
                    <h1 className='card-input-surname1'>Primer Apellido: {surname1}</h1>
                </div>
                <div className='flex-center'>
                    <h1 className='card-input-surname2'>Segundo Apellido: {surname2}</h1>
                </div>
                <div className='flex-center'>
                    <h3 className='card-input-code'>Código del usuario: {code}</h3>
                </div>
                <div className='flex-center'>
                    <img src={image} className='card-image' />
                </div>
                <div className='flex-center'>
                    <img src={qrDataURL} className='card-qr' />
                </div>
                <div className='flex-center'>
                    <Button onClick={generatePDF}>Generar PDF</Button>
                </div>
            </div>
            <div className='white' />
            <div ref={reportTemplateRef} className='flex-start'>
                <ReportTemplate
                    qrDataURL={qrDataURL}
                    MYIMAGE={MYIMAGE}
                    image={image}
                    name={name}
                    surname1={surname1}
                    surname2={surname2}
                    code={code}
                    MYIMAGE3={MYIMAGE3}
                />
            </div>
        </>
    );
};

export default FormCard;
