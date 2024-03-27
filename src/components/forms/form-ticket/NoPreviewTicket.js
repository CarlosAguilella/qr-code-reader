import React from "react";
import { Dialog, Button } from "@mui/material";

const MYIMAGE = "novisible.png";

// Componente que muestra un mensaje de que el producto no es visible, depende de si se permite la vista previa
const NoPreviewTicket = ({ preview, setPreview }) => {
    return (
        <Dialog open={preview} onClose={() => setPreview(!preview)}>
            <div className="form-dialog">
                <div className="preview-container">
                    <div className="preview-title">
                        <h1>Contenido no visible</h1>
                    </div>
                </div>
                <div className="flex-center">
                    <div className="preview-image">
                        <img src={MYIMAGE} alt="No visible" />
                    </div>
                </div>
                <div className="flex-end">
                    <div className="form-button">
                        <Button onClick={() => setPreview(!preview)}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default NoPreviewTicket;
