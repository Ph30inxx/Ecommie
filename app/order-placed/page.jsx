'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect } from 'react'

const OrderPlaced = () => {

  const { router } = useAppContext()

  useEffect(() => {
    setTimeout(() => {
      router.push('/my-orders')
    }, 5000)
  }, [])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5 bg-gradient-to-br from-slate-900 via-slate-950 to-black grid-bg animate-fade-in'>
      <div className="flex justify-center items-center relative">
        <Image className="absolute p-5 animate-scale-in brightness-200" src={assets.checkmark} alt='' />
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-cyan-500 border-r-blue-400 border-b-cyan-500 border-l-transparent shadow-glow-cyan"></div>
      </div>
      <div className="text-center text-3xl md:text-4xl font-bold text-white animate-fade-in-up">Order Placed Successfully</div>
      <p className="text-slate-400 text-center animate-fade-in-up">Redirecting to your orders...</p>
    </div>
  )
}

export default OrderPlaced