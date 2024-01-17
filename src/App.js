import React, { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';
import './App.css';

function App() {
  const [resultado, setResultado] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const videoRef = useRef(null);
  const [grabando, setGrabando] = useState(true);
  const [videoEnDirecto, setVideoEnDirecto] = useState(null);

  const handleVideoEnDirecto = (enDirecto) => {
    videoRef.current.srcObject = enDirecto;
    setVideoEnDirecto(enDirecto);
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
          const contexto = canvas.getContexto('2d');
          contexto.drawImage(imageData, 0, 0, imageData.width, imageData.height);
          const imageDataArray = contexto.getImageData(0, 0, imageData.width, imageData.height);
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

  useEffect(() => {
    if (grabando) {
      const grabar = async () => {
        try {
          const enDirecto = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          handleVideoEnDirecto(enDirecto);
        } catch (error) {
          console.error('No se pudo acceder a la cámara:', error);
        }
      };
      grabar();
    }
  }, [grabando]);

  const handleCameraScan = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const contexto = canvas.getContexto('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataArray = contexto.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageDataArray.data, canvas.width, canvas.height);

    videoEnDirecto.getTracks().forEach((track) => track.stop());
    setGrabando(false);

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
        <video ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%' }} onClick={handleCameraScan} />
      </div>

      {resultado && (
        <div className="resultado-container">
          <h2>Tu resultado:</h2>
          <p>{resultado}</p>
        </div>
      )}
    </div>
  );
}

export default App;
