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
                                className={`px-5 py-2 rounded-full font-semibold capitalize transition ${activeTab === tab
                                        ? "bg-[#439DDF] text-white shadow"
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
                                            className="flex-1 px-4 py-2 bg-[#439DDF] text-white rounded hover:bg-blue-700 text-sm"
                                        >
                                            এখনি কিনুন
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {selectedProduct && (
                <div className="fixed inset-0 flex justify-center items-center bg-transparent bg-opacity-20 z-50">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">অর্ডার দিন</h2>
                        <p className="text-gray-700">
                            <span className="text-gray-800 font-bold">পণ্য:</span> {selectedProduct.name}
                        </p>
                        <p className="text-gray-700">
                            <span className="text-gray-800 font-bold">মূল্য:</span> BDT {selectedProduct.salePrice || selectedProduct.regularPrice}
                        </p>

                        {/* Delivery charge display */}
                        {orderDetails?.location === "ঢাকার ভিতরে" && (
                            <p className="text-sm text-green-600 font-medium mt-1">ডেলিভারি চার্জঃ ৮০ টাকা</p>
                        )}
                        {orderDetails?.location === "ঢাকার বাইরে" && (
                            <p className="text-sm text-red-600 font-medium mt-1">ডেলিভারি চার্জঃ ১৩০ টাকা</p>
                        )}

                        <p className="text-gray-700">
                            <span className="text-gray-800 font-bold">ডেলিভারি মেথোড:</span> ক্যাশ অন ডেলিভারি
                        </p>

                        {/* Delivery location selector */}
                        <input
                            type="text"
                            placeholder="আপনার নাম"
                            className="input input-bordered w-full mt-3 p-2 bg-white rounded-xl"
                            required
                            onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="আপনার ঠিকানা"
                            className="input input-bordered w-full mt-2 p-2 bg-white rounded-xl"
                            required
                            onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="আপনার ফোন নাম্বার"
                            className="input input-bordered w-full mt-2 p-2 bg-white rounded-xl"
                            required
                            onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                        />
                        <select
                            className="input input-bordered w-full mt-3 p-2 bg-white rounded-xl"
                            required
                            onChange={(e) => setOrderDetails({ ...orderDetails, location: e.target.value })}
                            value={orderDetails?.location || ""}
                        >
                            <option value="">ডেলিভারি লোকেশন নির্বাচন করুন</option>
                            <option value="ঢাকার ভিতরে">ঢাকার ভিতরে</option>
                            <option value="ঢাকার বাইরে">ঢাকার বাইরে</option>
                        </select>

                        <div className="flex justify-between gap-3">
                            <button
                                onClick={handleOrderSubmit}
                                className="w-full mt-4 p-2 rounded-xl bg-white cursor-pointer text-blue-500 font-bold"
                            >
                                অর্ডার দিন
                            </button>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="w-full mt-4 p-2 rounded-xl bg-white cursor-pointer text-red-500 font-bold"
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
