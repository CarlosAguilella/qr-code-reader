import React, { useState } from 'react';
import Header from './components/header/Header';
import FormTable from './components/forms/form-table/FormTable';
import FormCreate from './components/forms/form-create/FormCreate';
import './index.css';

function App() {
  const [valueSelected, setValueSelected] = useState('table');
  const [magicArray, setMagicArray] = useState(
    [
      {
        accesos: 0,
        adultsProgram: false,
        ageDescription: "",
        childrenProgram: false,
        deleted: false,
        duesNumber: 1,
        duration: "",
        endingDate: "",
        eventNumber: 45,
        eventPrice: 3,
        exclusive: true,
        expiracion: "2024-04-23",
        free: true,
        id: "1TRY4U",
        image: null,
        largeDescEs: "",
        largeDescVal: "",
        memberDues: 0,
        memberFree: true,
        nonMemberDues: 0,
        nonMemberFree: true,
        payment: false,
        poolProgram: false,
        poolProgramOption: "",
        preEndingDate: "",
        preStartingDate: "",
        precio: 0,
        preview: false,
        producto: "",
        smallDescEs: "",
        smallDescVal: "",
        socios: "SI",
        sociosValue: true,
        startDate: "",
        stock: 0,
        summerProgram: false,
        ticketPrice: 0,
        tipo: "product 1",
        unlimited: true,
        visible: false,
        waitingList: false,
        winterProgram: false,
      },
    ]
  );

  console.log('magicArray', magicArray);

  return (
    <div className='app-container montserrat'>
      {valueSelected === 'table' ? (
        <>
          <Header setValueSelected={setValueSelected} valueSelected={valueSelected} />
          <FormTable magicArray={magicArray} setMagicArray={setMagicArray} />
        </>
      ) : (
        <>
          <Header setValueSelected={setValueSelected} valueSelected={valueSelected} />
          <FormCreate setMagicArray={setMagicArray} magicArray={magicArray} setValueSelected={setValueSelected} valueSelected={valueSelected} />
        </>
      )}
    </div>
  );
}

export default App;
