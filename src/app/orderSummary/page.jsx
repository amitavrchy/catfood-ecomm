"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrderSummary() {
    const router = useRouter();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem("orderSummary"));
        if (!storedOrder) {
            router.push("/");
        } else {
            setOrder(storedOrder);
        }
    }, [router]);

    if (!order) return <p className="text-center text-lg mt-10">Loading order details...</p>;

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                {/* Success Message */}
                <div className="flex flex-col items-center text-center">
                    <svg className="text-green-500 text-6xl mb-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="48" height="48">
                        <path fillRule="evenodd" d="M12 0a12 12 0 110 24A12 12 0 0112 0zm5.86 8.86l-7 7a1 1 0 01-1.43-1.4l4.93-4.92a1 1 0 011.43 1.4zM6.86 10.14a1 1 0 010 1.4l4.92 4.93a1 1 0 001.4-1.43l-7-7a1 1 0 00-1.4 1.43l2.08 2.07z" clipRule="evenodd" />
                    </svg>
                    <h1 className="text-3xl font-bold text-gray-800">Thank You for Your Order!</h1>
                    <p className="text-gray-600 mt-2">
                        Your order has been placed successfully. We will notify you when it's shipped.
                    </p>
                </div>

                {/* Order Summary */}
                <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                    <div className="space-y-4">
                        {order.products.map((product, index) => (
                            <div key={index} className="flex flex-col gap-4">
                                <p className="text-lg font-bold">{product.name}</p>
                                <p className="text-gray-600">Quantity: {product.quantity}</p>
                                <p className="text-gray-600">Price: {product.totalPrice} BDT</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 border-t pt-4">
                        <p className="text-lg font-semibold">Subtotal: {order.totalPrice - order.shippingFee} BDT</p>
                        <p className="text-lg font-semibold">Shipping Fee: {order.shippingFee} BDT</p>
                        <p className="text-xl font-bold text-red-500">Total: {order.totalPrice} BDT</p>
                    </div>
                </div>

                {/* Shipping Details */}
                <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Details</h2>
                    <p className="text-gray-600"><span className="font-bold">Name:</span> {order.shipping.name}</p>
                    <p className="text-gray-600"><span className="font-bold">Email:</span> {order.shipping.email}</p>
                    <p className="text-gray-600"><span className="font-bold">Address:</span> {order.shipping.address}, {order.shipping.district}</p>
                    <p className="text-gray-600"><span className="font-bold">Zip Code:</span> {order.shipping.zip}</p>
                </div>

                {/* Next Steps */}
                <div className="text-center mt-8">
                    <p className="text-gray-600">Need help? <a href="/contact" className="text-blue-600 underline">Contact us</a></p>
                    <a href="/" className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">Continue Shopping</a>
                </div>
            </div>
            <Footer />
        </>
    );
}
