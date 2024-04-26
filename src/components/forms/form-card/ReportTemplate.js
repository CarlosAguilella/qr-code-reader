import React from 'react';
import './formCard.css';

const ReportTemplate = ({ qrDataURL, MYIMAGE, image, name, surname1, surname2, code, MYIMAGE3 }) => {
    return (
        <div className='pdf-card'>
            <div className='flex-center'>
                <img src={MYIMAGE} className='pdf-card-logo' />
            </div>
            <div className='flex-center'>
                <h5 className='pdf-card-input-name'>{name}</h5>
            </div>
            <div className='flex-center'>
                <h5 className='pdf-card-input-surname1'>{surname1}</h5>
            </div>
            <div className='flex-center'>
                <h5 className='pdf-card-input-surname2'>{surname2}</h5>
            </div>
            <div className='flex-center'>
                <h6 className='pdf-card-input-code'>{code}</h6>
            </div>
            <div className='flex-center' type='file'>
                <img src={image} className='pdf-card-image' />
                <img src={qrDataURL} className='pdf-card-qr' />
            </div>
        </div>
    );
};

export default ReportTemplate;