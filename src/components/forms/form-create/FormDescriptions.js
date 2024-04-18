import React from 'react';
import { Grid, InputBase } from '@mui/material';

import './formCreate.css';

const FormDescriptions = ({ formInfo, handleChangeInput }) => {
    return (
        <div className="form-event">
            <div className="form-es">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} lg={2}>
                        <div className="form-es-title">
                            <h2>ES</h2>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={10}>
                        <div className="form-line">
                            &nbsp;
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2}>
                        <div className="form-desc-title">
                            <h4>Descripción corta</h4>
                            {formInfo.smallDescEs.length > 50 ? (
                                <h6 className="form-subtitle-data">(máximo de 50 carácteres)</h6>
                            ) : (
                                <h6 style={{ display: 'none' }}>()</h6>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={10}>
                        <div className="form-desc-small">
                            <div className="flex-start">
                                <InputBase
                                    onChange={handleChangeInput}
                                    className="form-input"
                                    variant="outlined"
                                    fullWidth
                                    value={formInfo.smallDescEs}
                                    required
                                    name="smallDescEs"
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2}>
                        <div className="form-desc-title">
                            <h4>Descripción larga</h4>
                            {formInfo.largeDescEs.length > 500 ? (
                                <h6 className="form-subtitle-data">(máximo de 500 carácteres)</h6>
                            ) : (
                                <h6 style={{ display: 'none' }}>()</h6>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={10}>
                        <div className="form-desc-large">
                            <div className="flex-start">
                                <InputBase
                                    onChange={handleChangeInput}
                                    className="form-input"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    value={formInfo.largeDescEs}
                                    required
                                    name="largeDescEs"
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="form-val">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} lg={2}>
                        <div className="form-val-title">
                            <h2>VAL</h2>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={10}>
                        <div className="form-line">
                            &nbsp;
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2}>
                        <div className="form-desc-title">
                            <h4>Descripció curta</h4>
                            {formInfo.smallDescVal.length > 50 ? (
                                <h6 className="form-subtitle-data">(màxim de 50 caràcters)</h6>
                            ) : (
                                <h6 style={{ display: 'none' }}>()</h6>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={10}>
                        <div className="form-desc-small">
                            <div className="flex-start">
                                <InputBase
                                    onChange={handleChangeInput}
                                    className="form-input"
                                    variant="outlined"
                                    fullWidth
                                    value={formInfo.smallDescVal}
                                    required
                                    name="smallDescVal"
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2}>
                        <div className="form-desc-title">
                            <h4>Descripció llarga</h4>
                            {formInfo.largeDescVal.length > 500 ? (
                                <h6 className="form-subtitle-data">(màxim de 500 caràcters)</h6>
                            ) : (
                                <h6 style={{ display: 'none' }}>()</h6>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={10}>
                        <div className="form-desc-large">
                            <div className="flex-start">
                                <InputBase
                                    onChange={handleChangeInput}
                                    className="form-input"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    value={formInfo.largeDescVal}
                                    required
                                    name="largeDescVal"
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default FormDescriptions;