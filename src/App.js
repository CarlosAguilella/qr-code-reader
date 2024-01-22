import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './App.css';

function App() {
  const [resultado, setResultado] = useState(null);
  const [grabando, setGrabando] = useState(false);
  const previewStyle = { height: 240, width: 320, };
  const delay = 300;
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

  const leerArchivo = () => {
    const archivo = document.getElementById('archivo');
    const reader = new FileReader();

    reader.onload = () => {
      setResultado(reader.result);
    };

    reader.readAsText(archivo.files[0]);
  }

  return (
    <div className="app-container">
      <div className={grabando ? 'input-container' : 'desaparecer input-container'}>
        <h2>Buscando QR</h2>
        <QrReader scanDelay={delay} containerStyle={previewStyle} onScan={handleCameraScan} onError={(err) => console.error(err)} constraints={camara} />
      </div>

      <div className={grabando ? 'desaparecer input-container' : 'input-container'}>
        <h2>Escanea un archivo</h2>
        <input type="file" id="archivo" accept="*/image" />
      </div>

      {resultado && (
        <div className="resultado-container">
          <h2>Tu resultado:</h2>
          <p>{resultado}</p>
        </div>
      )}

      {resultado && (
        <div className="resultado-container">
          <h2>Tu resultado:</h2>
          <p>{resultado}</p>
        </div>
      )}

      <button onClick={abrir} className={grabando ? 'desaparecer input-container' : 'input-container'}>
        Abre la cámara para escanear
      </button>

      <button onClick={leerArchivo} className={resultado ? 'input-container' : 'desaparecer input-container'}>
        Leer archivo
      </button>
    </div>
  );
}

export default App;
