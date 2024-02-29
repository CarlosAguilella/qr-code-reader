import React from 'react';

import Header from './components/header/Header';
import QrReader from './components/qr-reader/QrReader';

import './index.css';

function App() {
  return (
    <div className='app-container'>
      <Header />
      <br />
      <QrReader />
    </div>
  );
}

export default App;
