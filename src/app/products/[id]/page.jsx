"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/utils/CartContext";
import { Toaster, toast } from "react-hot-toast";

export default function ProductPage() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariations, setSelectedVariations] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("details");
    const [reviews, setReviews] = useState([
        { name: "John Doe", avatar: "/avatar.webp", review: "Great product!" },
        { name: "Jane Smith", avatar: "/avatar.webp", review: "Totally worth it." }
    ]);
    const [newReview, setNewReview] = useState("");

    const [orderForm, setOrderForm] = useState({
        name: "",
        address: "",
        phone: "",
        deliveryLocation: ""
    });

    useEffect(() => {
        async function fetchProduct() {
            if (!id) return;
            try {
                const res = await fetch(`/api/products`);
                const data = await res.json();
                const matchedProduct = data.products.find((p) => p._id === id);
                if (matchedProduct) {
                    if (matchedProduct.variations) {
                        try {
                            matchedProduct.variations = JSON.parse(matchedProduct.variations);
                        } catch {
                            matchedProduct.variations = [];
                        }
                    }
                    setProduct(matchedProduct);
                } else {
                    console.error("Product not found");
                }
            } catch (error) {
                console.error("❌ Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    const handleVariationChange = (name, value) => {
        setSelectedVariations({ ...selectedVariations, [name]: value });
    };

    const handleAddToCart = () => {
        addToCart(product);
        toast.success("Added to cart successfully");
    };

    const handleOrderSubmit = () => {
        const { name, address, phone, deliveryLocation } = orderForm;
        if (!name || !address || !phone || !deliveryLocation) {
            toast.error("Please fill all fields");
            return;
        }

        console.log("Order Info:", {
            ...orderForm,
            product,
            quantity,
            variations: selectedVariations
        });

        toast.success("Order placed successfully!");
        setOrderForm({ name: "", address: "", phone: "", deliveryLocation: "" });
    };

    const getDeliveryCharge = () => {
        if (orderForm.deliveryLocation === "ঢাকার ভিতরে") return "৮০";
        if (orderForm.deliveryLocation === "ঢাকার বাইরে") return "১৩০";
        return null;
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (!product) return <p className="text-center text-red-500">Product not found.</p>;

    return (
        <>
            <Navbar />
            <Toaster />
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img
                            src={product.imageUrl || "/placeholder.png"}
                            alt={product.name}
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold">{product.name}</h1>
                        <div className="mt-4">
                            <span className="text-2xl text-red-500 font-bold">
                                BDT {product.salePrice || product.regularPrice}
                            </span>
                            {product.salePrice && (
                                <span className="text-lg text-gray-500 line-through ml-3">
                                    BDT {product.regularPrice}
                                </span>
                            )}
                            {orderForm.deliveryLocation && (
                                <div className="mt-2 text-sm text-gray-700">
                                    ডেলিভারি চার্জ: {getDeliveryCharge()} টাকা
                                </div>
                            )}
                        </div>

                        {product.variations.length > 0 && (
                            <div className="mt-4 flex gap-10">
                                {product.variations.map(({ name, value }) => (
                                    <div key={name} className="mt-2">
                                        <label className="block font-semibold text-gray-700">{name}:</label>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {value.split(',').map((val) => (
                                                <button
                                                    key={val}
                                                    onClick={() => handleVariationChange(name, val)}
                                                    className={`px-3 py-1 cursor-pointer rounded-md border ${selectedVariations[name] === val
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-gray-200"
                                                        }`}
                                                >
                                                    {val}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-4">
                            <label className="block font-semibold text-gray-700">Quantity:</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="border p-2 rounded-md w-20"
                            />
                        </div>

                        <div className="mt-8 bg-gray-100 rounded-lg p-4 shadow">
                            <input
                                type="text"
                                placeholder="নাম"
                                value={orderForm.name}
                                onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                                className="w-full mb-3 p-2 rounded-md border"
                            />
                            <input
                                type="text"
                                placeholder="ঠিকানা"
                                value={orderForm.address}
                                onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                                className="w-full mb-3 p-2 rounded-md border"
                            />
                            <input
                                type="tel"
                                placeholder="ফোন নাম্বার"
                                value={orderForm.phone}
                                onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                                className="w-full mb-3 p-2 rounded-md border"
                            />
                            <select
                                value={orderForm.deliveryLocation}
                                onChange={(e) => setOrderForm({ ...orderForm, deliveryLocation: e.target.value })}
                                className="w-full mb-4 p-2 rounded-md border"
                            >
                                <option value="">ডেলিভারি লোকেশন নির্বাচন করুন</option>
                                <option value="ঢাকার ভিতরে">ঢাকার ভিতরে</option>
                                <option value="ঢাকার বাইরে">ঢাকার বাইরে</option>
                            </select>

                            <button
                                onClick={handleOrderSubmit}
                                className="bg-[#439DDF] text-white px-3 md:px-6 lg:px-6 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
                            >
                                এখনি অর্ডার দিন
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="border-2 border-[#439DDF] text-[#439DDF] px-3 md:px-6 lg:px-6 py-[6px] md:py-2    rounded-md cursor-pointer ml-3 md:ml-5 lg:ml-5 hover:bg-sky-700 hover:text-white hover:border-sky-700"
                            >
                                কার্টে নিন
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-10 bg-gray-100 shadow-md rounded-lg p-6">
                    <div className="flex mb-4">
                        <button
                            onClick={() => setActiveTab("details")}
                            className={`px-6 py-3 text-lg font-semibold transition-all ${activeTab === "details"
                                ? "border-b-4 border-blue-500 text-blue-500"
                                : "text-gray-600 hover:text-blue-500 cursor-pointer"
                                }`}
                        >
                            পণ্যের বিস্তারিত
                        </button>
                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={`px-6 py-3 text-lg font-semibold transition-all ${activeTab === "reviews"
                                ? "border-b-4 border-blue-500 text-blue-500"
                                : "text-gray-600 hover:text-blue-500 cursor-pointer"
                                }`}
                        >
                            রিভিউ
                        </button>
                    </div>

                    {activeTab === "details" && (
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</div>
                    )}

                    {activeTab === "reviews" && (
                        <>
                            <div className="mt-4 space-y-4">
                                {reviews.map((review, index) => (
                                    <div key={index} className="flex items-center gap-4 py-4 bg-white rounded-xl">
                                        <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="text-lg font-semibold">{review.name}</p>
                                            <p className="text-gray-700">{review.review}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add review section */}
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold">Write a Review</h3>
                                <textarea
                                    className="p-3 w-full rounded-lg mt-3 shadow-sm focus:ring focus:ring-blue-300 outline-0 bg-white border-0"
                                    rows="4"
                                    value={newReview}
                                    onChange={(e) => setNewReview(e.target.value)}
                                    placeholder="Share your experience..."
                                />
                                <button
                                    onClick={() => {
                                        if (newReview.trim() !== "") {
                                            setReviews([...reviews, {
                                                name: "Anonymous",
                                                avatar: "/default-avatar.png",
                                                review: newReview
                                            }]);
                                            setNewReview("");
                                            toast.success("Review submitted!");
                                        }
                                    }}
                                    className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
