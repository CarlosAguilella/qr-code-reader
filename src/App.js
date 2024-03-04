import React from 'react';

import Header from './components/header/Header';
import ScannerView from './components/qr-reader/ScannerView';

// he modificado la importacion de app.css a index.css
import './index.css';

function App() {
  return (
    // he modificado el nombre de la clase app-container
    // y agregado el estilo de letra a toda la web(montserrat)
    <div className='app-container montserrat'>
      <Header />
      <br />
      <ScannerView />
    </div>
  );
}

export default App;
