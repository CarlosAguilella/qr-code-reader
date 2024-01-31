import React, { useState, useRef } from 'react';
import './App.css';
import CameraQr from './components/CameraQr';
import GeneratorQr from './components/GeneratorQr';
import UploadImage from './components/UploadImage';

function App() {
  return (
    <div className='app-container'>
      <CameraQr />
      <GeneratorQr />
      <UploadImage />      
    </div>
  );
}

export default App;
