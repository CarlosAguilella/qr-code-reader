import React, { useState, useRef } from "react";

function UploadImage() {
    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        event.preventDefault();
        setFile(event.target.files[0]);
        let imageFile = event.target.files[0];
        if (imageFile) {
            const localImageUrl = URL.createObjectURL(imageFile);
            setImageSrc(localImageUrl);
        }
    };

    return (
        <>
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
        </>
    );
}

export default UploadImage;