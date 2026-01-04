import { useMemo } from 'react';
import { useSellerOrders } from './useOrders';
import { useSellerProducts } from './useSellerProducts';

// Process revenue over time from orders
const processRevenueOverTime = (orders, days = 30) => {
  if (!orders || orders.length === 0) return [];

  const now = Date.now();
  const startDate = now - (days * 24 * 60 * 60 * 1000);

  // Filter orders within the date range
  const filteredOrders = orders.filter(order => order.date >= startDate);

  // Group by date
  const revenueByDate = {};
  filteredOrders.forEach(order => {
    const date = new Date(order.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    revenueByDate[date] = (revenueByDate[date] || 0) + order.amount;
  });

  // Convert to array format for charts
  return Object.entries(revenueByDate).map(([date, revenue]) => ({
    date,
    revenue: Number(revenue.toFixed(2))
  }));
};

// Process orders by status
const processOrdersByStatus = (orders) => {
  if (!orders || orders.length === 0) return [];

  const statusCount = {};
  orders.forEach(order => {
    const status = order.status || 'Unknown';
    statusCount[status] = (statusCount[status] || 0) + 1;
  });

  return Object.entries(statusCount).map(([status, count]) => ({
    status,
    count,
    value: count // For pie charts
  }));
};

// Process products by category
const processProductsByCategory = (products) => {
  if (!products || products.length === 0) return [];

  const categoryCount = {};
  products.forEach(product => {
    const category = product.category || 'Uncategorized';
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  // Sort by count descending
  return Object.entries(categoryCount)
    .map(([category, count]) => ({
      category,
      count
    }))
    .sort((a, b) => b.count - a.count);
};

// Process top products by revenue
const processTopProducts = (orders, limit = 5) => {
  if (!orders || orders.length === 0) return [];

  const productRevenue = {};
  const productQuantity = {};

  orders.forEach(order => {
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        const productName = item.product?.name || 'Unknown Product';
        const quantity = item.quantity || 0;

        // Calculate revenue for this item (order amount divided by total items)
        const itemRevenue = (order.amount / order.items.length) * quantity;

        productRevenue[productName] = (productRevenue[productName] || 0) + itemRevenue;
        productQuantity[productName] = (productQuantity[productName] || 0) + quantity;
      });
    }
  });

  // Convert to array and sort by revenue
  return Object.entries(productRevenue)
    .map(([productName, revenue]) => ({
      productName,
      revenue: Number(revenue.toFixed(2)),
      quantity: productQuantity[productName]
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
};

// Main analytics hook
export const useSellerAnalytics = (timeRange = 30) => {
  const { data: orders = [], isLoading: ordersLoading } = useSellerOrders();
  const { data: products = [], isLoading: productsLoading } = useSellerProducts();

  const analytics = useMemo(() => {
    // Calculate summary stats
    const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Process chart data
    const revenueOverTime = processRevenueOverTime(orders, timeRange);
    const ordersByStatus = processOrdersByStatus(orders);
    const productsByCategory = processProductsByCategory(products);
    const topProducts = processTopProducts(orders, 5);

    return {
      // Summary stats
      stats: {
        totalRevenue: Number(totalRevenue.toFixed(2)),
        totalOrders,
        totalProducts,
        avgOrderValue: Number(avgOrderValue.toFixed(2))
      },
      // Chart data
      charts: {
        revenueOverTime,
        ordersByStatus,
        productsByCategory,
        topProducts
      }
    };
  }, [orders, products, timeRange]);

  return {
    ...analytics,
    isLoading: ordersLoading || productsLoading
  };
};
