import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const QrCodeReader = () => {
  const [qrData, setQrData] = useState('');

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>{qrData}</p>
    </div>
  );
};

export default QrCodeReader;
