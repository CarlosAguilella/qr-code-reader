import React, { useState } from 'react';
import Header from './components/header/Header';
import FormTable from './components/forms/form-table/FormTable';
import FormCreate from './components/forms/form-create/FormCreate';
import './index.css';

function App() {
  const [valueSelected, setValueSelected] = useState('table');
  const [arrayMagico, setArrayMagico] = useState([]);

  return (
    <div className='app-container montserrat'>
      {valueSelected === 'table' ? (
        <>
          <Header setValueSelected={setValueSelected} valueSelected={valueSelected} />
          <FormTable arrayMagico={arrayMagico} setArrayMagico={setArrayMagico} />
        </>
      ) : (
        <>
          <Header setValueSelected={setValueSelected} valueSelected={valueSelected} />
          <FormCreate setArrayMagico={setArrayMagico} arrayMagico={arrayMagico} setValueSelected={setValueSelected} valueSelected={valueSelected} />
        </>
      )}
    </div>
  );
}

export default App;
