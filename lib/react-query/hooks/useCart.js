import { useAppContext } from '@/context/AppContext';
import { useUpdateCart } from './useCartMutations';
import toast from 'react-hot-toast';

export const useCart = () => {
  const { cartItems, setCartItems, user } = useAppContext();
  const updateCartMutation = useUpdateCart();

  const addToCart = (itemId) => {
    // Optimistic local update for instant UI feedback
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);

    // Sync to server if user is logged in
    if (user) {
      updateCartMutation.mutate(cartData, {
        onSuccess: () => {
          toast.success('Item added to cart');
        },
        onError: () => {
          // Revert on error
          setCartItems(cartItems);
        },
      });
    }
  };

  const updateCartQuantity = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);

    if (user) {
      updateCartMutation.mutate(cartData, {
        onSuccess: () => {
          toast.success('Cart updated');
        },
        onError: () => {
          // Revert on error
          setCartItems(cartItems);
        },
      });
    }
  };

  return {
    addToCart,
    updateCartQuantity,
    isUpdating: updateCartMutation.isPending,
  };
};
