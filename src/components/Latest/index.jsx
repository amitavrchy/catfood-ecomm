"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { useCart } from "@/utils/CartContext";

export default function LatestProducts() {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orderDetails, setOrderDetails] = useState({ name: "", address: "", phone: "" });

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);
    const handleOrderSubmit = async () => {
        if (!orderDetails.name.trim() || !orderDetails.address.trim() || !orderDetails.phone.trim()) {
            alert("প্রয়োজনীয় তথ্য প্রদান করুন!");
            return;
        }

        const orderData = {
            product: selectedProduct,
            customer: orderDetails,
        };

        try {
            const res = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });
            if (res.ok) {
                toast.success("Order placed successfully!");
                setSelectedProduct(null);
            } else {
                toast.error("Failed to place order.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("An error occurred while placing the order.");
        }
    };

    return (
        <section className="py-12 bg-gray-50 w-full">
            <Toaster />
            <div className="container mx-auto px-4">
                <h2 className="text-4xl text-center text-gray-800 mb-2"> <span className="font-bold">নতুন </span>কালেকশন</h2>
                <p className="text-xl text-gray-600 text-center">আমাদের লেটেস্ট পণ্যগুলি দেখুন</p>
                <div className="w-full p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
                    {loading
                        ? Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="w-full h-80 bg-gray-200 animate-pulse rounded-xl"></div>
                        ))
                        : products.slice(0, 8).map((product) => (
                            <div key={product._id} className="card bg-base-100 shadow-xl p-5">
                                <figure>
                                    <Link href={`/products/${product._id}`}>
                                        <img src={product.imageUrl || "/placeholder.png"} alt={product.name} className="h-48 w-full object-cover" />
                                    </Link>
                                </figure>
                                <div className="card-body">
                                    <Link href={`/products/${product._id}`}>
                                        <h2 className="text-gray-700 font-bold text-lg">{product.name}</h2>
                                    </Link>
                                    <p className="text-lg font-semibold text-red-500">BDT {product.salePrice || product.regularPrice}</p>
                                    {product.salePrice && (
                                        <p className="text-sm text-gray-500 line-through">BDT {product.regularPrice}</p>
                                    )}
                                    <div className="flex gap-2 card-actions justify-between mt-5 text-gray-700">
                                        <button
                                            onClick={() => {
                                                addToCart(product);
                                                toast.success("Product Added to Cart");
                                            }}
                                            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 text-sm"
                                        >
                                            <span className="font-bold">🛒</span> কার্টে নিন
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

            {selectedProduct && (
                <div className="fixed inset-0 flex justify-center items-center bg-opacity-50">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">অর্ডার দিন</h2>
                        <p className="text-gray-700"><span className="text-gray-800 font-bold">পণ্য:</span> {selectedProduct.name}</p>
                        <p className="text-gray-700"><span className="text-gray-800 font-bold">মূল্য:</span> BDT {selectedProduct.salePrice || selectedProduct.regularPrice}</p>
                        <p className="text-gray-700"><span className="text-gray-800 font-bold">ডেলিভারি মেথোড:</span> ক্যাশ অন ডেলিভারি</p>
                        <input type="text" placeholder="আপনার নাম" className="input input-bordered w-full mt-4 p-2 outline-0 bg-white rounded-xl" required onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })} />
                        <input type="text" placeholder="আপনার ঠিকানা" className="input input-bordered w-full mt-2 p-2 outline-0 bg-white rounded-xl" required onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })} />
                        <input type="text" placeholder="আপনার ফোন নাম্বার" className="input input-bordered w-full mt-2 p-2 outline-0 bg-white rounded-xl" required onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })} />
                        <div className="flex justify-between gap-3">
                            <button onClick={handleOrderSubmit} className="w-full mt-4 p-2 rounded-xl bg-blue-500 text-white cursor-pointer font-bold">অর্ডার দিন</button>
                            <button onClick={() => setSelectedProduct(null)} className="w-full mt-4 p-2 rounded-xl bg-red-500 text-white cursor-pointer font-bold">বাদ দিন</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}