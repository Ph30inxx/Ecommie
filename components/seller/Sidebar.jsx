import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname()
    const menuItems = [
        { name: 'Dashboard', path: '/seller', icon: assets.box_icon },
        { name: 'Add Product', path: '/seller/add-product', icon: assets.add_icon },
        { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon },
        { name: 'Orders', path: '/seller/orders', icon: assets.order_icon },
    ];

    return (
        <div className='md:w-64 w-16 border-r min-h-screen text-base border-slate-800 bg-slate-900 shadow-dark-lg py-2 flex flex-col'>
            {menuItems.map((item) => {

                const isActive = pathname === item.path;

                return (
                    <Link href={item.path} key={item.name} passHref>
                        <div
                            className={
                                `flex items-center py-3 px-4 gap-3 group transition-all duration-200 ${isActive
                                    ? "border-l-4 border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-transparent shadow-glow-cyan-sm"
                                    : "hover:bg-slate-800 hover:translate-x-1"
                                }`
                            }
                        >
                            <Image
                                src={item.icon}
                                alt={`${item.name.toLowerCase()}_icon`}
                                className="w-7 h-7 transition-transform duration-200 group-hover:scale-110 brightness-200"
                            />
                            <p className='md:block hidden font-medium text-slate-200'>{item.name}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;
