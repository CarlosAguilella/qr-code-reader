import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carrusel.css";

const CarruselPoli = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="carrusel-container">
      <Slider {...settings}>
        <div className="flex-center">
          <img src={'./polideportivo1.jpg'} alt="Poli1" className="carrusel-img" />
        </div>
        <div>
          <img src={'./polideportivo2.jpg'} alt="Poli2" className="carrusel-img" />
        </div>
        <div>
          <img src={'./polideportivo3.jpg'} alt="Poli3" className="carrusel-img" />
        </div>
        <div>
          <img src={'./polideportivo4.jpg'} alt="Poli4" className="carrusel-img" />
        </div>
      </Slider>
    </div>
  );
}

export default CarruselPoli;
