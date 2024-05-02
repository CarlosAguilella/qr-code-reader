import React from "react";
import { Grid } from "@mui/material";
import "./compraProducto.css";

const MYIMAGE = "AjuntamentDeLesAlqueries.png";
const MYIMAGE2 = "personasPiscina.png";
const MYIMAGE3 = "qr1234.png";

const CompraProducto = () => {
    return (
        <div className="compra-producto">
            <Grid container>
                <Grid item xs={12}>
                    <div className="flex-start">
                        <div>
                            <img src={MYIMAGE} className="logo" />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="flex-center">
                        <p className="compra-title"><strong>Entrada diaria piscina adulto</strong></p>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="flex-start">
                        <p className="descripcion-corta">
                            <img src={MYIMAGE2} className="image" />
                            Entrada válida para el acceso durante un día (mayores de 13años)
                            <br />
                            <br />
                            Ubicación: Piscina Municipal de Les Alqueries, Via Augusta, 60.
                            <br />
                            Horario: De lunes a viernes de 10.30h a 14:00h. Sábados y domingos de 11:00h a 20:00h.
                            <br />
                            La entrada brinda acceso completo durante todo el día.
                            <br />
                            Tras utilizar la entrada, si se necesita salir y regresar en el mismo día, se puede solicitar una pulsera
                            de reacceso en el mostrador. Esta pulsera te permitirá reingresar durante el resto de la jornada.
                            <br />
                            La entrada no asegura en ningún caso la entrada a la piscina, si el aforo está completo tendrá que esperar en cola, sin ninguna
                            preferencia respecto a los usuarios que hayan llegado antes.
                            <br />
                            Se podrá solicitar la veracidad de todos los datos, por lo que en caso de falsear los mismos quedará bloqueado el acceso al
                            recinto.
                            <br />
                            Normativa general de uso piscina municipal:
                            <br />
                            - Menores de 12 años: han de ir obligatoriamente acompañados de un adulto, los de 13 años podrán ir solos a la piscina con
                            una autorización de la madre, padre o tutor legal. Por cada adulto se permite un máximo de 4 menores a su cargo.
                            <br />
                            - Se debe seguir en todo momento las indicaciones del personal técnico y de los socorristas.
                            <br />
                            - Respetar las normas de seguridad de las instalaciones.
                            <br />
                            - Queda prohibido la entrada de animales.
                            <br />
                            - No se permite la entrada de comida ni bebidas alcohólicas de alta graduación
                            <br />
                            - No se permite la entrada de vidrio.
                            <br />
                            - Obligatorio usar ropa de baño y chanclas.
                            <br />
                            - En la zona de playa no se podrá circular con calzado de calle.
                            <br />
                            - No se permite fumar.
                            <br />
                            - Es obligatorio ducharse antes del baño.
                            <br />
                            - No está permitida la entrada de mesas, sillas o sombrillas, a excepción de causas justiﬁcadas.
                            <br />
                            - Los bebes que lleven pañal será obligatorio el uso de pañal de agua para evitar la contaminación del agua por deposiciones.
                            <br />
                            - El resto de normas de uso de la instalación estarán a disposición del público.
                        </p>
                    </div>
                    <div className="flex-center">
                        <Grid container>
                            <Grid item xs={6}>
                                <div>
                                    <p className="compra-subtitle1"><strong>Comprado por</strong></p>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <p className="compra-subtitle2"><strong>Dirigido a</strong></p>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="compra-data1">
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <p className="compra-info1">Nombre</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info2">Laura</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info1">Apellidos</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info2">García Pérez</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info1">NIF/NIE</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info2">16254901V</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info1">ID </p>
                                            <p className="compra-info-desc">(Les Alqueries en forma)</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info2">U8PKFX8L2WKR3</p>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="compra-data2">
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <p className="compra-info1">Nombre</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info2">Marcos</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info1">Apellidos</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info2">Gómez García</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info1">NIF/NIE</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info2">56879614M</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info1">Parentesco</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info2">Hijo</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info1">ID </p>
                                            <p className="compra-info-desc">(Les Alqueries en forma)</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info2">-</p>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <p className="compra-subtitle3"><strong>Información de la compra</strong></p>
                                </div>
                            </Grid>
                            <Grid item xs={9}>
                                <div className="compra-data3">
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <p className="compra-info1">Fecha de compra</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info2">30/04/2024</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info1">Descripción</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info2">Entrada diaria piscina adulto</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info1">Método de pago</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info2">Tarjeta de crédito</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info1">Precio</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p className="compra-info2">2,60€</p>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>
                                    <img src={MYIMAGE3} className="image-qr" />
                                    <p className="compra-info3">P8PKFX8L2WKR3</p>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <p className="compra-subtitle4"><strong>Condicionado del producto</strong></p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default CompraProducto;