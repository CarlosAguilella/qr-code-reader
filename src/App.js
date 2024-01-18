import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './App.css';

function App() {
  const [resultado, setResultado] = useState(null);
  const [grabando, setGrabando] = useState(false);

  const handleCameraScan = (data) => {
    if (data) {
      setResultado(data), setGrabando(false);
    }
  };

  const abrir = () => {
    setGrabando(true), setResultado(null);
  }

  return (
    <div className="app-container">
      <div className={grabando ? 'input-container' : 'desaparecer input-container'}>
        <h2>HAZ QUE EL QR APAREZCA EN LA PANTALLA</h2>
        <QrReader scanDelay={300} containerStyle={{ height: '100%', width: '100%' }} onScan={handleCameraScan} onError={(err) => console.error(err)} constraints={{ facingMode: 'environment' }} />
      </div>

      {resultado && (
        <div className="resultado-container">
          <h2>Tu resultado:</h2>
          <p>{resultado}</p>
        </div>
      )}

      <button onClick={abrir} className={grabando ? 'desaparecer input-container' : 'input-container'}>
        Abre la cámara trasera
      </button>
    </div>
  );
}

export default App;
