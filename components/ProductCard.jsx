import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, router } = useAppContext()

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer card-dark card-glow p-3 group"
        >
            <div className="cursor-pointer group relative bg-slate-800 rounded-xl w-full h-52 flex items-center justify-center overflow-hidden border border-slate-700 group-hover:border-cyan-500/50 transition-all duration-300">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-110 transition-transform duration-500 object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />
                <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 bg-slate-800 p-2 rounded-full border border-slate-700 hover:scale-110 transition-all duration-200 hover:shadow-glow-cyan hover:border-cyan-500/50"
                >
                    <Image
                        className="h-3 w-3 brightness-200"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            <p className="md:text-base font-semibold pt-2 w-full truncate text-slate-100">{product.name}</p>
            <p className="w-full text-xs text-slate-500 max-sm:hidden truncate">{product.description}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs font-medium text-slate-400">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(4)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-lg font-bold gradient-text">{currency}{product.offerPrice}</p>
                <button
                    onClick={(e) => e.stopPropagation()}
                    className="max-sm:hidden px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-semibold hover:shadow-neon-cyan transition-all duration-300 hover:scale-105"
                >
                    Buy now
                </button>
            </div>
        </div>
    )
}

export default ProductCard