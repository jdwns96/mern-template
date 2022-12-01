import { ArrowBackIos, ArrowBackIosNew, ArrowForwardIos, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import cn from "classnames";

interface CarouselProps {
  images: string[]; // 이미지들
}

export default function Carousel(props: CarouselProps) {
  const { images } = props;

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<null | HTMLDivElement>(null);

  const onBack = () => {
    if (currentSlide === 0) {
      setCurrentSlide(images.length - 1);
      return null;
    }
    setCurrentSlide((p) => p - 1);
  };
  const onForward = () => {
    if (currentSlide === images.length - 1) {
      setCurrentSlide(0);
      return null;
    }
    setCurrentSlide((p) => p + 1);
  };

  useEffect(() => {
    const slide = slideRef.current;
    if (slide) {
      slide.style.transition = "all 0.3s ease-in-out";
      slide.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-all" ref={slideRef}>
        {/* component */}
        {images.map((image, index) => (
          <div className="flex-none relative w-full h-full bg-black pb-[100%] overflow-hidden" key={index}>
            <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
              <img src={image} alt="post" className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
        {/* component */}
      </div>
      {/* left */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 rounded-full cursor-pointer m-2  bg-choco-gold-300" onClick={onBack}>
        <span className="text-white ">
          <KeyboardArrowLeft style={{ width: 30, height: 30 }} />
        </span>
      </div>
      {/* right */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 rounded-full cursor-pointer m-2  bg-choco-gold-300" onClick={onForward}>
        <span className="text-white ">
          <KeyboardArrowRight style={{ width: 30, height: 30 }} />
        </span>
      </div>
      {/* bottom */}
      <div className="absolute bottom-1 left-0 right-0">
        <ul className="flex justify-center items-center w-full">
          {images.map((_, index) => (
            <li
              className={cn("m-0.5 w-3 h-3 rounded-full cursor-pointer", index === currentSlide && "bg-choco-bronze-100", index !== currentSlide && "bg-gray-300")}
              key={index}
              onClick={() => setCurrentSlide(index)}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
