import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';
import jsQR from 'jsqr';
import './App.css';

function App() {
  const [resultado, setResultado] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const videoRef = useRef(null);

  const handleVideoStream = (stream) => {
    videoRef.current.srcObject = stream;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArchivo(`Se ha seleccionado el archivo ${file.name} de tipo ${file.type} y tamaño ${file.size} bytes.`);
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
            setResultado(code.data);
          } else {
            setResultado("No se encontró ningún código QR en la imagen.");
          }
        };
        imageData.src = event.target.resultado;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        handleVideoStream(stream);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    initializeCamera();

    return () => {
      if (videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCameraScan = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataArray = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageDataArray.data, canvas.width, canvas.height);
    if (code) {
      setResultado(code.data);
    } else {
      setResultado("No se encontró ningún código QR en la imagen de la cámara.");
    }
  };

  return (
    <div className="app-container">
      <p>{archivo}</p>

      <div className="input-container">
        <h2>Aquí debes introducir el QR</h2>
        <label className="file-label">
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>

      <div className="input-container">
        <h2>Abre la cámara trasera</h2>
        <video ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%' }} onChange={handleCameraScan} />
      </div>

      {resultado && (
        <div className="resultado-container">
          <h2>Tu resultado:</h2>
          <p>{resultado}</p>
          <h2>Y tu QR:</h2>
          <QRCode value={resultado} />
        </div>
      )}
    </div>
  );
}

export default App;