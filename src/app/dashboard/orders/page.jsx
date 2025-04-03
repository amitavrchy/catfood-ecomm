"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ordersData = [
    { id: "ORD12345", user: "John Doe", date: "2024-03-01", status: "Shipped", total: "BDT 1200.00", payment: "Credit Card", items: ["Laptop", "Wireless Mouse"] },
    { id: "ORD67890", user: "Jane Smith", date: "2024-02-20", status: "Delivered", total: "BDT 850.50", payment: "PayPal", items: ["Smartphone", "Headphones"] },
    { id: "ORD54321", user: "Amit Roy", date: "2024-04-05", status: "Pending", total: "BDT 1450.75", payment: "Bank Transfer", items: ["Gaming Console", "Controller"] },
];

export default function OrderManagementPage() {
    const [orders, setOrders] = useState(ordersData);
    const [filter, setFilter] = useState("");

    // Handle order status change
    const updateStatus = (id, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        toast.success(`Order ${id} status updated to ${newStatus}`);
    };

    // Handle order cancellation
    const cancelOrder = (id) => {
        const updatedOrders = orders.filter(order => order.id !== id);
        setOrders(updatedOrders);
        toast.error(`Order ${id} has been canceled`);
    };

    return (
        <>
            <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <Toaster position="top-right" reverseOrder={false} />
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Order Management</h1>

                {/* Search & Filter Bar */}
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search by Order ID or User"
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-2/3 p-3 border rounded-md"
                    />
                    <select
                        onChange={(e) => setFilter(e.target.value)}
                        className="p-3 border rounded-md"
                    >
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>

                {/* Order List */}
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                    {orders.filter(order =>
                        order.id.includes(filter) ||
                        order.user.toLowerCase().includes(filter.toLowerCase()) ||
                        order.status.includes(filter)
                    ).length > 0 ? (
                        <ul>
                            {orders.filter(order =>
                                order.id.includes(filter) ||
                                order.user.toLowerCase().includes(filter.toLowerCase()) ||
                                order.status.includes(filter)
                            ).map(order => (
                                <li key={order.id} className="bg-white p-5 rounded-lg shadow-md mb-4">
                                    <p className="text-lg font-semibold"><strong>Order ID:</strong> {order.id}</p>
                                    <p><strong>User:</strong> {order.user}</p>
                                    <p><strong>Date:</strong> {order.date}</p>
                                    <p><strong>Status:</strong> <span className="px-2 py-1 bg-blue-500 text-white rounded">{order.status}</span></p>
                                    <p><strong>Total:</strong> {order.total}</p>
                                    <p><strong>Payment:</strong> {order.payment}</p>
                                    <p><strong>Items:</strong> {order.items.join(", ")}</p>

                                    {/* Actions */}
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            className="px-4 py-2 bg-green-600 text-white rounded-md"
                                            onClick={() => updateStatus(order.id, "Shipped")}
                                        >
                                            Mark as Shipped
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                                            onClick={() => updateStatus(order.id, "Delivered")}
                                        >
                                            Mark as Delivered
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-600 text-white rounded-md"
                                            onClick={() => cancelOrder(order.id)}
                                        >
                                            Cancel Order
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center">No orders found.</p>
                    )}
                </div>
            </div>
        </>
    );
}
