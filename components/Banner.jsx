import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 my-16 rounded-2xl overflow-hidden shadow-dark-xl grid-bg animate-fade-in-up">
      <Image
        className="max-w-56 float-animation hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        src={assets.jbl_soundbox_image}
        alt="jbl_soundbox_image"
      />
      <div className="flex flex-col items-center justify-center text-center space-y-3 px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl font-bold max-w-[290px] text-white">
          Level Up Your Gaming Experience
        </h2>
        <p className="max-w-[343px] font-medium text-slate-300">
          From immersive sound to precise controls—everything you need to win
        </p>
        <button className="group flex items-center justify-center gap-1 px-12 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white shadow-neon-cyan hover:scale-110 transition-all duration-300 font-semibold">
          Buy now
          <Image className="group-hover:translate-x-1 transition-transform duration-200" src={assets.arrow_icon_white} alt="arrow_icon_white" />
        </button>
      </div>
      <Image
        className="hidden md:block max-w-80 float-animation hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        src={assets.md_controller_image}
        alt="md_controller_image"
      />
      <Image
        className="md:hidden float-animation"
        src={assets.sm_controller_image}
        alt="sm_controller_image"
      />
    </div>
  );
};

export default Banner;