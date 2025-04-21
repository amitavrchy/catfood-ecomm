"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signOut } from "next-auth/react";

const AccountPage = () => {
    
      
    const [activeSection, setActiveSection] = useState("Profile");

    const user = {
        name: "John Doe",
        email: "johndoe@example.com",
        address: "123 Main St, New York, NY",
    };

    const orders = [
        { id: "ORD12345", date: "2024-03-01", status: "Shipped", total: "BDT 120.00" },
        { id: "ORD12345", date: "2024-03-01", status: "Shipped", total: "BDT 120.00" },
        { id: "ORD12345", date: "2024-03-01", status: "Shipped", total: "BDT 120.00" },
        { id: "ORD12345", date: "2024-03-01", status: "Shipped", total: "BDT 120.00" },
        { id: "ORD67890", date: "2024-02-15", status: "Delivered", total: "BDT 85.50" },
        { id: "ORD67890", date: "2024-02-15", status: "Delivered", total: "BDT 85.50" },
        { id: "ORD67890", date: "2024-02-15", status: "Delivered", total: "BDT 85.50" },
        { id: "ORD67890", date: "2024-02-15", status: "Delivered", total: "BDT 85.50" },
    ];

    const wishlist = [
        { id: "WL123", item: "Wireless Headphones", price: "BDT 80.00" },
        { id: "WL123", item: "Wireless Headphones", price: "BDT 80.00" },
        { id: "WL123", item: "Wireless Headphones", price: "BDT 80.00" },
        { id: "WL123", item: "Wireless Headphones", price: "BDT 80.00" },
        { id: "WL456", item: "Smartwatch", price: "BDT 150.00" },
        { id: "WL456", item: "Smartwatch", price: "BDT 150.00" },
        { id: "WL456", item: "Smartwatch", price: "BDT 150.00" },
    ];

    const settings = {
        notifications: true,
        darkMode: false,
    };
    const renderContent = () => {
        switch (activeSection) {
            case "Profile":
                return (
                    <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-3">Profile</h3>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                    </div>
                );
            case "Order History":
                return (
                    <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-3">Order History</h3>
                        {orders.length > 0 ? (
                            <ul>
                                {orders.map(order => (
                                    <li key={order.id} className="py-3 bg-gray-200 p-5 rounded-xl mb-5 border-b last:border-none">
                                        <p><strong>Order ID:</strong> {order.id}</p>
                                        <p><strong>Date:</strong> {order.date}</p>
                                        <p><strong>Status:</strong> {order.status}</p>
                                        <p><strong>Total:</strong> {order.total}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No orders yet.</p>
                        )}
                    </div>
                );
                case "Wishlist":
                    return (
                      <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-3">Wishlist</h3>
                        {wishlist.length > 0 ? (
                          <ul>
                            {wishlist.map((item, index) => (
                              <li key={index} className="py-3 bg-gray-200 p-5 rounded-xl mb-5 border-b last:border-none">
                                <p><strong>Item:</strong> {item.item}</p>
                                <p><strong>Price:</strong> {item.price}</p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500">Your wishlist is empty.</p>
                        )}
                      </div>
                    );
                  
                return (
                    <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-3">Wishlist</h3>
                        {wishlist.length > 0 ? (
                            <ul>
                                {wishlist.map(item => (
                                    <li key={item.id} className="py-3 bg-gray-200 p-5 rounded-xl mb-5 border-b last:border-none">
                                        <p><strong>Item:</strong> {item.item}</p>
                                        <p><strong>Price:</strong> {item.price}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Your wishlist is empty.</p>
                        )}
                    </div>
                );

            case "Settings":
                return (
                    <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-3">Settings</h3>
                        <p><strong>Notifications:</strong> {settings.notifications ? "Enabled" : "Disabled"}</p>
                        <p><strong>Dark Mode:</strong> {settings.darkMode ? "Enabled" : "Disabled"}</p>
                    </div>
                );
            default:
                return <p className="text-gray-500">Select a menu item to view content.</p>;
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Account Menu</h3>
                    <ul className="space-y-3">
                        {["Profile", "Order History", "Wishlist", "Settings"].map((section) => (
                            <li
                                key={section}
                                onClick={() => setActiveSection(section)}
                                className={`p-2 rounded-md cursor-pointer ${activeSection === section ? "bg-gray-300" : "hover:bg-gray-200"
                                    }`}
                            >
                                {section}
                            </li>
                        ))}
                        <li
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-md cursor-pointer"
                        >
                            Logout
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <div className="flex-1 p-10">
                    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">My Account</h2>
                        {renderContent()}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default dynamic(() => Promise.resolve(AccountPage), { ssr: false });
