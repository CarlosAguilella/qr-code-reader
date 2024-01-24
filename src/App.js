import React, { useState, useRef } from 'react';
import QrReader from 'react-qr-reader';
import './App.css';

function App() {
  const [resultado, setResultado] = useState(null);
  const [resultadoArchivo, setResultadoArchivo] = useState(null);
  const [grabando, setGrabando] = useState(false);
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const previewStyle = { height: 240, width: 320 };
  const delay = 50;
  const camara = { facingMode: 'environment' };
  
  const fileInputRef = useRef();

  const handleCameraScan = (data) => {
    if (data) {
      setResultado(data);
      setGrabando(false);
    }
  };

  const handleFileChange = (event) => {
    event.preventDefault();

    setFile(event.target.files[0]);

    let imageFile = event.target.files[0];

    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      setImageSrc(localImageUrl);
    }
  };

  const openCamera = () => {
    setGrabando(true);
    setResultado(null);
  };

  return (
    <div>
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
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
        >
          Select Image
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(event) => handleFileChange(event)}
          hidden
        />
        {file && <img src={imageSrc} width="100" />}
      </div>
      {resultado && (
        <div className="resultado-container">
          <h2>Tu resultado:</h2>
          <p>{resultado}</p>
        </div>
      )}
      <button onClick={openCamera} className={grabando ? 'desaparecer input-container' : 'input-container'}>
        Abre la cámara para escanear
      </button>
    </div>
  );
}

export default App;
