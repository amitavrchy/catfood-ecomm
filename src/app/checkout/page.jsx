"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const districts = [
    "ঢাকার ভিতরে", "ঢাকার বাইরে"
];

export default function CheckoutPage() {
    const router = useRouter();
    const [orderDetails, setOrderDetails] = useState(null);
    const [shippingInfo, setShippingInfo] = useState({
        name: "",
        email: "",
        address: "",
        district: "Dhaka",  // Default is Dhaka
        zip: "",
        phone: "",
    });
    const [shippingFee, setShippingFee] = useState(80); // Default 80 BDT for Dhaka
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem("checkoutData"));
        if (!storedOrder) {
            router.push("/"); // Redirect if no order data
        } else {
            setOrderDetails(storedOrder);
        }
    }, [router]);

    const handleInputChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });

        if (e.target.name === "district") {
            const newShippingFee = e.target.value === "ঢাকার ভিতরে" ? 80 : 120;
            setShippingFee(newShippingFee);
        }
    };

    // Calculate total price for single or multiple products
    const totalPrice = orderDetails && orderDetails.products
        ? orderDetails.products.reduce((sum, product) => {
            const price = Number(product.salePrice) || Number(product.regularPrice) || 0;
            return sum + (price * product.quantity);
        }, 0) + shippingFee
        : 0;

    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        if (!orderDetails) return alert("No product selected for checkout.");

        const newOrder = {
            products: orderDetails.products.map((product) => ({
                name: product.name,
                imageUrl: product.imageUrl || "/placeholder.png",
                variations: product.variations,
                quantity: product.quantity || 1,
                totalPrice: (product.salePrice || product.regularPrice) * (product.quantity || 1), // Fix the totalPrice calculation
            })),
            totalPrice,
            shippingFee,
            shipping: shippingInfo,
        };

        try {
            const res = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder),
            });

            if (res.ok) {
                const result = await res.json();

                // Store Order Data for Order Summary
                localStorage.setItem("orderSummary", JSON.stringify({ ...newOrder, orderId: result.orderId }));

                // Redirect to Order Summary Page
                router.push("/orderSummary");
            } else {
                alert("Failed to place order.");
            }
        } catch (error) {
            console.error("❌ Error placing order:", error);
            alert("Something went wrong.");
        }
    };

    if (!orderDetails || !orderDetails.products) return <p className="text-center">Loading...</p>;

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">চেকআউট</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Order Summary */}
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">অর্ডার বিস্তারিত</h2>

                        <div>
                            {/* Product Image */}
                            {orderDetails.products.map((product, index) => (
                                <div key={index} className="flex mt-10 mb-10">
                                    <img
                                        src={product.imageUrl || "/placeholder.png"}
                                        alt={product.name}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold text-gray-900 ml-5">{product.name}</p>
                                        <p className="text-gray-700 font-medium ml-5">পরিমাণ: <span className="text-gray-900">{product.quantity || 1}</span></p>
                                    </div>
                                </div>
                            ))}

                            <p className="text-gray-700 font-medium">
                                শিপিং চার্জ: <span className="text-gray-900">{shippingFee} BDT</span>
                            </p>

                            <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
                                <p className="text-xl font-bold text-red-600">
                                    মোট: {totalPrice} BDT
                                </p>
                            </div>

                            {/* Payment Method */}
                            <div className="mt-6 p-3 bg-gray-100 rounded-lg flex items-center gap-3">
                                <span className="text-gray-700 font-medium">পেমেন্ট মেথড:</span>
                                <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-md">
                                    ক্যাশ অন ডেলিভারি
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Details */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">শিপিং ডিটেইলস</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block font-medium text-gray-700">নাম</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={shippingInfo.name}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">ফোন</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={shippingInfo.phone}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">ঠিকানা</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={shippingInfo.address}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">ডেলিভারি লোকেশন</label>
                                <select
                                    name="district"
                                    value={shippingInfo.district}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full"
                                    required
                                >
                                    {districts.map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Submit Button */}
                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    onClick={handleOrderSubmit}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Place Order"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
