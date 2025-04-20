"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "@/utils/CartContext";
import { Heart, Heart as HeartOutline, HeartIcon as HeartFilled } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Shop() {
    const { addToCart } = useCart();
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category");

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : []);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orderDetails, setOrderDetails] = useState({ name: "", address: "", phone: "", paymentMethod: "Cash On Delivery", location: "" });
    const [wishlist, setWishlist] = useState([]);
    const [sortBy, setSortBy] = useState("");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9; // You can adjust this value

    const toggleWishlist = (product) => {
        setWishlist((prev) =>
            prev.includes(product._id)
                ? prev.filter((id) => id !== product._id)
                : [...prev, product._id]
        );
    };

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                setProducts(data.products);
                setCategories([...new Set(data.products.map((product) => product.category))]);

                // Initial filtering
                let filtered = data.products;
                if (initialCategory) {
                    filtered = filtered.filter(p => p.category === initialCategory);
                }
                setFilteredProducts(filtered);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, [initialCategory]);

    const handleCategoryChange = (category) => {
        const updated = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(updated);
        setCurrentPage(1); // Reset page on category change
    };

    useEffect(() => {
        filterProducts();
        setCurrentPage(1); // Reset page on filter/sort change
    }, [selectedCategories, priceRange, sortBy]);

    const filterProducts = () => {
        let filtered = products;

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((p) => selectedCategories.includes(p.category));
        }

        filtered = filtered.filter((p) => p.salePrice >= priceRange[0] && p.salePrice <= priceRange[1]);

        // Sorting logic
        if (sortBy === "price-low-to-high") {
            filtered.sort((a, b) => (a.salePrice || a.regularPrice) - (b.salePrice || b.regularPrice));
        } else if (sortBy === "price-high-to-low") {
            filtered.sort((a, b) => (b.salePrice || b.regularPrice) - (a.salePrice || a.regularPrice));
        } else if (sortBy === "name-a-z") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "name-z-a") {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredProducts(filtered);
    };

    const openCheckoutModal = (product) => setSelectedProduct(product);

    const handleOrderSubmit = async () => {
        const inputs = document.querySelectorAll("#instantOrder");
        for (let input of inputs) {
            if (!input.value.trim()) {
                alert("প্রয়োজনীয় তথ্য প্রদান করুন!");
                input.focus();
                return;
            }
        }

        const orderData = {
            product: selectedProduct,
            customer: orderDetails,
        };

        try {
            const res = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });
            if (res.ok) {
                toast.success("Order placed successfully!");
                setSelectedProduct(null);
                setOrderDetails({ name: "", address: "", phone: "", paymentMethod: "Cash On Delivery", location: "" });
            } else {
                toast.error("Failed to place order.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("An error occurred while placing the order.");
        }
    };

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <Navbar />
            <Toaster />
            <div className="block md:flex lg:flex">
                {/* Sidebar Filters */}
                <div className="w-full md:mt-20 md:w-1/4 lg:w-1/4 p-5 h-full md:ml-10 rounded-md shadow-md mt-10">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">ফিল্টার করুন</h2>

                    {/* Categories */}
                    <div className="mb-4">
                        <h3 className="font-medium text-lg mb-2">ক্যাটেগরি</h3>
                        <div className="space-y-2">
                            <label key="all" className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.length === 0}
                                    onChange={() => handleCategoryChange([])}
                                    className="checkbox checkbox-primary"
                                />
                                <span className="text-gray-700">সমস্ত পণ্য</span>
                            </label>
                            {categories.map((category) => (
                                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                        className="checkbox checkbox-primary"
                                    />
                                    <span className="text-gray-700">{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="w-full md:w-3/4 lg:w-3/4 p-5 mt-10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            পণ্যসমূহ <span className="text-sm font-normal text-gray-500">({filteredProducts.length} টি পণ্য)</span>
                        </h2>
                        <div className="form-control">
                            <div className="input-group">
                                <span className="bg-gray-200 text-gray-700 rounded-l-md px-2 py-2 mr-2">সাজান</span>
                                <select
                                    className="select select-bordered rounded-r-md"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="">ডিফল্ট</option>
                                    <option value="price-low-to-high">দাম: কম থেকে বেশি</option>
                                    <option value="price-high-to-low">দাম: বেশি থেকে কম</option>
                                    <option value="name-a-z">নাম: এ থেকে জেড</option>
                                    <option value="name-z-a">নাম: জেড থেকে এ</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {currentProducts.map((product) => (
                            <div key={product._id} className="card bg-base-100 shadow-xl p-5 relative">
                                {/* Wishlist Button */}
                                <button
                                    onClick={() => toggleWishlist(product)}
                                    className="absolute top-3 right-3 z-10 text-gray-500 hover:scale-110 transition-transform"
                                >
                                    {wishlist.includes(product._id) ? (
                                        <HeartFilled className="w-5 h-5 fill-red-500 stroke-red-500" />
                                    ) : (
                                        <HeartOutline className="w-5 h-5" />
                                    )}
                                </button>

                                {/* Product Image */}
                                <figure className="my-5 py-5 h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                    <div className="w-4/5 mx-auto bg-gray-200">
                                        <Link href={`/products/${product._id}`}>
                                            <div className="py-5 h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={product.imageUrl || "/placeholder.png"}
                                                    alt={product.name}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                </figure>

                                {/* Card Body */}
                                <div className="card-body">
                                    <Link href={`/products/${product._id}`}>
                                        <h2 className="text-gray-700 font-bold text-lg">{product.name}</h2>
                                    </Link>

                                    <p className="text-lg font-semibold text-red-500">
                                        BDT {product.salePrice || product.regularPrice}
                                    </p>

                                    {product.salePrice && (
                                        <p className="text-sm text-gray-500 line-through">
                                            BDT {product.regularPrice}
                                        </p>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 card-actions justify-between mt-5 text-gray-700">
                                        <button
                                            onClick={() => {
                                                addToCart(product);
                                                toast.success("Product Added to Cart");
                                            }}
                                            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 text-sm"
                                        >
                                            <span className="font-bold">🛒</span> কার্টে নিন
                                        </button>

                                        <button
                                            onClick={() => openCheckoutModal(product)}
                                            className="flex-1 px-4 py-2 bg-[#439DDF] text-white rounded hover:bg-blue-700 text-sm"
                                        >
                                            এখনি কিনুন
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {currentProducts.length === 0 && filteredProducts.length > 0 && (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-600">এই ফিল্টার অনুযায়ী কোন পণ্য পাওয়া যায়নি।</p>
                            </div>
                        )}
                        {filteredProducts.length === 0 && initialCategory && (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-600">"{initialCategory}" ক্যাটাগরিতে কোন পণ্য পাওয়া যায়নি।</p>
                            </div>
                        )}
                        {filteredProducts.length === 0 && !initialCategory && (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-600">কোন পণ্য পাওয়া যায়নি।</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {filteredProducts.length > productsPerPage && (
                        <div className="join mt-8 flex justify-center">
                            <button
                                className={`join-item w-10 p-2 cursor-pointer hover:text-gray-500 btn ${currentPage === 1 ? 'disabled' : ''}`}
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            {pageNumbers.map((number) => (
                                <button
                                    key={number}
                                    className={`join-item w-10 p-2 cursor-pointer hover:text-gray-500 btn ${currentPage === number ? 'btn-active' : ''}`}
                                    onClick={() => paginate(number)}
                                >
                                    {number}
                                </button>
                            ))}
                            <button
                                className={`join-item w-10 p-2 cursor-pointer hover:text-gray-500 btn ${currentPage === pageNumbers.length ? 'disabled' : ''}`}
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === pageNumbers.length}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Checkout Modal */}
                {selectedProduct && (
                    <div className="fixed inset-0 flex justify-center items-center bg-transparent bg-opacity-20 z-50">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">অর্ডার দিন</h2>
                            <p className="text-gray-700">
                                <span className="text-gray-800 font-bold">পণ্য:</span> {selectedProduct.name}
                            </p>
                            <p className="text-gray-700">
                                <span className="text-gray-800 font-bold">মূল্য:</span> BDT {selectedProduct.salePrice || selectedProduct.regularPrice}
                            </p>

                            {/* Delivery charge display */}
                            {orderDetails?.location === "ঢাকার ভিতরে" && (
                                <p className="text-sm text-green-600 font-medium mt-1">ডেলিভারি চার্জঃ ৮০ টাকা</p>
                            )}
                            {orderDetails?.location === "ঢাকার বাইরে" && (
                                <p className="text-sm text-red-600 font-medium mt-1">ডেলিভারি চার্জঃ ১৩০ টাকা</p>
                            )}

                            <p className="text-gray-700">
                                <span className="text-gray-800 font-bold">ডেলিভারি মেথোড:</span> ক্যাশ অন ডেলিভারি
                            </p>

                            {/* Delivery location selector */}
                            <input
                                type="text"
                                placeholder="আপনার নাম"
                                className="input input-bordered w-full mt-3 p-2 bg-white rounded-xl"
                                required
                                value={orderDetails.name}
                                onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="আপনার ঠিকানা"
                                className="input input-bordered w-full mt-2 p-2 bg-white rounded-xl"
                                required
                                value={orderDetails.address}
                                onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="আপনার ফোন নাম্বার"
                                className="input input-bordered w-full mt-2 p-2 bg-white rounded-xl"
                                required
                                value={orderDetails.phone}
                                onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                            />
                            <select
                                className="input input-bordered w-full mt-3 p-2 bg-white rounded-xl"
                                required
                                onChange={(e) => setOrderDetails({ ...orderDetails, location: e.target.value })}
                                value={orderDetails.location}
                            >
                                <option value="">ডেলিভারি লোকেশন নির্বাচন করুন</option>
                                <option value="ঢাকার ভিতরে">ঢাকার ভিতরে</option>
                                <option value="ঢাকার বাইরে">ঢাকার বাইরে</option>
                            </select>

                            <div className="flex justify-between gap-3">
                                <button
                                    onClick={handleOrderSubmit}
                                    className="w-full mt-4 p-2 rounded-xl bg-white cursor-pointer text-blue-500 font-bold"
                                >
                                    অর্ডার দিন
                                </button>
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="w-full mt-4 p-2 rounded-xl bg-white cursor-pointer text-red-500 font-bold"
                                >
                                    বাদ দিন
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <Footer />
        </>
    );
}