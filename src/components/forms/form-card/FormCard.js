import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import './formCard.css';
import { Button } from '@mui/material';
import { pdfjs } from 'react-pdf';
import jsPDF from 'jspdf';

import PdfCreator from './PdfCreator';

const MYIMAGE1 = 'fondo.png';
const MYIMAGE2 = 'fotoCarnet.png';
const MYIMAGE3 = 'Escut.png';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FormCard = () => {
    const [name, setName] = useState('ROBERTO EDUARDO');
    const [surname1, setSurname1] = useState('DE LA TORRE');
    const [surname2, setSurname2] = useState('MARTÍNEZ');
    const [code, setCode] = useState('20456894V');
    const [image, setImage] = useState(MYIMAGE2);
    const [qrDataURL, setQRDataURL] = useState('');
    const reportTemplateRef = useRef(null);
    const [seePdf, setSeePdf] = useState(false);

    useEffect(() => {
        const qrContent = 'nombre: ' + name + ' ' + surname1 + ' ' + surname2 + ' código: ' + code;
        QRCode.toDataURL(qrContent)
            .then(url => setQRDataURL(url))
            .catch(err => console.error(err));
    }, [name, surname1, surname2, code]);

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value.toUpperCase());
    };

    const handleUploadImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
        };
        input.click();
    };

    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: 'credit-card',
        });
        pdf.html(reportTemplateRef.current, {
            callback(pdf) {
                pdf.save('card.pdf');
            },
        });
    };

    const handleSeePDF = () => {
        setSeePdf(true);
        generatePDF();
        setTimeout(() => {
            setSeePdf(false);
        },);
    }

    return (
        <>
            <div className='card'>
                <div className='flex-center'>
                    <input
                        className='card-input-name'
                        type='text'
                        placeholder='Name...'
                        value={name}
                        onChange={handleInputChange(setName)}
                    />
                </div>
                <div className='flex-center'>
                    <input
                        className='card-input-surname1'
                        type='text'
                        placeholder='Surname...'
                        value={surname1}
                        onChange={handleInputChange(setSurname1)}
                    />
                </div>
                <div className='flex-center'>
                    <input
                        className='card-input-surname2'
                        type='text'
                        placeholder='Surname...'
                        value={surname2}
                        onChange={handleInputChange(setSurname2)}
                    />
                </div>
                <div className='flex-center'>
                    <input
                        className='card-input-code'
                        type='text'
                        placeholder='Code...'
                        value={code}
                        onChange={handleInputChange(setCode)}
                    />
                </div>
                <div className='flex-center'>
                    <div type='file' onClick={handleUploadImage}>
                        <img src={image} className='card-image' alt='Foto' />
                    </div>
                </div>
                <div className='flex-center'>
                    <img src={qrDataURL} className='card-qr' />
                </div>
                <div className='flex-center'>
                    <Button onClick={handleSeePDF}>Generar PDF</Button>
                </div>
            </div>
            {seePdf ? (
                <div ref={reportTemplateRef} className='flex-start montserrat'>
                    <PdfCreator
                        qrDataURL={qrDataURL}
                        MYIMAGE={MYIMAGE1}
                        MYIMAGE3={MYIMAGE3}
                        image={image}
                        name={name}
                        surname1={surname1}
                        surname2={surname2}
                        code={code}
                    />
                </div>
            ) : (
                <div ref={reportTemplateRef} className='flex-start montserrat' style={{ display: 'none' }}>
                    <PdfCreator
                        qrDataURL={qrDataURL}
                        MYIMAGE3={MYIMAGE3}
                        image={image}
                        name={name}
                        surname1={surname1}
                        surname2={surname2}
                        code={code}
                    />
                </div>
            )}
        </>
    );
};

export default FormCard;