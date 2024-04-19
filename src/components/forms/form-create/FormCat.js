import React from "react";
import { Grid, Button, Checkbox } from "@mui/material";

import "./formCreate.css";

const FormCat = ({ formCreate, handleWinterProgram, handleSummerProgram, handleChildrenProgram, handleAdultsProgram, handlePoolProgram }) => {
    return (





        <div className="form-cat">
            <Grid container alignItems='center'>
                <Grid item xs={12}>
                    <div className="form-cat-title">
                        <h2>CATEGORIZACIÓN</h2>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <h4 className="form-cat-title-info">Duración:</h4>
                </Grid>
                <Grid item xs={6} md={4}>
                    <div className="form-cat-checkbox">
                        <Button className="form-data-checkbox">
                            <Checkbox
                                checked={formCreate.winterProgram}
                                size="small"
                                name="winterProgram"
                                onClick={handleWinterProgram}
                            />
                            <span>Invierno</span>
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={6} md={4}>
                    <div className="form-cat-checkbox">
                        <Button className="form-data-checkbox">
                            <Checkbox
                                checked={formCreate.summerProgram}
                                size="small"
                                name="summerProgram"
                                onClick={handleSummerProgram}
                            />
                            <span>Verano</span>
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <h4 className="form-cat-title-info">Edad:</h4>
                </Grid>
                <Grid item xs={6} md={4}>
                    <div className="form-cat-checkbox">
                        <Button className="form-data-checkbox">
                            <Checkbox
                                checked={formCreate.childrenProgram}
                                size="small"
                                name="childrenProgram"
                                onClick={handleChildrenProgram}
                            />
                            <span>Niñ@s</span>
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={6} md={4}>
                    <div className="form-cat-checkbox">
                        <Button className="form-data-checkbox">
                            <Checkbox
                                checked={formCreate.adultsProgram}
                                size="small"
                                name="adultsProgram"
                                onClick={handleAdultsProgram}
                            />
                            <span>Jóvenes/Adultos</span>
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <h4 className="form-cat-title-info">Otros:</h4>
                </Grid>
                <Grid item xs={6} md={4}>
                    <div className="form-cat-checkbox">
                        <Button className="form-data-checkbox">
                            <Checkbox
                                checked={formCreate.poolProgram}
                                size="small"
                                name="poolProgram"
                                onClick={handlePoolProgram}
                            />
                            <span>Piscina</span>
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default FormCat;