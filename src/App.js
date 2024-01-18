import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './App.css';

function App() {
  const [resultado, setResultado] = useState(null);
  const [grabando, setGrabando] = useState(true);

  const handleCameraScan = (data) => {
    if (data) {
      setResultado(data.text);
      setGrabando(false);
    }
  };

  const volverAEmpezar = () => {
    setGrabando(true);
    setResultado(null);
  };

  return (
    <div className="app-container">
      <div className={grabando ? 'input-container' : 'desaparecer input-container'}>
        <h2>Abre la cámara trasera</h2>
        <QrReader
          delay={300}
          style={{ height: '100%', width: '100%' }}
          onError={(err) => console.error(err)}
          onScan={handleCameraScan}
          constraints={{
            audio: true,
            video: { facingMode: "environment" }
          }}
        />
      </div>

      {resultado && (
        <div className="resultado-container">
          <h2>Tu resultado:</h2>
          <p>{resultado}</p>
        </div>
      )}

      <button className={grabando ? 'desaparecer input-container' : 'input-container'} onClick={volverAEmpezar}>
        Volver al inicio.
      </button>
    </div>
  );
}

export default App;

// html5-qrcode