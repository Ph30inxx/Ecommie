import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-950 to-black text-slate-300 mt-16 border-t border-slate-800">
      <div className="grid-bg">
        <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-slate-900">
          <div className="w-4/5">
            <Image className="w-28 md:w-32 brightness-0 invert drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]" src={assets.logo} alt="logo" />
            <p className="mt-6 text-sm text-slate-400 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book.
            </p>
          </div>

          <div className="w-1/2 flex items-center justify-start md:justify-center">
            <div>
              <h2 className="text-lg font-bold gradient-text glow-text mb-5">Company</h2>
              <ul className="text-sm space-y-3 text-slate-400">
                <li>
                  <a className="hover:text-cyan-400 transition-colors duration-200 hover:translate-x-1 inline-block" href="#">Home</a>
                </li>
                <li>
                  <a className="hover:text-cyan-400 transition-colors duration-200 hover:translate-x-1 inline-block" href="#">About us</a>
                </li>
                <li>
                  <a className="hover:text-cyan-400 transition-colors duration-200 hover:translate-x-1 inline-block" href="#">Contact us</a>
                </li>
                <li>
                  <a className="hover:text-cyan-400 transition-colors duration-200 hover:translate-x-1 inline-block" href="#">Privacy policy</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-1/2 flex items-start justify-start md:justify-center">
            <div>
              <h2 className="text-lg font-bold gradient-text glow-text mb-5">Get in touch</h2>
              <div className="text-sm space-y-3 text-slate-400">
                <p className="hover:text-cyan-400 transition-colors duration-200">+1-234-567-890</p>
                <p className="hover:text-cyan-400 transition-colors duration-200">contact@greatstack.dev</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="py-5 text-center text-xs md:text-sm bg-black/50 text-slate-500">
        Copyright 2025 © GreatStack.dev All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;