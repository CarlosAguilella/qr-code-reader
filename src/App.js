import React, { useState, useRef } from 'react';

import Header from './components/header/Header';
import CameraQr from './components/qr-reader/reader/CameraQr';
import InputCode from './components/qr-reader/input/InputCode';

import './index.css';




function App() {
  return (
    <div className='app-container'>
      <Header />
      <br />
      <CameraQr />
      <InputCode />
    </div>
  );
}

export default App;
