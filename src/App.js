import React, { useState, useRef } from 'react';

import CameraQr from './components/CameraQr';

import './App.css';


function App() {
  return (
    <div className='app-container'>
      <CameraQr />
    </div>
  );
}

export default App;
