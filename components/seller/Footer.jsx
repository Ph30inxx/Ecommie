import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-10 border-t border-slate-800 bg-slate-900/50">
      <div className="flex items-center gap-4">
        {/* <Image className="hidden md:block brightness-0 invert drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]" src={assets.logo} alt="logo" /> */}
        <div
          className="cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] text-2xl md:text-3xl font-bold text-cyan-400"
          onClick={() => router.push('/')}
        >
          Ecommie
        </div>
        <div className="hidden md:block h-7 w-px bg-slate-700"></div>
        <p className="py-4 text-center text-xs md:text-sm text-slate-500">
          Copyright 2025 © Dracula.dev All Right Reserved.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a href="#" className="hover:scale-110 transition-transform duration-200">
          <Image src={assets.facebook_icon} alt="facebook_icon" className="brightness-200" />
        </a>
        <a href="#" className="hover:scale-110 transition-transform duration-200">
          <Image src={assets.twitter_icon} alt="twitter_icon" className="brightness-200" />
        </a>
        <a href="#" className="hover:scale-110 transition-transform duration-200">
          <Image src={assets.instagram_icon} alt="instagram_icon" className="brightness-200" />
        </a>
      </div>
    </div>
  );
};

export default Footer;