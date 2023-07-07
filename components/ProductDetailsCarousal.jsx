import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductDetailsCarousal = ({ images }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-0 ">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.map((i) => {
          return <img src={i.attributes.url} alt={i.attributes.name} key={i.id} />;
        })}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousal;
