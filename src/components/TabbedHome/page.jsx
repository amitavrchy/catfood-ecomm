"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { useCart } from "@/utils/CartContext";

export default function LatestProducts() {
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState("new");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orderDetails, setOrderDetails] = useState({ name: "", address: "", phone: "" });

    useEffect(() => {
        // Replace API type logic with hard slicing if needed
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            });
    }, []);

    const tabProductSlices = {
        best: products.slice(0, 8),
        new: products.slice(8, 16),
        top: products.slice(16, 24),
        featured: products.slice(24, 32),
    };

    const handleOrderSubmit = async () => {
        if (!orderDetails.name || !orderDetails.address || !orderDetails.phone) {
            alert("প্রয়োজনীয় তথ্য প্রদান করুন!");
            return;
        }

        const orderData = { product: selectedProduct, customer: orderDetails };

        try {
            const res = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            if (res.ok) {
                toast.success("Order placed successfully!");
                setSelectedProduct(null);
            } else toast.error("Failed to place order.");
        } catch {
            toast.error("An error occurred while placing the order.");
        }
    };

    return (
        <section className="py-12 bg-gray-50 w-full">
            <Toaster />
            <div className="container mx-auto px-4">
                <h2 className="text-4xl text-center text-gray-800 mb-2 font-bold">রিকমেন্ডেড কালেকশন</h2>
                <p className="text-xl text-gray-600 text-center mb-6">আপনার প্রয়োজনীয় পণ্যটি এখানে</p>

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="flex space-x-4 bg-white rounded-full p-2 shadow-md">
                        {["best", "new", "top", "featured"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-full font-semibold capitalize transition ${
                                    activeTab === tab
                                        ? "bg-blue-600 text-white shadow"
                                        : "text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {tab === "best" && "Best Seller"}
                                {tab === "new" && "New Arrivals"}
                                {tab === "top" && "Top Rated"}
                                {tab === "featured" && "Featured"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                              <div key={i} className="w-full h-80 bg-gray-200 animate-pulse rounded-xl"></div>
                          ))
                        : (tabProductSlices[activeTab] || []).map((product) => (
                              <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                                  <Link href={`/products/${product._id}`}>
                                      <img
                                          src={product.imageUrl || "/placeholder.png"}
                                          alt={product.name}
                                          className="h-48 w-full object-cover"
                                      />
                                  </Link>
                                  <div className="p-4 flex-1 flex flex-col justify-between">
                                      <div>
                                          <Link href={`/products/${product._id}`}>
                                              <h3 className="text-lg font-semibold text-gray-800 hover:underline">
                                                  {product.name}
                                              </h3>
                                          </Link>
                                          <p className="text-red-600 font-bold mt-1">
                                              BDT {product.salePrice || product.regularPrice}
                                          </p>
                                          {product.salePrice && (
                                              <p className="text-sm text-gray-500 line-through">
                                                  BDT {product.regularPrice}
                                              </p>
                                          )}
                                      </div>
                                      <div className="mt-4 flex gap-2">
                                          <button
                                              onClick={() => {
                                                addToCart(product);
                                                toast.success("Product Added Successfully");
                                              }}
                                              className="flex-1 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 text-sm"
                                          >
                                              🛒 কার্টে নিন
                                          </button>
                                          <button
                                              onClick={() => setSelectedProduct(product)}
                                              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                                          >
                                              এখনি কিনুন
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>
            </div>

            {/* Order Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">অর্ডার দিন</h2>
                        <p className="mb-2">
                            <strong>পণ্য:</strong> {selectedProduct.name}
                        </p>
                        <p className="mb-2">
                            <strong>মূল্য:</strong> BDT {selectedProduct.salePrice || selectedProduct.regularPrice}
                        </p>
                        <p className="mb-4">
                            <strong>ডেলিভারি:</strong> ক্যাশ অন ডেলিভারি
                        </p>

                        <input
                            type="text"
                            placeholder="আপনার নাম"
                            className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="আপনার ঠিকানা"
                            className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="আপনার ফোন নাম্বার"
                            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={handleOrderSubmit}
                                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                            >
                                অর্ডার দিন
                            </button>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                            >
                                বাদ দিন
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
