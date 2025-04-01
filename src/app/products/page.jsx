"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [orderDetails, setOrderDetails] = useState({ name: "", address: "", phone: "", paymentMethod: "Cash On Delivery" });

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                setProducts(data.products);
                setFilteredProducts(data.products);
                setCategories([...new Set(data.products.map((product) => product.category))]);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) => 
            prev.includes(category) 
                ? prev.filter((c) => c !== category) 
                : [...prev, category]
        );
    };
    
    const filterProducts = () => {
        let filtered = products;
    
        if (selectedCategories.length > 0) { // Fix category filtering
            filtered = filtered.filter((p) => selectedCategories.includes(p.category));
        }
    
        filtered = filtered.filter((p) => p.salePrice >= priceRange[0] && p.salePrice <= priceRange[1]);
    
        setFilteredProducts(filtered);
    };

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const openCheckoutModal = (product) => {
        setSelectedProduct(product);
    };

    const handleOrderSubmit = async () => {
        const input = document.getElementById("instantOrder");
        if (!input.value.trim()) {
            alert("প্রয়োজনীয় তথ্য প্রদান করুন!");
            input.focus();
            return
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
        <>
            <Navbar />
            <Toaster />
            <div className="flex">
                {/* Sidebar Filters */}
                <div className="w-1/4 p-5 bg-gray-100 min-h-screen rounded-md shadow-md mt-10">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">ফিল্টার করুন</h2>

                    {/* Categories */}
                    <div className="mb-4">
                        <h3 className="font-medium text-lg mb-2">ক্যাটেগরি</h3>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                        className="checkbox checkbox-primary"
                                    />
                                    <span className="text-gray-700">{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                        <h3 className="font-medium text-lg mb-2">প্রাইস রেইঞ্জ</h3>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>BDT {priceRange[0]}</span>
                            <span>BDT {priceRange[1]}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                            className="range range-primary w-full mt-2"
                        />
                    </div>

                    {/* Apply Filters Button */}
                    <button
                        onClick={filterProducts}
                        className="btn btn-primary w-full text-lg font-semibold py-3 bg-gray-400 shadow-md hover:bg-primary-dark transition-all cursor-pointer"
                    >
                        ফিল্টার করুন
                    </button>
                </div>

                {/* Product Grid */}
                <div className="w-3/4 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product._id} className="card bg-base-100 shadow-xl p-5">
                            <figure>
                                <Link href={`/product/${product._id}`}>
                                    <img src={product.imageUrl || "/placeholder.png"} alt={product.name} className="h-48 w-full object-cover" />
                                </Link>
                            </figure>
                            <div className="card-body">
                                <h2 className="text-gray-700 font-bold text-lg">{product.name}</h2>
                                <p className="text-lg font-semibold text-red-500">BDT {product.salePrice || product.regularPrice}</p>
                                {product.salePrice && (
                                    <p className="text-sm text-gray-500 line-through">BDT {product.regularPrice}</p>
                                )}
                                <div className="flex card-actions justify-between mt-5 text-gray-700">
                                    <button onClick={() => addToCart(product)} className="btn btn-secondary cursor-pointer"> <span className="font-bold text-gray-900">🛒</span>কার্টে নিন</button>
                                    <button onClick={() => openCheckoutModal(product)} className="btn btn-primary border-2 py-1 cursor-pointer px-3 rounded-xl hover:text-gray-900">এখনি কিনুন</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Checkout Modal */}
                {selectedProduct && (
                    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">অর্ডার দিন</h2>
                            <p className="text-gray-700"><span className="text-gray-800 font-bold">পণ্য:</span> {selectedProduct.name}</p>
                            <p className="text-gray-700"><span className="text-gray-800 font-bold">মূল্য:</span> BDT {selectedProduct.salePrice || selectedProduct.regularPrice}</p>
                            <p className="text-gray-700"><span className="text-gray-800 font-bold">ডেলিভারি মেথোড:</span> ক্যাশ অন ডেলিভারি</p>
                            <input id="instantOrder" type="text" placeholder="আপনার নাম" className="input input-bordered w-full mt-4 p-2 outline-0 bg-white rounded-xl" required onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })} />
                            <input id="instantOrder" type="text" placeholder="আপনার ঠিকানা" className="input input-bordered w-full mt-2 p-2 outline-0 bg-white rounded-xl" required onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })} />
                            <input id="instantOrder" type="text" placeholder="আপনার ফোন নাম্বার" className="input input-bordered w-full mt-2 p-2 outline-0 bg-white rounded-xl" required onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })} />
                            <div className="flex justify-between gap-3">
                                <button onClick={handleOrderSubmit} className="w-full mt-4 p-2 rounded-xl bg-white cursor-pointer text-blue-500 font-bold">অর্ডার দিন</button>
                                <button onClick={() => setSelectedProduct(null)} className="w-full mt-4 p-2 rounded-xl bg-white cursor-pointer text-red-500 font-bold">বাদ দিন</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}