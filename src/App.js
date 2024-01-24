import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './App.css';

function App() {
  const [resultadoCamara, setResultadoCamara] = useState(null);
  const [resultadoArchivo, setResultadoArchivo] = useState(null);
  const [grabando, setGrabando] = useState(false);
  const previewStyle = { height: 240, width: 320 };
  const delay = 50;
  const camara = { facingMode: 'environment' };

  const handleCameraScan = (data) => {
    if (data) {
      setResultadoCamara(data);
      setGrabando(false);
    }
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResultadoArchivo(reader.result);
      setGrabando(false);
    };
  };

  const abrir = () => {
    setGrabando(true);
    setResultadoCamara(null);
    setResultadoArchivo(null);
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

      {resultadoCamara && (
        <div className="resultado-container">
          <h2>Tu resultado del QR de la cámara es:</h2>
          <p>{resultadoCamara}</p>
        </div>
      )}

      <button onClick={abrir} className={grabando ? 'desaparecer input-container' : 'input-container'}>
        Abre la cámara para escanear
      </button>
      
      <h2>Leer archivos</h2>
      <input type="file" accept="image/*" onChange={handleArchivoChange} />
      {resultadoArchivo && (
        <div className="resultado-container">
          <h2>Tu resultado del archivo es:</h2>
          <p>{resultadoArchivo}</p>
        </div>
      )}
    </div>
  );
}

export default App;
