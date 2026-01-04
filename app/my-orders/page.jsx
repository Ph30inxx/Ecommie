'use client';
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {

    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = await getToken()

            const {data} = await axios.get('/api/order/list', {headers: {Authorization: `Bearer ${token}`}})

            if(data.success){
                setOrders(data.orders.reverse())
                setLoading(false)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen page-transition">
                <div className="space-y-5">
                    <div className="flex flex-col items-center mt-6 mb-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">My Orders</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 shadow-glow-cyan"></div>
                    </div>
                    {loading ? <Loading /> : (<div className="max-w-5xl text-sm animate-fade-in-up">
                        {orders.map((order, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-6 card-dark mb-4">
                                <div className="flex-1 flex gap-5 max-w-80">
                                    <Image
                                        className="max-w-16 max-h-16 object-cover brightness-200"
                                        src={assets.box_icon}
                                        alt="box_icon"
                                    />
                                    <p className="flex flex-col gap-3">
                                        <span className="font-semibold text-base text-slate-100">
                                            {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                        </span>
                                        <span className="text-slate-400">Items : {order.items.length}</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-300">
                                        <span className="font-semibold text-slate-100">{order.address.fullName}</span>
                                        <br />
                                        <span>{order.address.area}</span>
                                        <br />
                                        <span>{`${order.address.city}, ${order.address.state}`}</span>
                                        <br />
                                        <span>{order.address.phoneNumber}</span>
                                    </p>
                                </div>
                                <p className="font-bold text-lg gradient-text my-auto">{currency}{order.amount}</p>
                                <div>
                                    <p className="flex flex-col gap-1 text-slate-300">
                                        <span><span className="font-semibold text-slate-200">Method:</span> COD</span>
                                        <span><span className="font-semibold text-slate-200">Date:</span> {new Date(order.date).toLocaleDateString()}</span>
                                        <span className="inline-flex items-center gap-2">
                                            <span className="font-semibold text-slate-200">Payment:</span>
                                            <span className="text-xs bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded-full font-medium border border-yellow-700">Pending</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;