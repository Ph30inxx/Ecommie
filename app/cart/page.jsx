'use client'
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import { useCart } from "@/lib/react-query/hooks/useCart";

const Cart = () => {

  const { products, router, cartItems, getCartCount } = useAppContext();

  // Use React Query hook for cart operations
  const { addToCart, updateCartQuantity } = useCart();

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20 page-transition min-h-screen">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-6">
            <p className="text-2xl md:text-3xl text-slate-200">
              Your <span className="font-bold gradient-text">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-slate-400">{getCartCount()} Items</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left bg-gradient-to-r from-slate-800 to-slate-900 border-b-2 border-cyan-500/30">
                <tr>
                  <th className="text-nowrap pb-4 pt-4 md:px-4 px-1 text-slate-200 font-semibold">
                    Product Details
                  </th>
                  <th className="pb-4 pt-4 md:px-4 px-1 text-slate-200 font-semibold">
                    Price
                  </th>
                  <th className="pb-4 pt-4 md:px-4 px-1 text-slate-200 font-semibold">
                    Quantity
                  </th>
                  <th className="pb-4 pt-4 md:px-4 px-1 text-slate-200 font-semibold">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cartItems).map((itemId) => {
                  const product = products.find(product => product._id === itemId);

                  if (!product || cartItems[itemId] <= 0) return null;

                  return (
                    <tr key={itemId} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors duration-200">
                      <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                        <div>
                          <div className="rounded-lg overflow-hidden bg-slate-800 border border-slate-700 p-2">
                            <Image
                              src={product.image[0]}
                              alt={product.name}
                              className="w-16 h-auto object-cover"
                              width={1280}
                              height={720}
                            />
                          </div>
                          <button
                            className="md:hidden text-xs text-cyan-400 font-medium mt-1 hover:text-cyan-300"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="text-sm hidden md:block">
                          <p className="text-slate-100 font-medium">{product.name}</p>
                          <button
                            className="text-xs text-cyan-400 font-medium mt-1 hover:text-cyan-300 transition-colors duration-200"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-slate-200 font-medium">${product.offerPrice}</td>
                      <td className="py-4 md:px-4 px-1">
                        <div className="flex items-center md:gap-2 gap-1">
                          <button onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)} className="hover:scale-110 transition-transform duration-200">
                            <Image
                              src={assets.decrease_arrow}
                              alt="decrease_arrow"
                              className="w-4 h-4 brightness-200"
                            />
                          </button>
                          <input onChange={e => updateCartQuantity(product._id, Number(e.target.value))} type="number" value={cartItems[itemId]} className="w-8 border border-slate-700 bg-slate-800 text-slate-100 rounded text-center appearance-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 outline-none"></input>
                          <button onClick={() => addToCart(product._id)} className="hover:scale-110 transition-transform duration-200">
                            <Image
                              src={assets.increase_arrow}
                              alt="increase_arrow"
                              className="w-4 h-4 brightness-200"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-slate-100 font-semibold">${(product.offerPrice * cartItems[itemId]).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button onClick={()=> router.push('/all-products')} className="group flex items-center mt-6 gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors duration-200">
            <Image
              className="group-hover:-translate-x-1 transition-transform duration-200 brightness-200 saturate-150"
              src={assets.arrow_right_icon_colored}
              alt="arrow_right_icon_colored"
            />
            Continue Shopping
          </button>
        </div>
        <OrderSummary />
      </div>
    </>
  );
};

export default Cart;
