"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCart } from "@/utils/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Cart = () => {
    const router = useRouter();
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
    const [cartData, setCartData] = useState([]);

    // Convert JSON data to objects and sync with live cart state
    useEffect(() => {
        const updatedCart = cart.map((item) => {
            // Convert JSON string into object if necessary
            const parsedItem = typeof item === "string" ? JSON.parse(item) : item;
            return {
                ...parsedItem,
                quantity: parsedItem.quantity ?? 1, // Default to 1 if undefined
            };
        });

        setCartData(updatedCart);
        localStorage.setItem("cartData", JSON.stringify(updatedCart));
    }, [cart]);

    // Handle quantity change safely
    const handleQuantityChange = (itemId, quantity) => {
        const parsedQuantity = parseInt(quantity, 10);
        if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
            updateQuantity(itemId, parsedQuantity);
        }
    };

    // Checkout function (store cart data & navigate)
    const handleCheckout = () => {
        if (cartData.length === 0) {
            alert("Your cart is empty! Add some products to proceed.");
            return;
        }

        // Ensure quantity is included in checkout data
        const checkoutData = cartData.map((item) => ({
            _id: item._id,
            name: item.name,
            salePrice: Number(item.salePrice) || Number(item.regularPrice) || 0,
            quantity: item.quantity, // Ensure quantity is passed
            imageUrl: item.imageUrl,
            variations: typeof item.variations === "string" ? JSON.parse(item.variations) : item.variations,
        }));

        localStorage.setItem("checkoutData", JSON.stringify({ products: checkoutData }));
        router.push("/checkout");
    };

    return (
        <>
            <Navbar />
            <div className="w-11/12 mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Shopping Cart</h2>
                {cartData.length === 0 ? (
                    <p className="text-center text-gray-600 mt-4">Your cart is empty.</p>
                ) : (
                    <div>
                        {cartData.map((item) => {
                            const variations = typeof item.variations === "string" ? JSON.parse(item.variations) : item.variations;
                            const price = Number(item.salePrice) || Number(item.regularPrice) || 0;
                            return (
                                <div key={item._id} className="flex items-center border-b py-6 px-4">
                                    <img
                                        src={item.imageUrl || "/placeholder.png"}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-md mr-6 shadow-md"
                                    />
                                    <div className="flex-grow">
                                        <p className="text-lg font-medium text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-600">
                                            {`BDT ${price.toFixed(2)} × `}
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item._id, Math.max(1, e.target.value))}
                                                className="w-16 text-center border rounded-md px-2 py-1"
                                                min="1"
                                            />
                                        </p>
                                    </div>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            );
                        })}
                        <div className="mt-6 flex flex-col items-center gap-4">
                            <button
                                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-md transition"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </button>
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Cart;
