import React, { useState, useRef } from 'react';
import QRCode from "react-qr-code";
import './App.css';

import CameraQr from './cameraQr';

function App() {
  
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [qrData, setQrData] = useState("");
  const qrCodeRef = useRef();
  const fileInputRef = useRef();
  const errorQr = (err) => { console.error(err); }
  
  const colorFondo = "#ffffff";
  const colorTexto = "#000000";
  const qrSize = 256;

  

  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
    let imageFile = event.target.files[0];
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      setImageSrc(localImageUrl);
    }
  };



  const downloadQRCode = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const qrCodeSvg = qrCodeRef.current.querySelector("svg");

    const svgString = new XMLSerializer().serializeToString(qrCodeSvg);
    const DOMURL = window.URL || window.webkitURL || window;
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = DOMURL.createObjectURL(svgBlob);

    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = qrCodeSvg.getAttribute("width");
      canvas.height = qrCodeSvg.getAttribute("height");
      context.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL("image/png");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qr-code.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = url;
  }

  return (
    <div className='app-container'>
      <CameraQr />

      <div style={{ marginBottom: '2em' }}>
        <h2>Sube una imagen</h2>
        {file && <img src={imageSrc} width="256" />}
        <br />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
        >
          Subir imagen
        </button>
        <br />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(event) => handleFileChange(event)}
          hidden
        />
      </div>

      <div style={{ marginBottom: '2em' }}>
        <h2>Generador de QR</h2>
        <input
          onChange={(e) => {
            setQrData(e.target.value);
          }}
        />
        <div>
          <div ref={qrCodeRef}>
            <QRCode
              className={qrData.length === 0 ? 'desaparecer' : ''}
              value={qrData}
              size={qrSize}
              onError={errorQr}
              bgColor={colorFondo}
              fgColor={colorTexto}
            />
          </div>
        </div>
      </div>

      <div>
        <input
          type='button'
          className={qrData.length === 0 ? 'desaparecer' : ''}
          value="Descargar QR"
          onClick={downloadQRCode}
        />
      </div>
    </div>
  );
}

export default App;
