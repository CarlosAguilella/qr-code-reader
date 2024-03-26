import React from "react";
import { Grid, InputBase, Checkbox, Button } from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const MYIMAGE = "imagen.png";

// Componente que recoge los datos de la entrada
// Deben ser introducidos por el usuario
const FormTicketData = ({
    preview,
    setPreview,
    visible,
    setVisible,
    smallDesc,
    setSmallDesc,
    largeDesc,
    setLargeDesc,
    unlimited,
    setUnlimited,
    ticketNumber,
    setTicketNumber,
    free,
    setFree,
    ticketPrice,
    setTicketPrice,
    exclusive,
    setExclusive,
    startDate,
    handleStartingDate,
    endingDate,
    handleEndingDate,
    image,
    handleUploadImage
}) => {

    return (
        <div className="form-ticket">
            <div className="flex-center">
                <h1 className="form-title">ENTRADA</h1>
            </div >
            <div className="flex-end">
                <Button className="form-button" onClick={() => setPreview(!preview)}>
                    Previsualizar
                </Button>
                <Button className="form-button-checkbox" onClick={() => setVisible(!visible)}>
                    <Checkbox
                        style={{ marginTop: '-0.1em' }}
                        checked={visible}
                        size="small"
                        sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                    />
                    Producto visible
                </Button>
            </div>
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
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={10}>
                        <div className="form-desc-small">
                            <div className="flex-start">
                                <InputBase
                                    onChange={(e) => setSmallDesc(e.target.value)}
                                    className="form-input"
                                    variant="outlined"
                                    fullWidth
                                    value={smallDesc}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2}>
                        <div className="form-desc-title">
                            <h4>Descripción larga</h4>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={10}>
                        <div className="form-desc-large">
                            <div className="flex-start">
                                <InputBase
                                    onChange={(e) => setLargeDesc(e.target.value)}
                                    className="form-input"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    value={largeDesc}
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
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={10}>
                        <div className="form-desc-small">
                            <div className="flex-start">
                                <InputBase
                                    onChange={(e) => setSmallDesc(e.target.value)}
                                    className="form-input"
                                    variant="outlined"
                                    fullWidth
                                    value={smallDesc}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2}>
                        <div className="form-desc-title">
                            <h4>Descripció llarga</h4>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={10}>
                        <div className="form-desc-large">
                            <div className="flex-start">
                                <InputBase
                                    onChange={(e) => setLargeDesc(e.target.value)}
                                    className="form-input"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    value={largeDesc}
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="form-data">
                <div className="ticket-data">
                    <Grid container>
                        <Grid item xs={5} sm={3} lg={2}>
                            <h4>N.Entradas disponibles</h4>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                            {unlimited === true ? (
                                <div className="form-info">Ilimitadas</div>
                            ) : (
                                <div className="form-info">
                                    <InputBase
                                        onChange={(e) => setTicketNumber(e.target.value)}
                                        className="form-input"
                                        variant="outlined"
                                        fullWidth
                                        value={ticketNumber}
                                        style={{ paddingLeft: '1.7em', paddingTop: '0.4em' }}
                                    />
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={5} sm={8} lg={9}>
                            <Button className="form-data-checkbox" onClick={() => setUnlimited(!unlimited)}>
                                <Checkbox
                                    checked={unlimited}
                                    style={{ marginTop: '-0.1em' }}
                                    size="small"
                                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                />
                                Ilimitadas
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <div className="ticket-data">
                    <Grid container>
                        <Grid item xs={5} sm={3} lg={2}>
                            <h4>Precio (IVA incluido)</h4>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                            {free === true ? (
                                <div className="form-info">Gratuito</div>
                            ) : (
                                <div className="form-info">
                                    <InputBase
                                        onChange={(e) => setTicketPrice(e.target.value)}
                                        className="form-input"
                                        variant="outlined"
                                        fullWidth
                                        value={ticketPrice}
                                        style={{ paddingLeft: '2em', paddingTop: '0.4em' }}
                                    />
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={5} sm={8} lg={9}>
                            <Button className="form-data-checkbox" onClick={() => setFree(!free)}>
                                <Checkbox
                                    style={{ marginTop: '-0.1em' }}
                                    checked={free}
                                    size="small"
                                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                />
                                Gratuito
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <div className="ticket-data">
                    <Grid container>
                        <Grid item xs={5} sm={3} lg={2}>
                            <h4>Exclusivo para soci@s</h4>
                        </Grid>
                        <Grid item xs={3} sm={1}>
                            <Button className="form-data-checkbox" onClick={() => setExclusive(!exclusive)}>
                                <Checkbox
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<RadioButtonCheckedIcon />}
                                    checked={exclusive === true ? true : false}
                                    shape='round'
                                    size="small"
                                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                />
                                Si
                            </Button>
                        </Grid>
                        <Grid item xs={4} sm={8} lg={9}>
                            <Button className="form-data-checkbox" onClick={() => setExclusive(!exclusive)}>
                                <Checkbox
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<RadioButtonCheckedIcon />}
                                    checked={exclusive === false ? true : false}
                                    size="small"
                                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                                />
                                No
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <div className="ticket-data">
                    <Grid container>
                        <Grid item xs={4} sm={5} md={4} lg={2}>
                            <div className="flex-start">
                                <h4>Fecha inicio</h4>
                                <h6 className="form-subtitle-data">&nbsp;(cuando podrá comenzar a usarse las entradas)</h6>
                            </div>
                        </Grid>
                        <Grid item xs={8} sm={7} md={8} lg={10}>
                            <input
                                onChange={handleStartingDate}
                                type="date"
                                value={startDate}
                                className="form-button-date"
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="ticket-data">
                    <Grid container>
                        <Grid item xs={4} sm={5} md={4} lg={2}>
                            <div className="flex-start">
                                <h4>Fecha fin</h4>
                                <h6 className="form-subtitle-data">&nbsp;(cuando expirará las entradas)</h6>
                            </div>
                        </Grid>
                        <Grid item xs={8} sm={7} md={8} lg={10}>
                            <input
                                onChange={handleEndingDate}
                                type="date"
                                value={endingDate}
                                className="form-button-date"
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="ticket-data">
                    <Grid container>
                        <Grid item xs={3} sm={1}>
                            <h4>Imagen</h4>
                        </Grid>
                        <Grid item xs={9} sm={11}>
                            {image === null ? (
                                <div className="form-button-image" onClick={handleUploadImage}>
                                    <img src={MYIMAGE} alt="imagen"></img>
                                </div>
                            ) : (
                                <div className="form-image">
                                    <img src={image} alt="imagen"></img>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default FormTicketData;


/* 
    Hay que cambiar donde está ticketPrice y ticketNumber en la vista, ya que queda mal
    El imput de fechas no tiene el mismo estilo que los demás inputs, debe de ser modificado
    Deberia de modificar el popup para que el fondo sea la pantalla anterior y no solo el popup
    Solucionar el problema de las descripciones, ya que en la larga el pading queda mal
    Tambien solucionar de las mismas que no se copie el resultado en ambas descripciones
*/