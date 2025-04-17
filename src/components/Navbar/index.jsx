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
    const [cartItemCount, setCartItemCount] = useState(0);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data.products || []))
            .catch(err => console.error("Error loading products", err));

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
        <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-primary">Lixci</Link>

                {/* Search Bar */}
                <div className="relative">
                    <div className="bg-gray-200 p-2 rounded-full w-[250px] md:w-[600px]">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                            placeholder="পণ্য খুজুন..."
                            className="bg-transparent outline-none px-2 text-black w-full"
                        />
                    </div>
                    {isSearchFocused && searchResults.length > 0 && (
                        <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg w-full max-h-80 overflow-y-auto z-50">
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

                {/* Mobile Menu Toggle */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out bg-white shadow-md ${isOpen ? "block" : "hidden"}`}>
                <div className="px-4 py-3 space-y-3">
                    {menus.map((menu, index) => (
                        <Link key={index} href={menu.url} className="block text-gray-800 font-medium">
                            {menu.name}
                        </Link>
                    ))}

                    <div className="flex items-center justify-between pt-2 border-t">
                        <Link href="/cart" className="flex items-center gap-2">
                            <ShoppingCart className="w-6 h-6" />
                            {cartItemCount > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/account">
                            <User className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
