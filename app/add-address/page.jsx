'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAddAddress } from "@/lib/react-query/hooks/useAddressMutations";

const AddAddress = () => {

    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        area: '',
        city: '',
        state: '',
    })

    // Use React Query mutation for adding address
    const addAddressMutation = useAddAddress();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        addAddressMutation.mutate(address);
    }

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between page-transition min-h-screen">
                <form onSubmit={onSubmitHandler} className="w-full">
                    <div className="flex flex-col items-center md:items-start mb-10">
                        <p className="text-2xl md:text-3xl text-slate-200">
                            Add Shipping <span className="font-bold gradient-text">Address</span>
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 shadow-glow-cyan"></div>
                    </div>
                    <div className="space-y-3 max-w-sm mt-10 card-dark p-8">
                        <input
                            className="input-purple w-full"
                            type="text"
                            placeholder="Full name"
                            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                            value={address.fullName}
                        />
                        <input
                            className="input-purple w-full"
                            type="text"
                            placeholder="Phone number"
                            onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                            value={address.phoneNumber}
                        />
                        <input
                            className="input-purple w-full"
                            type="text"
                            placeholder="Pin code"
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                            value={address.pincode}
                        />
                        <textarea
                            className="input-purple w-full resize-none"
                            type="text"
                            rows={4}
                            placeholder="Address (Area and Street)"
                            onChange={(e) => setAddress({ ...address, area: e.target.value })}
                            value={address.area}
                        ></textarea>
                        <div className="flex space-x-3">
                            <input
                                className="input-purple w-full"
                                type="text"
                                placeholder="City/District/Town"
                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                value={address.city}
                            />
                            <input
                                className="input-purple w-full"
                                type="text"
                                placeholder="State"
                                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                value={address.state}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-primary max-w-sm w-full mt-6 uppercase shadow-neon-cyan" disabled={addAddressMutation.isPending}>
                        {addAddressMutation.isPending ? 'SAVING...' : 'SAVE ADDRESS'}
                    </button>
                </form>
                <Image
                    className="md:mr-16 mt-16 md:mt-0 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                    src={assets.my_location_image}
                    alt="my_location_image"
                />
            </div>
            <Footer />
        </>
    );
};

export default AddAddress;