// Importa las librerías y componentes necesarios
import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react'; // Componente para mostrar códigos QR
import jsQR from 'jsqr'; // Librería para decodificar códigos QR
import './App.css'; // Estilos de la aplicación

function App() {
  // Estados para manejar el resultado del escaneo, la información del archivo seleccionado y la referencia al elemento de video
  const [resultado, setResultado] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const videoRef = useRef(null);

  // Función para manejar la transmisión en vivo de la cámara
  const handleVideoEnDirecto = (enDirecto) => {
    videoRef.current.srcObject = enDirecto;
  };

  // Función para manejar el cambio de archivo seleccionado
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArchivo(`Se ha seleccionado el archivo ${file.name} de tipo ${file.type} y tamaño ${file.size} bytes.`);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = new Image();
        imageData.onload = () => {
          // Crear un lienzo, dibujar la imagen y decodificar el código QR
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

  // Efecto secundario para inicializar y limpiar la transmisión en vivo de la cámara
  useEffect(() => {
    const grabar = async () => {
      try {
        const enDirecto = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        handleVideoEnDirecto(enDirecto);
      } catch (error) {
        console.error('No se pudo acceder a la cámara:', error);
      }
    };
    grabar();
  }, []);

  // Función para manejar el escaneo de la cámara
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

      {/* Sección para cargar archivos */}
      <div className="input-container">
        <h2>Aquí debes introducir el QR</h2>
        <label className="file-label">
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>

      {/* Sección para la transmisión en vivo de la cámara */}
      <div className="input-container">
        <h2>Abre la cámara trasera</h2>
        <video ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%' }} onClick={handleCameraScan} />
      </div>

      {/* Sección para mostrar el resultado y el código QR */}

      {resultado && (
        <div className="resultado-container">
          <h2>Tu resultado:</h2>
          <p>{resultado}</p>
          {/* <h2>Y tu QR:</h2>
          <QRCode value={resultado} /> */}
        </div>
      )}
    </div>
  );
}

export default App;
