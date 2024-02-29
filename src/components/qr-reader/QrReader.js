import React from "react";
import CameraQr from "./reader/CameraQr";
import InputCode from "./input/InputCode";

const QrReader = () => {
    return (
        <div>
            <CameraQr />
            <InputCode />
        </div>
    );
}

export default QrReader;