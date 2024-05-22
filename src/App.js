import React, { useState } from 'react';
import Header from './components/header/Header';
import FormTable from './components/forms/form-table/FormTable';
import FormCreate from './components/forms/form-create/FormCreate';
import FormCard from './components/forms/form-card/FormCard';
import CompraProducto from './components/forms/compra-producto/CompraProducto';
import './index.css';
import Formulario from './components/formulario/Formulario';

function App() {
  const [valueSelected, setValueSelected] = useState('table');
  const [magicArray, setMagicArray] = useState([]);

  return (
    <div className='app-container montserrat'>
      {/* {valueSelected === 'table' ? (
        <>
          <Header setValueSelected={setValueSelected} valueSelected={valueSelected} />
          <FormTable magicArray={magicArray} setMagicArray={setMagicArray} />
        </>
      ) : (
        <>
          <Header setValueSelected={setValueSelected} valueSelected={valueSelected} />
          <FormCreate setMagicArray={setMagicArray} magicArray={magicArray} setValueSelected={setValueSelected} valueSelected={valueSelected} />
        </>
      )} */}
      {/* <FormCard/> */}
      {/* <CompraProducto /> */}
      <Formulario />
    </div>
  );
}

export default App;