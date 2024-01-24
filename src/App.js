import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './App.css';

function App() {
  const [resultado, setResultado] = useState(null);
  const [resultadoArchivo, setResultadoArchivo] = useState(null);
  const [grabando, setGrabando] = useState(false);
  const previewStyle = { height: 240, width: 320, };
  const delay = 50;
  const camara = { facingMode: 'environment' };

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
        <h2>Buscando QR</h2>
        <QrReader
          scanDelay={delay}
          containerStyle={previewStyle}
          onScan={handleCameraScan}
          onError={(err) => console.error(err)}
          constraints={camara}
        />
      </div>
      <div className={grabando ? 'input-container' : 'desaparecer input-container'}>
        <h2>Sube una imagen</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
              setResultadoArchivo(event.target.result);
            };
            reader.readAsDataURL(file);
          }}
        />
        
      </div>
      {resultado && (
        <div className="resultado-container">
          <h2>Tu resultado:</h2>
          <p>{resultado}</p>
        </div>
      )}
      {resultadoArchivo && (
          <img src={resultadoArchivo} alt="Imagen" />
        )}
      <button onClick={abrir} className={grabando ? 'desaparecer input-container' : 'input-container'}>
        Abre la cámara para escanear
      </button>
    </div>
  );
}

export default App;
