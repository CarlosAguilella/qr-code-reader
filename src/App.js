import React, { useState, useRef } from 'react';

import Header from './components/Header';
import CameraQr from './components/CameraQr';

import './App.css';


function App() {
  return (
    <div className='app-container'>
      <Header />
      <CameraQr />
    </div>
  );
}

export default App;
