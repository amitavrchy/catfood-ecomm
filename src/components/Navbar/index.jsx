"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";

const menus = [
    { name: "হোম", url: "/" },
    { name: "প্রোডাক্ট", url: "/products" },
    { name: "এবাউট", url: "/about" },
    { name: "যোগাযোগ", url: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0); // state for cart item count
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Fetch products once
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data.products || []))
            .catch(err => console.error("Error loading products", err));

        // Get cart items from localStorage and calculate the total quantity
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        setCartItemCount(totalItems);
    }, []);

    useEffect(() => {
        if (searchTerm.trim()) {
            const results = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results.slice(0, 5));
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, products]);

    return (
        <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center relative">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-primary">ই-শপ</Link>

                {/* Search Bar */}
                <div className="hidden md:flex items-center relative">
                    <div className="bg-gray-200 p-2 rounded-full w-152">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                            placeholder="পণ্য খুজুন..."
                            className="bg-transparent outline-none flex-1 px-2 text-black w-full"
                        />
                    </div>

                    {/* Search Results Dropdown */}
                    {isSearchFocused && searchResults.length > 0 && (
                        <div className="absolute top-14 left-0 bg-white shadow-lg rounded-lg w-72 max-h-80 overflow-y-auto z-50">
                            {searchResults.map(product => (
                                <Link
                                    key={product._id}
                                    href={`/products/${product._id}`}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 border-b"
                                >
                                    <img src={product.imageUrl || '/placeholder.png'} alt={product.name} className="w-10 h-10 rounded object-cover" />
                                    <span className="text-sm text-gray-800">{product.name}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 text-gray-700 font-semibold">
                    {menus.map((menu, index) => (
                        <Link
                            key={index}
                            href={menu.url}
                            className={`relative transition duration-300 hover:text-gray-700 
                                    after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] 
                                    after:w-full after:bg-gray-700 after:scale-x-0 after:origin-left 
                                    after:transition-transform after:duration-300 hover:after:scale-x-100`}
                        >
                            {menu.name}
                        </Link>
                    ))}

                    <Link href="/cart" className="relative hover:scale-110 transition-transform duration-300">
                        <ShoppingCart className="w-6 h-6" />
                        {/* Cart Item Count Badge */}
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                    <Link href="/account" className="hover:scale-110 transition-transform duration-300">
                        <User className="w-6 h-6" />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white p-4 space-y-4 shadow-md absolute w-full left-0 top-full">
                    {menus.map((menu, index) => (
                        <Link key={index} href={menu.url} className="block">{menu.name}</Link>
                    ))}
                    <Link href="/cart" className="flex items-center justify-between">
                        Cart <ShoppingCart className="w-6 h-6" />
                    </Link>
                    <Link href="/account" className="flex items-center justify-between">
                        Account <User className="w-6 h-6" />
                    </Link>
                </div>
            )}
        </nav>
    );
}
