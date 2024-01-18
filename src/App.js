import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import './App.css';

function App() {
  const [resultado, setResultado] = useState(null);
  const [grabando, setGrabando] = useState(true);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' para cámara frontal, 'environment' para cámara trasera

  const handleCameraScan = (data) => {
    if (data) {
      setResultado(data.text);
      setGrabando(false);
    }
  };

  const toggleFacingMode = () => {
    setFacingMode((prevMode) => (prevMode === 'environment' ? 'user' : 'environment'));
  };

  const volverAEmpezar = () => {
    setGrabando(true);
    setResultado(null);
  };

  return (
    <div className="app-container">
      <div className={grabando ? 'input-container' : 'desaparecer input-container'}>
        <h2>Abre la cámara</h2>
        <QrReader
          delay={300}
          style={{ height: '100%', width: '100%' }}
          onError={(err) => console.error(err)}
          onScan={handleCameraScan}
          facingMode={facingMode}
        />
        <button onClick={toggleFacingMode}>Cambiar Cámara</button>
      </div>

      {resultado && (
        <div className="resultado-container">
          <h2>Tu resultado:</h2>
          <p>{resultado}</p>
        </div>
      )}

      <button className={grabando ? 'desaparecer input-container' : 'input-container'} onClick={volverAEmpezar}>
        Volver al inicio
      </button>
    </div>
  );
}

export default App;
