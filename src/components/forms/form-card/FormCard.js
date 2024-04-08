// import React, { useState, useRef } from 'react';
// import QRCode from 'qrcode.react';
// import { useReactToPrint } from 'react-to-print';
// import { Grid } from "@mui/material";

// import './formCard.css';

// const MYIMAGE = 'logo192.png';

// const FormCard = () => {
//  const [name, setName] = useState('');
//  const [photo, setPhoto] = useState(null);
//  const componentRef = useRef();

//  const handlePrint = useReactToPrint({
//  content: () => componentRef.current,
//  pageStyle: `
//  @page {
//  size: credit-card;
//  }
//  @media print {
//  body {
//  margin: 0;
//  }
//  }
//  `,
//  });

//  const handleKeyDown = (event) => {
//  if (event.ctrlKey && event.key === 'p') {
//  event.preventDefault();
//  handlePrint();
//  }
//  };

//  const handlePhotoChange = (event) => {
//  setPhoto(URL.createObjectURL(event.target.files[0]));
//  };

//  const generateQR = (name) => {
//  return `Nombre: ${name}`;
//  };

//  return (
//  <div className='form-card-container'>
//  <Grid container>
//  <Grid item xs={3}>
//  <div className='card-logo'>
//  <img src={MYIMAGE} alt='Logo' />
//  </div>
//  </Grid>
//  <Grid item xs={3}>
//  <div className='form-card' ref={componentRef}>
//  <div className='form-card-title'>
//  <h1>Ajuntament de</h1>
//  <h1>les Alqueries</h1>
//  </div>
//  </div>
//  </Grid>
//  <Grid item xs={12}>
//  <input
//  type='text'
//  placeholder='Nombre'
//  value={name}
//  onChange={(event) => setName(event.target.value)}
//  onKeyDown={handleKeyDown}
//  />
//  </Grid>
//  <Grid item xs={12}>
//  <input type='file' onChange={handlePhotoChange} />
//  </Grid>
//  <Grid item xs={12}>
//  <button onClick={handlePrint}>Imprimir</button>
//  </Grid>
//  </Grid>
//  </div>
//  );
// };

// export default FormCard;