import ScannerQr from "./reader/ScannerQr";
import InputCode from "./input/InputCode";

const ScannerView = () => {
    return (
        <div className="scanner-view">
            <ScannerQr />
            <InputCode />
        </div>
    );
}

export default ScannerView;

// ScannerView, nombre nuevo
// añadir className a div