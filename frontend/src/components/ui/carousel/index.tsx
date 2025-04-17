import { Carousel } from "@mantine/carousel";
import { data } from "@/app/character/consts";
import { useState } from "react";
import UiCard from "../card";

const UiCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = data.map((item, index) => (
    <Carousel.Slide key={item.id}>
      <UiCard {...item} />
    </Carousel.Slide>
  ));

  const currentSlideId = data[currentSlide]?.id;

  return (
    <Carousel
      onSlideChange={(index) => setCurrentSlide(index)}
      slideSize={"33%"}
      slidesToScroll={1}
      controlSize={28}
      slideGap={"md"}
      align="start"
      loop
    >
      {slides}
    </Carousel>
  );
};

export default UiCarousel;
