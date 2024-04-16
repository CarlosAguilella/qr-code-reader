// App.js
import React, { useState } from 'react';
import Header from './components/header/Header';
import FormTable from './components/forms/form-table/FormTable';
import FormCreate from './components/forms/form-create/FormCreate';
import './index.css';

function App() {
  const [valueSelected, setValueSelected] = useState(false);
  const [arrayMagico, setArrayMagico] = useState([]);

  const handleValueChange = (value) => {
    setValueSelected(value);
  };

  return (
    <div className='app-container montserrat'>
      {!valueSelected ? (
        <>
          <Header onValueChange={handleValueChange} />
          <FormTable arrayMagico={arrayMagico} setArrayMagico={setArrayMagico} />
        </>
      ) : (
        <FormCreate onValueChange={handleValueChange} setArrayMagico={setArrayMagico} arrayMagico={arrayMagico} />
      )}
    </div>
  );
}

export default App;
