import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserAddresses } from "@/lib/react-query/hooks/useUserAddresses";
import { useCreateOrder } from "@/lib/react-query/hooks/useOrderMutations";

const OrderSummary = () => {

  const { currency, router, getCartCount, getCartAmount, cartItems, setCartItems } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Use React Query hooks for fetching addresses and creating orders
  const { data: userAddresses = [] } = useUserAddresses();
  const createOrderMutation = useCreateOrder();

  // Auto-select first address when loaded
  useEffect(() => {
    if (userAddresses.length > 0 && !selectedAddress) {
      setSelectedAddress(userAddresses[0]);
    }
  }, [userAddresses, selectedAddress]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = () => {
    if (!selectedAddress) {
      return toast.error('Please select an address');
    }

    let cartItemsArray = Object.keys(cartItems).map((key) => ({
      product: key,
      quantity: cartItems[key]
    }));
    cartItemsArray = cartItemsArray.filter(item => item.quantity > 0);

    if (cartItemsArray.length === 0) {
      return toast.error('Cart is Empty');
    }

    createOrderMutation.mutate({
      address: selectedAddress._id,
      items: cartItemsArray
    }, {
      onSuccess: () => {
        setCartItems({}); // Clear local cart state
      }
    });
  }

  return (
    <div className="w-full md:w-96 card-dark p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
        Order Summary
      </h2>
      <hr className="border-slate-700 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold uppercase text-slate-400 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm rounded-xl border-2 border-slate-700 focus-within:border-cyan-500 transition-all duration-300">
            <button
              className="peer w-full text-left px-4 pr-2 py-3 bg-slate-800 text-slate-200 focus:outline-none rounded-xl"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#22d3ee"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-slate-800 border-2 border-cyan-500/30 rounded-xl shadow-dark-lg mt-1 z-10 py-1.5 overflow-hidden">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-slate-700 hover:text-cyan-400 cursor-pointer transition-colors duration-200 text-slate-200"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city}, {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-center text-cyan-400 font-medium transition-colors duration-200"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold uppercase text-slate-400 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="input-dark flex-grow w-full"
            />
            <button className="btn-secondary text-sm w-full">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-slate-700 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-slate-400 text-sm">Items {getCartCount()}</p>
            <p className="text-slate-100 font-semibold">{currency}{getCartAmount()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-slate-400">Shipping Fee</p>
            <p className="font-semibold text-slate-100">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-slate-400">Tax (2%)</p>
            <p className="font-semibold text-slate-100">{currency}{Math.floor(getCartAmount() * 0.02)}</p>
          </div>
          <div className="flex justify-between text-xl md:text-2xl font-bold border-t border-slate-700 pt-4 mt-4">
            <p className="text-white">Total</p>
            <p className="gradient-text">{currency}{getCartAmount() + Math.floor(getCartAmount() * 0.02)}</p>
          </div>
        </div>
      </div>

      <button onClick={createOrder} className="btn-primary w-full shadow-neon-cyan mt-6" disabled={createOrderMutation.isPending}>
        {createOrderMutation.isPending ? 'PLACING ORDER...' : 'PLACE ORDER'}
      </button>
    </div>
  );
};

export default OrderSummary;