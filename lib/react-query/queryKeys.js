// Centralized query key factory for type safety and consistency
export const queryKeys = {
  // Products
  products: {
    all: ['products'],
    list: () => [...queryKeys.products.all, 'list'],
    seller: (userId) => [...queryKeys.products.all, 'seller', userId],
    detail: (productId) => [...queryKeys.products.all, 'detail', productId],
  },

  // User data
  user: {
    all: ['user'],
    data: (userId) => [...queryKeys.user.all, 'data', userId],
    addresses: (userId) => [...queryKeys.user.all, 'addresses', userId],
    cart: (userId) => [...queryKeys.user.all, 'cart', userId],
  },

  // Orders
  orders: {
    all: ['orders'],
    customer: (userId) => [...queryKeys.orders.all, 'customer', userId],
    seller: (sellerId) => [...queryKeys.orders.all, 'seller', sellerId],
  },

  // Sellers
  sellers: {
    all: ['sellers'],
    onboard: ['sellers', 'onboard'],
  },
};
