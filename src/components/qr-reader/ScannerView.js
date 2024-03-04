import ScannerQr from "./reader/ScannerQr";
import InputCode from "./input/InputCode";
import { useState } from "react";

const ScannerView = () => {
    // Utils
    const [typeView, setTypeView] = useState('both');

    return (
        <div className="scanner-view">
            {
                typeView === 'scan' ? (
                    <>
                        <ScannerQr setTypeView={setTypeView} />
                    </>
                ) : (
                    typeView === 'form' ? (
                        <>
                            <InputCode setTypeView={setTypeView} />
                        </>
                    ) : (
                        <>
                            <ScannerQr setTypeView={setTypeView} />
                            <InputCode setTypeView={setTypeView} />
                        </>
                    )
                )}
        </div>
    );
}

export default ScannerView;