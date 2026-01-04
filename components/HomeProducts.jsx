import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {

  const { products, router } = useAppContext()

  return (
    <div className="flex flex-col items-center pt-14 animate-fade-in-up">
      <div className="w-full text-center mb-2">
        <p className="text-sm uppercase tracking-wider gradient-text glow-text font-bold mb-1">Trending Now</p>
        <p className="text-3xl md:text-4xl font-bold text-white">Popular Products</p>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mt-3 shadow-glow-cyan"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-10 pb-14 w-full">
        {products.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
      <button onClick={() => { router.push('/all-products') }} className="btn-secondary hover:shadow-glow-cyan">
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
