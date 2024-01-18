import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './App.css';

function App() {
  const [resultado, setResultado] = useState(null);
  const [grabando, setGrabando] = useState(false);

  const handleCameraScan = (data) => {
    if (data) {
      setResultado(data);
      setGrabando(false);
    }
  };

  const volverAEmpezar = () => {
    setGrabando(true);
    setResultado(null);
  };

  const abrir = () => {
    setGrabando(true);
  }

  return (
    <div className="app-container">
      <div className={grabando ? 'input-container' : 'desaparecer input-container'}>
        <QrReader
          scanDelay={300}
          containerStyle={{ height: '100%', width: '100%' }}
          onScan={handleCameraScan}
          onError={(err) => console.error(err)}
          constraints={{ facingMode: 'environment' }}
        />
      </div>

      {resultado && (
        <div className="resultado-container">
          <h2>Tu resultado:</h2>
          <p>{resultado}</p>
        </div>
      )}

      <button onClick={abrir} className={grabando ? 'desaparecer input-container' : 'input-container'} onClick={volverAEmpezar}>
        Abre la cámara trasera
      </button>
    </div>
  );
}

export default App;
