import React from 'react';


import FormTicket from './components/forms/form-ticket/FormTicket';
import FormEvent from './components/forms/form-event/FormEvent';
import FormCourse from './components/forms/form-course/FormCourse';

import './index.css';

function App() {
  return (
    <div className='app-container montserrat'>
      <FormTicket />
      <FormEvent />
      <FormCourse />
    </div>
  );
}

export default App;
