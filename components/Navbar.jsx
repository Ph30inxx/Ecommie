"use client"
import React from "react";
import { BagIcon, CartIcon, HomeIcon , assets } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { UserButton, useClerk } from "@clerk/nextjs";

const Navbar = () => {

  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk()

  return (
    <nav className="glass-dark sticky top-0 z-50 shadow-dark-xl border-b border-slate-800 flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 text-slate-100 animate-fade-in-down">
      <Image
        className="cursor-pointer w-28 md:w-32 hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="relative text-slate-300 hover:text-cyan-400 transition-colors duration-200 font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 hover:after:w-full after:transition-all after:duration-300">
          Home
        </Link>
        <Link href="/all-products" className="relative text-slate-300 hover:text-cyan-400 transition-colors duration-200 font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 hover:after:w-full after:transition-all after:duration-300">
          Shop
        </Link>
        <Link href="/" className="relative text-slate-300 hover:text-cyan-400 transition-colors duration-200 font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 hover:after:w-full after:transition-all after:duration-300">
          About Us
        </Link>
        <Link href="/" className="relative text-slate-300 hover:text-cyan-400 transition-colors duration-200 font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 hover:after:w-full after:transition-all after:duration-300">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-full hover:shadow-neon-cyan transition-all duration-300 hover:scale-105 font-semibold">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform duration-200 brightness-200" src={assets.search_icon} alt="search icon" />
        {user
        ? <>
        <UserButton >
          <UserButton.MenuItems>
            <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={()=> router.push('/cart')}></UserButton.Action>
          </UserButton.MenuItems>

          <UserButton.MenuItems>
            <UserButton.Action label="My Orders" labelIcon={<CartIcon/>} onClick={()=> router.push('/my-orders')}></UserButton.Action>
          </UserButton.MenuItems>
        </UserButton>

        </>
        : <button onClick={openSignIn} className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors duration-200 font-medium">
          <Image src={assets.user_icon} alt="user icon" className="brightness-200" />
          Account
        </button>}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1.5 rounded-full hover:shadow-neon-cyan transition-all duration-300 hover:scale-105 font-semibold">Seller Dashboard</button>}
        {user
        ? <>
        <UserButton >
          <UserButton.MenuItems>
            <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={()=> router.push('/cart')}></UserButton.Action>
          </UserButton.MenuItems>

          <UserButton.MenuItems>
            <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={()=> router.push('/home')}></UserButton.Action>
          </UserButton.MenuItems>

          <UserButton.MenuItems>
            <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={()=> router.push('/my-orders')}></UserButton.Action>
          </UserButton.MenuItems>
        </UserButton>

        </>
        : <button onClick={openSignIn} className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors duration-200 font-medium">
          <Image src={assets.user_icon} alt="user icon" className="brightness-200" />
          Account
        </button>}
      </div>
    </nav>
  );
};

export default Navbar;