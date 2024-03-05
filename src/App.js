import React from 'react';

import Header from './components/header/Header';
import ScannerView from './components/qr-reader/ScannerView';

import './index.css';

function App() {
  return (
    <div className='app-container montserrat'>
      <Header />
      <ScannerView />
    </div>
  );
}

export default App;
