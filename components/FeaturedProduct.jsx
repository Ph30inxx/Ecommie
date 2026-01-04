import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-14 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl py-16 animate-fade-in-up">
      <div className="flex flex-col items-center">
        <p className="text-4xl font-bold text-white">Featured Products</p>
        <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-3 shadow-glow-cyan"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group rounded-2xl overflow-hidden shadow-dark-xl hover:shadow-neon-cyan border border-slate-800 hover:border-cyan-500/50 transition-all duration-500">
            <Image
              src={image}
              alt={title}
              className="group-hover:scale-110 transition-transform duration-500 w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-slate-900/90 transition-all duration-500"></div>
            <div className="group-hover:-translate-y-6 transition-all duration-500 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-semibold text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60 text-slate-300">
                {description}
              </p>
              <button className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg hover:scale-105 hover:shadow-glow-cyan transition-all duration-300 font-semibold">
                Buy now <Image className="h-3 w-3" src={assets.redirect_icon} alt="Redirect Icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
