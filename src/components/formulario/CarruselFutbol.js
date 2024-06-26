import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carrusel.css";

const CarruselFutbol = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
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
          <img src={'./campo_futbol1.jpg'} alt="Campo de fútbol1" className="carrusel-img" />
        </div>
        <div>
          <img src={'./campo_futbol2.jpg'} alt="Campo de fútbol2" className="carrusel-img" />
        </div>
        <div>
          <img src={'./campo_futbol3.jpg'} alt="Campo de fútbol3" className="carrusel-img" />
        </div>
        <div>
          <img src={'./campo_futbol4.jpg'} alt="Campo de fútbol4" className="carrusel-img" />
        </div>
      </Slider>
    </div>
  );
}

export default CarruselFutbol;
