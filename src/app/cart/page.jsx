"use client";
import { useContext } from "react";
import { CartContext } from "@/utils/CartContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
    const router = useRouter();

    const handleCheckout = () => {
        localStorage.setItem("checkoutData", JSON.stringify(cart));
        router.push("/checkout");
    };

    if (cart.length === 0) return <p>Your cart is empty.</p>;

    return (
        <div>
            <Navbar />
            <h1>Your Cart</h1>
            {cart.map((item) => (
                <div key={item.id} className="border p-4 mb-2">
                    <img src={item.imageUrl || "/placeholder.png"} alt={item.name} width={100} />
                    <h2>{item.name}</h2>
                    <p>Price: {item.salePrice || item.regularPrice} BDT</p>

                    {/* Show selected variations */}
                    {item.selectedVariations &&
                        Object.entries(item.selectedVariations).map(([key, value]) => (
                            <p key={key}>{key}: {value}</p>
                        ))}

                    <div>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            ))}

            <button onClick={handleCheckout} className="bg-blue-500 text-white p-3">Proceed to Checkout</button>
            <Footer />
        </div>
    );
}
