import React, { useState } from 'react';
import Header from './components/header/Header';
import FormTable from './components/forms/form-course/FormTable';
import FormEvent from './components/forms/form-event/FormEvent';
import FormCourse from './components/forms/form-course/FormCourse';
import FormTicket from './components/forms/form-ticket/FormTicket';
import './index.css';

function App() {
  const [valueSelected, setValueSelected] = useState('Table');
  const [elArraySupremo, setElArraySupremo] = useState([]);

  const handleValueChange = (value) => {
    setValueSelected(value);
  };

  const handleSaveData = (data) => {
    setElArraySupremo([...elArraySupremo, data]);
  };

  return (
    <div className='app-container montserrat'>
      <Header onValueChange={handleValueChange} />
      {valueSelected === 'Table' ? (
        <FormTable data={elArraySupremo} />
      ) : valueSelected === 'Event' ? (
        <FormEvent onSave={handleSaveData} />
      ) : valueSelected === 'Course' ? (
        <FormCourse onSave={handleSaveData} />
      ) : (
        <FormTicket onSave={handleSaveData} />
      )}
    </div>
  );
}

export default App;
