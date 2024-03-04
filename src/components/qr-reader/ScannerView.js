import ScannerQr from "./reader/ScannerQr";
import InputCode from "./input/InputCode";
import { useState } from "react";

const ScannerView = () => {
    // Utils
    const [typeView, setTypeView] = useState('both');

    return (
        <div className="scanner-view">
            {typeView === 'form' ? (
                <>
                    <InputCode setTypeView={setTypeView} />
                </>

            ) : (
                <>
                    {typeView === 'scan' ? (
                        <>
                            <ScannerQr setTypeView={setTypeView} />
                        </>
                    ) : (
                        <>
                            <ScannerQr setTypeView={setTypeView} />
                            <InputCode setTypeView={setTypeView} />
                        </>
                    )}

                </>
            )}
        </div>
    );
}

export default ScannerView;