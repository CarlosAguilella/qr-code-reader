import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import jsQR from 'jsqr';
import './App.css';

function App() {
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
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

      <div className="input-container">
        <h2>Aquí debes introducir el QR</h2>
        <label className="file-label">
          <input type="file" accept=".png" onChange={handleFileChange} />
        </label>
      </div>

      <div className="input-container">
        <h2>Abre la camara</h2>
        <label className="file-label">
          <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
        </label>
      </div>

      {result && (
        <div className="result-container">
          <h2>Su resultado:</h2>
          <p>{result}</p>
          <h2>Y su QR:</h2>
          <QRCode value={result} />
        </div>
      )}
    </div>
  );
}

export default App;
