import ScannerQr from "./reader/ScannerQr";
import InputCode from "./input/InputCode";

const ScannerView = () => {
    return (
        <div className="scanner-view">
            {recording ? (
                <>
                    <InputCode />
                </>

            ) : (
                <>
                    {open ? (
                        <>
                            <ScannerQr />
                        </>
                    ) : (
                        <>
                            <ScannerQr />
                            <InputCode />
                        </>
                    )}

                </>
            )}
        </div>
    );
}

export default ScannerView;