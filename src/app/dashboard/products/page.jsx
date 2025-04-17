"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const initialProducts = [
  { id: 1, name: "Wireless Headphones", price: "BDT 3200.00", stock: 15, category: "Electronics" },
  { id: 2, name: "Smartphone", price: "BDT 8500.00", stock: 8, category: "Electronics" },
  { id: 3, name: "Gaming Console", price: "BDT 14500.00", stock: 5, category: "Gaming" },
];

export default function AdminProductPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     try {
  //       const res = await fetch("/api/products");
  //       const data = await res.json();
  //       setProducts(data.products);
  //     }
  //     catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchProducts()
  // }, [])

  // Open Edit Modal
  const handleEditClick = (product) => {
    setEditProduct(product);
    setIsEditing(true);
  };

  // Close Edit Modal
  const closeModal = () => {
    setIsEditing(false);
    setEditProduct(null);
  };

  // Handle Product Update
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedProducts = products.map(p =>
      p.id === editProduct.id ? editProduct : p
    );
    setProducts(updatedProducts);
    toast.success("Product updated successfully!");
    closeModal();
  };

  // Handle Product Deletion
  const deleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    toast.error("Product deleted successfully!");
  };

  // Handle Search Filtering
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <Link href="/dashboard/products/new" className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2">
          {/* Add Product Icon (SVG) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
      </div>

      {/* Product List */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
        {filteredProducts.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Stock</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="p-3 border">{product.name}</td>
                  <td className="p-3 border">{product.price}</td>
                  <td className="p-3 border">{product.stock}</td>
                  <td className="p-3 border">{product.category}</td>
                  <td className="p-3 border flex gap-3">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="px-3 py-2 bg-yellow-500 text-white rounded-md flex items-center gap-2"
                    >
                      {/* Edit Icon (SVG) */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3h2a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2h2z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="px-3 py-2 bg-red-600 text-white rounded-md flex items-center gap-2"
                    >
                      {/* Delete Icon (SVG) */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No products found.</p>
        )}
      </div>

      {/* Edit Product Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-white/30 bg-opacity-70">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Product</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                {/* Close Icon (SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-medium">Price (BDT)</label>
                  <input
                    type="text"
                    value={editProduct.price}
                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                    className="w-full p-3 border rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-medium">Stock</label>
                  <input
                    type="number"
                    value={editProduct.stock}
                    onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                    className="w-full p-3 border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium">Category</label>
                <input
                  type="text"
                  value={editProduct.category}
                  onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">
                Update Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
