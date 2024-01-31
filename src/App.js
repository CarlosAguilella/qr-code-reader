import React, { useState, useRef } from 'react';

import CameraQr from './components/CameraQr';
import GeneratorQr from './components/GeneratorQr';
import UploadImage from './components/UploadImage';
import CanvasDrawing from './components/CanvasDrawing';
import WhiteBoard from './components/WhiteBoard';

import './App.css';


function App() {
  return (
    <div className='app-container'>
      <CameraQr />
      <UploadImage />
      <GeneratorQr />
      {/* <CanvasDrawing /> */}
      <WhiteBoard />
    </div>
  );
}

export default App;
