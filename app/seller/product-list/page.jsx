'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import { useSellerProducts } from "@/lib/react-query/hooks/useSellerProducts";
import { useDeleteProduct } from "@/lib/react-query/hooks/useProductMutations";
import DeleteConfirmModal from "@/components/seller/DeleteConfirmModal";

const ProductList = () => {

  const { router } = useAppContext()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Use React Query hook for fetching seller products
  const { data: products = [], isLoading: loading } = useSellerProducts();
  const deleteProductMutation = useDeleteProduct();

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteProductMutation.mutate(productToDelete._id, {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setProductToDelete(null);
        },
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between page-transition">
      {loading ? <Loading /> : <div className="w-full md:p-10 p-4">
        <div className="flex flex-col items-center md:items-start mb-6">
          <h2 className="text-3xl font-bold text-white">All Products</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 shadow-glow-cyan"></div>
        </div>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-xl card-dark">
          <table className=" table-fixed w-full overflow-hidden">
            <thead className="text-slate-200 text-sm text-left bg-gradient-to-r from-slate-800 to-slate-900 border-b-2 border-cyan-500/30">
              <tr>
                <th className="w-2/3 md:w-2/5 px-4 py-4 font-semibold truncate">Product</th>
                <th className="px-4 py-4 font-semibold truncate max-sm:hidden">Category</th>
                <th className="px-4 py-4 font-semibold truncate">
                  Price
                </th>
                <th className="px-4 py-4 font-semibold truncate">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-400">
              {products.map((product, index) => (
                <tr key={index} className="border-t border-slate-800 hover:bg-slate-800/50 transition-colors duration-200">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="bg-slate-800 border border-slate-700 rounded p-2">
                      <Image
                        src={product.image[0]}
                        alt="product Image"
                        className="w-16"
                        width={1280}
                        height={720}
                      />
                    </div>
                    <span className="truncate w-full text-slate-200">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">{product.category}</td>
                  <td className="px-4 py-3 text-slate-200">${product.offerPrice}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/seller/edit-product/${product._id}`)}
                        className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-md hover:shadow-glow-cyan transition-all duration-300"
                        title="Edit Product"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="p-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:shadow-glow-red transition-all duration-300"
                        title="Delete Product"
                        disabled={deleteProductMutation.isPending}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="p-2 bg-slate-700 text-slate-200 rounded-md hover:bg-slate-600 transition-all duration-300"
                        title="View Product"
                      >
                        <Image className="h-4 w-4" src={assets.redirect_icon} alt="view" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        productName={productToDelete?.name}
        isDeleting={deleteProductMutation.isPending}
      />

      <Footer />
    </div>
  );
};

export default ProductList;