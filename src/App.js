import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import jsQR from 'jsqr';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [log, setLog] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLog(`Se ha seleccionado el archivo ${file.name} de tipo ${file.type} y tamaño ${file.size} bytes.`);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
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
            setResult(code.data);
          } else {
            setResult("No se encontró ningún código QR en la imagen.");
          }
        };
        imageData.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
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
        <label className="file-label">
          <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
        </label>
      </div>

      {/* 

      <div className="input-container">
        <h2>Abre la cámara frontal</h2>
        <label className="file-label">
          <input type="file" accept="image/*" capture="user" onChange={handleFileChange} />
        </label>
      </div> 
      
      */}

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
