import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carrusel.css";

const CarruselPiscina = () => {
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
          <img src={'./PISCINAMUNICIPAL.jpg'} alt="PISCINA" className="carrusel-img" />
        </div>
        <div>
          <img src={'./PISCINAMUNICIPAL.jpg'} alt="PISCINA" className="carrusel-img" />
        </div>
        <div>
          <img src={'./PISCINAMUNICIPAL.jpg'} alt="PISCINA" className="carrusel-img" />
        </div>
        <div>
          <img src={'./PISCINAMUNICIPAL.jpg'} alt="PISCINA" className="carrusel-img" />
        </div>
      </Slider>
    </div>
  );
}

export default CarruselPiscina;
