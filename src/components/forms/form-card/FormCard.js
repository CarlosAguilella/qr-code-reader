import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import './formCard.css';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';

const MYIMAGE = 'AjuntamentDeLesAlqueries.png', MYIMAGE2 = 'imagen.png', MYIMAGE3 = 'background.png';

const FormCard = () => {
    const [name, setName] = useState('');
    const [surname1, setSurname1] = useState('');
    const [surname2, setSurname2] = useState('');
    const [code, setCode] = useState('');
    const [image, setImage] = useState(null);
    const [qrDataURL, setQRDataURL] = useState('');
    const [pdfURL, setPdfURL] = useState(null);
    const [pdfBlobInfo, setPdfBlobInfo] = useState('');

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
        pdf.text(`${name}`, 28, 38);
        pdf.text(`${surname1}`, 28, 42);
        pdf.text(`${surname2}`, 28, 46);
        pdf.setFontSize(8);
        pdf.text(`${code}`, 28, 50);

        if (qrDataURL) {
            pdf.addImage(qrDataURL, 'PNG', 70, 2, 15, 15);
            pdf.rect(70, 2, 15, 15);
        }

        // Generar el Blob del PDF
        const pdfBlob = pdf.output('blob');

        // Crear un objeto FileReader para leer el contenido del Blob
        const reader = new FileReader();

        // Definir la función de retrollamada para cuando se complete la lectura
        reader.onload = function (event) {
            // El contenido del Blob estará disponible en event.target.result
            const blobContent = event.target.result;

            // Aquí puedes hacer lo que desees con el contenido del Blob
            console.log(blobContent); // Muestra el contenido del Blob en la consola
        };

        // Leer el contenido del Blob como texto
        reader.readAsText(pdfBlob);
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
                <Button onClick={handleGeneratePDF} style={{top: '300px'}}>Generate PDF</Button>
            </div>
            
        </>
    );
};

export default FormCard;
