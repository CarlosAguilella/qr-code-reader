import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import './formCard.css';
import { Button } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import jsPDF from 'jspdf';
import Html from 'react-pdf-html';

const MYIMAGE = 'AjuntamentDeLesAlqueries.png', MYIMAGE2 = 'imagen.png', MYIMAGE3 = 'background.png';

// Solución para el problema de CORS con archivos locales
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// hay que usarlo ya que el worker de pdf.js no puede cargar archivos locales

const FormCard = () => {
    const [name, setName] = useState('');
    const [surname1, setSurname1] = useState('');
    const [surname2, setSurname2] = useState('');
    const [code, setCode] = useState('');
    const [image, setImage] = useState(null);
    const [qrDataURL, setQRDataURL] = useState('');
    const [pdfBlob, setPdfBlob] = useState(null);

    useEffect(() => {
        const qrContent = `Nombre: ${name}, Apellidos: ${surname1} ${surname2}, Código: ${code}`;
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
    }

    const handleGeneratePDF = async () => {
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [53.98, 85.6]
        });
        pdf.addImage(MYIMAGE, 'PNG', 2, 2, 28, 16);
        pdf.addImage(MYIMAGE3, 'PNG', 0, 20, 25, 40);
        pdf.addImage(image, 'PNG', 6, 28, 18, 22);
        pdf.setFontSize(12);
        pdf.text(name, 28, 38);
        pdf.text(surname1, 28, 42);
        pdf.text(surname2, 28, 46);
        pdf.setFontSize(8);
        pdf.text(code, 28, 49);

        if (qrDataURL) {
            pdf.addImage(qrDataURL, 'PNG', 70, 2, 15, 15);
            pdf.roundedRect(70, 2, 15, 15, 1, 1, 'S');
        }

        const newPdfBlob = pdf.output('blob');

        console.log(newPdfBlob);
        
        setPdfBlob(newPdfBlob);
    };

    return (
        <>
            <div className='form-card-container'>
                <div className='card-qr'>
                    {qrDataURL && <img src={qrDataURL} alt="QR Code" />}
                </div>
                <div className='card-logo'>
                    <img src={MYIMAGE} alt='Logo' />
                </div>
                {image ? (
                    <div type='file' className='card-image' onClick={handleUploadImage}>
                        <img src={image} alt='Foto' />
                    </div>
                ) : (
                    <div type='file' className='card-image' onClick={handleUploadImage}>
                        <img src={MYIMAGE2} alt='Foto' />
                    </div>
                )}
                <input
                    className='card-input-name'
                    type='text'
                    placeholder='Name...'
                    value={name}
                    onChange={handleInputChange(setName)}
                />
                <input
                    className='card-input-surname1'
                    type='text'
                    placeholder='Surname...'
                    value={surname1}
                    onChange={handleInputChange(setSurname1)}
                />
                <input
                    className='card-input-surname2'
                    type='text'
                    placeholder='Surname...'
                    value={surname2}
                    onChange={handleInputChange(setSurname2)}
                />
                <input
                    className='card-input-code'
                    type='text'
                    placeholder='Code...'
                    value={code}
                    onChange={handleInputChange(setCode)}
                />
                <div className='card-back'>
                    <img src={MYIMAGE3} alt='Back' />
                </div>
                <Button onClick={handleGeneratePDF} style={{ top: '300px' }}>Generate PDF</Button>
            </div>
            <div style={{ top: '500px' }}>
                {pdfBlob && (
                    <>
                        <p>PDF generado por el blob:</p>
                        <Document
                            file={pdfBlob}
                            loading="Cargando PDF..."
                        >
                            <Page pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false} />
                        </Document>
                    </>
                )}
            </div>
        </>
    );
};

export default FormCard;
