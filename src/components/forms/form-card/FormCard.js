import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import './formCard.css';

const MYIMAGE = 'AjuntamentDeLesAlqueries.png', MYIMAGE2 = 'imagen.png', MYIMAGE3 = 'background.png';

const FormCard = () => {
    const [name, setName] = useState('');
    const [surname1, setSurname1] = useState('');
    const [surname2, setSurname2] = useState('');
    const [code, setCode] = useState('');
    const [image, setImage] = useState(null);
    const [qrData, setQRData] = useState('');

    // Genera el contenido para el código QR basado en los datos ingresados
    useEffect(() => {
        const qrContent = `Nombre: ${name}, Apellidos: ${surname1} ${surname2}, Código: ${code}`;
        setQRData(qrContent);
    }, [name, surname1, surname2, code]);

    // Convierte los valores ingresados a mayúsculas
    const handleInputChange = (setter) => (event) => {
        setter(event.target.value.toUpperCase());
    };

    // Abre los archivos para seleccionar una imagen
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

    return (
        <div className='form-card-container'>
            <div className='card-qr'>
                <QRCode value={qrData} style={{width: '75px', height: '75px'}} />
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
        </div >
    );
};

export default FormCard;
