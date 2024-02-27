import React, { useState, useRef } from 'react';

import Header from './components/Header';
import CameraQr from './components/CameraQr';
import InputCode from './components/InputCode';

import './App.css';


function App() {
  return (
    <div className='app-container'>
      <Header />
      <br />
      <br />
      <CameraQr />
      <InputCode />
    </div>
  );
}

export default App;
