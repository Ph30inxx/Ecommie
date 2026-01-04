import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='glass-dark shadow-dark-xl border-b border-slate-800 flex items-center px-4 md:px-8 py-3 justify-between'>
      <Image onClick={()=>router.push('/')} className='w-28 lg:w-32 cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]' src={assets.logo} alt="" />
      <button className='btn-primary text-xs sm:text-sm shadow-neon-cyan'>Logout</button>
    </div>
  )
}

export default Navbar