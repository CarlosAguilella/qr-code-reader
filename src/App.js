import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './App.css';

function App() {
  const [resultado, setResultado] = useState(null);
  const [grabando, setGrabando] = useState(false);
  const [selected, setSelected] = useState("environment");

  const previewStyle = {
    height: 240, width: 320,
  };

  const delay = 300;

  const handleCameraScan = (data) => {
    if (data) {
      setResultado(data);
      setGrabando(false);
    }
  };

  const abrir = () => {
    setGrabando(true);
    setResultado(null);
  };

  return (
    <div className="app-container">
      <div className={grabando ? 'input-container' : 'desaparecer input-container'}>
        <h2>HAZ QUE EL QR APAREZCA</h2>
        <QrReader
          scanDelay={delay}
          containerStyle={previewStyle}
          onScan={handleCameraScan}
          onError={(err) => console.error(err)}
          constraints={{ facingMode: 'environment' }}
        />
      </div>

      <select onChange={(e) => setSelected(e.target.value)}>
        <option value={"environment"}>Back Camera</option>
        <option value={"user"}>Front Camera</option>
      </select>

      {resultado && (
        <div className="resultado-container">
          <h2>Tu resultado:</h2>
          <p>{resultado}</p>
        </div>
      )}

      <button
        onClick={abrir}
        className={grabando ? 'desaparecer input-container' : 'input-container'}
      >
        Abre la cámara para escanear
      </button>
    </div>
  );
}

export default App;
