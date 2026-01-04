import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full animate-fade-in-up">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 py-8 md:px-14 px-5 mt-6 rounded-2xl min-w-full shadow-dark-xl overflow-hidden grid-bg"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-sm font-bold uppercase tracking-wide gradient-text glow-text pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-bold text-white">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 gap-2">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-neon-cyan transition-all duration-300 hover:scale-105">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200">
                  {slide.buttonText2}
                  <Image className="group-hover:translate-x-1 transition-transform duration-200 brightness-200" src={assets.arrow_icon} alt="arrow_icon" />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 w-48 float-animation hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index ? "bg-cyan-500 w-8 shadow-glow-cyan hover:scale-110" : "bg-slate-600 hover:bg-cyan-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
