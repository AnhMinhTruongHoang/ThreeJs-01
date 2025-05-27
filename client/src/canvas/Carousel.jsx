import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Shirt from "./Shirt";
import Shirt2 from "./Shirt_2";
import Shirt3 from "./Shirt_3";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ShirtCarousel = ({ shirtList }) => {
  return (
    <Carousel responsive={responsive}>
      {shirtList.map((shirt) => (
        <div key={shirt.id} style={{ padding: 10 }}>
          <img src={shirt.image} alt={shirt.name} style={{ width: "100%" }} />
          <p>{shirt.name}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default ShirtCarousel;
