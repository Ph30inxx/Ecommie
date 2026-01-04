'use client'
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import { useProducts } from "@/lib/react-query/hooks/useProducts";
import { useUserData } from "@/lib/react-query/hooks/useUserData";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const {user} = useUser()
    const {getToken} = useAuth()

    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})

    // Fetch products using React Query
    const { data: products = [] } = useProducts();

    // Fetch user data using React Query
    const { data: userData } = useUserData();

    // Sync cartItems when userData changes
    useEffect(() => {
        if (userData?.cartItems) {
            setCartItems(userData.cartItems);
        }
    }, [userData]);

    // Set seller status when user loads
    useEffect(() => {
        if (user?.publicMetadata?.role === 'seller') {
            setIsSeller(true);
        }
    }, [user]);

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (itemInfo && cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    const value = {
        user, getToken,
        currency, router,
        isSeller, setIsSeller,
        userData,
        products,
        cartItems, setCartItems,
        getCartCount, getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}