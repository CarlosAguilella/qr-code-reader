import React, { useState, useRef } from 'react';
import QrReader from 'react-qr-reader';
import QRCode from 'qrcode.react';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [log, setLog] = useState(null);
  const videoRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      setLog(`Código QR encontrado: ${data}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setLog('Error al escanear el código QR. Asegúrate de permitir el acceso a la cámara.');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLog(`Se ha seleccionado el archivo ${file.name} de tipo ${file.type} y tamaño ${file.size} bytes.`);
  };

  return (
    <div className="app-container">
      <p>{log}</p>

      <div className="input-container">
        <h2>Aquí debes introducir el QR</h2>
        <label className="file-label">
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>

      <div className="input-container">
        <h2>Abre la cámara trasera</h2>
        <QrReader
          ref={videoRef}
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>

      {result && (
        <div className="result-container">
          <h2>Tu resultado:</h2>
          <p>{result}</p>
          <h2>Y tu QR:</h2>
          <QRCode value={result} />
        </div>
      )}
    </div>
  );
}

export default App;
