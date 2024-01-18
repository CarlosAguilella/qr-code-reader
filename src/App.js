import React, { useState, useRef, useEffect } from 'react';
import QrReader from 'react-qr-scanner';
import jsQR from 'jsqr';
import './App.css';

function App() {
  const [resultado, setResultado] = useState(null);
  const [grabando, setGrabando] = useState(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setGrabando(false);
        const imageData = new Image();
        imageData.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = imageData.width;
          canvas.height = imageData.height;
          const context = canvas.getContext('2d');
          context.drawImage(imageData, 0, 0, imageData.width, imageData.height);
          const imageDataArray = context.getImageData(0, 0, imageData.width, imageData.height);
          const code = jsQR(imageDataArray.data, imageData.width, imageData.height);
          if (code) {
            setResultado(code.data);
          } else {
            setResultado("No se encontró ningún código QR en la imagen.");
          }
        };
        imageData.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraScan = (data) => {
    setResultado(data);
    setGrabando(false);
  };

  const volverAEmpezar = () => {
    setGrabando(true);
    setResultado(null);
  };

  return (
    <div className="app-container">
      <div className={grabando ? 'input-container' : 'desaparecer input-container'}>
        <h2>Aquí debes introducir el QR</h2>
        <label className="file-label">
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>

      <div className={grabando ? 'input-container' : 'desaparecer input-container'}>
        <h2>Abre la cámara trasera</h2>
        <QrReader
          delay={100}
          style={{ height: 240, width: 320, maxWidth: '100%' }}
          onError={(err) => console.error(err)}
          onScan={handleCameraScan}
        />
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
