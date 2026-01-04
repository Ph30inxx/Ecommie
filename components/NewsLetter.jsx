import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-12 shadow-dark-lg animate-fade-in-up">
      <p className="text-sm uppercase tracking-wider gradient-text glow-text font-bold">Special Offer</p>
      <h1 className="md:text-5xl text-3xl font-bold text-white">
        Subscribe now & get 20% off
      </h1>
      <p className="md:text-base text-slate-400 pb-8">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <div className="flex items-stretch max-w-2xl w-full md:h-14 h-12 rounded-xl overflow-hidden shadow-dark-lg border-2 border-slate-700 focus-within:border-cyan-500 focus-within:shadow-glow-cyan transition-all duration-300">
        <input
          className="border-0 outline-none flex-1 px-4 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:ring-0"
          type="text"
          placeholder="Enter your email id"
        />
        <button className="md:px-12 px-8 text-white bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:shadow-glow-cyan transition-all duration-300">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
