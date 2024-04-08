import React, { useState, useRef } from 'react';

import './formCard.css';

const MYIMAGE = 'AjuntamentDeLesAlqueries.png';
const MYIMAGE2 = 'imagen.png';
const MYIMAGE3 = 'qr1234.png';

const FormCard = () => {
    const [name, setName] = useState('');
    const [surname1, setSurname1] = useState('');
    const [surname2, setSurname2] = useState('');
    const [code, setCode] = useState('');
    const [image, setImage] = useState(null);

    const handleKeyDown = (event) => {
        if (event.ctrlKey && event.key === 'p') {
            event.preventDefault();
        }
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

    return (
        <div className='form-card-container'>
            <div className='card-qr'>
                <img src={MYIMAGE3} alt='QR'/>
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
                placeholder='Nombre'
                value={name}
                onChange={(event) => setName(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <input
                className='card-input-surname1'
                type='text'
                placeholder='Apellido 1'
                value={surname1}
                onChange={(event) => setSurname1(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <input
                className='card-input-surname2'
                type='text'
                placeholder='Apellido 2'
                value={surname2}
                onChange={(event) => setSurname2(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <input
                className='card-input-code'
                type='text'
                placeholder='Código'
                value={code}
                onChange={(event) => setCode(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className='card-back'>
            </div>
        </div >
    );
};

export default FormCard;