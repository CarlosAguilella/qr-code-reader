import ScannerQr from "./reader/ScannerQr";
import InputCode from "./input/InputCode";
import { useState } from "react";
import { Grid } from "@mui/material";

const ScannerView = () => {
    // Utils
    const [typeView, setTypeView] = useState('both');

    return (
        <div className="scanner-view">
            <Grid container alignItems={'center'} spacing={2}>
                {typeView === 'both' ? (
                    <>
                        <Grid item xs={12} sm={6}>
                            <ScannerQr setTypeView={setTypeView} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputCode setTypeView={setTypeView} />
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={12} sm={(typeView === 'scan' ? 12 : 6)}>
                            {(typeView === 'scan') && <ScannerQr setTypeView={setTypeView} />}
                        </Grid>
                        <Grid item xs={12} sm={(typeView === 'form' ? 12 : 6)}>
                            {(typeView === 'form') && <InputCode setTypeView={setTypeView} />}
                        </Grid>
                    </>
                )}
            </Grid>
        </div >
    );
}

export default ScannerView;
