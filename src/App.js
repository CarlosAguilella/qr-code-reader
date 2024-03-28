import React from 'react';

import Header from './components/header/Header';
import ScannerView from './components/qr-reader/ScannerView';
import FormRegister from './components/forms/form-register/FormRegister';
import FormTicket from './components/forms/form-ticket/FormTicket';
import FormForm from './components/forms/form-ticket/FormForm';

import './index.css';

function App() {
  return (
    <div className='app-container montserrat'>
      {/* <Header />
      <ScannerView /> */}
      {/* <FormRegister /> */}
      <FormTicket />
      {/* <FormForm /> */}
    </div>
  );
}

export default App;
