"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const districts = [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur", "Chattogram",
    "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj",
    "Habiganj", "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj",
    "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar",
    "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari",
    "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur",
    "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
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
            router.push("/");
        } else {
            setOrderDetails(storedOrder);
        }
    }, [router]);

    const handleInputChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });

        if (e.target.name === "district") {
            const newShippingFee = e.target.value === "Dhaka" ? 80 : 130;
            setShippingFee(newShippingFee);
        }
    };

    const totalPrice = orderDetails
        ? (orderDetails.product.salePrice
            ? orderDetails.product.salePrice * orderDetails.quantity
            : orderDetails.product.regularPrice * orderDetails.quantity) + shippingFee
        : 0;

    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        if (!orderDetails) return alert("No product selected for checkout.");

        const newOrder = {
            product: {
                name: orderDetails.product.name, // ✅ Fixed
                imageUrl: orderDetails.product.imageUrl || "/placeholder.png", // ✅ Fixed
            },
            variations: orderDetails.variations, // ✅ Fixed
            quantity: orderDetails.quantity,
            totalPrice: totalPrice, // ✅ Use computed totalPrice
            shippingFee: shippingFee, // ✅ Use updated shippingFee
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

    if (!orderDetails) return <p className="text-center">Loading...</p>;

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
                            <img
                                src={orderDetails.product.imageUrl || "/placeholder.png"}
                                alt={orderDetails.product.name}
                                className="w-64 h-64 rounded-lg object-cover border border-gray-300"
                            />

                            {/* Order Details */}
                            <div className="flex-1">
                                <p className="text-lg font-semibold text-gray-900">{orderDetails.product.name}</p>

                                {orderDetails.variations && Object.entries(orderDetails.variations).map(([key, value]) => (
                                    <p key={key} className="text-gray-600 text-sm">
                                        <span className="font-medium text-gray-800">{key}:</span> {value}
                                    </p>
                                ))}

                                <p className="text-gray-700 font-medium mt-2">পরিমাণ: <span className="text-gray-900">{orderDetails.quantity}</span></p>

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
                                <label className="block font-medium text-gray-700">ইমেইল</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={shippingInfo.email}
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
                                <label className="block font-medium text-gray-700">জেলা</label>
                                <select
                                    name="district"
                                    value={shippingInfo.district}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full"
                                >
                                    {districts.map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">জিপ কোড</label>
                                <input
                                    type="text"
                                    name="zip"
                                    value={shippingInfo.zip}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full"
                                />
                            </div>
                        </form>
                    </div>
                </div>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                <button
                    onClick={handleOrderSubmit}
                    className={`mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "অর্ডার নেয়া হচ্ছে..." : "অর্ডার করুন"}
                </button>
            </div>
            <Footer />
        </>
    );
}
