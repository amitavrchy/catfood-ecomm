"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddProductPage() {
    const [product, setProduct] = useState({
        name: "",
        regularPrice: "",
        salePrice: "",
        category: "",
        tags: "",
        description: "",
        image: null,
        stock: ""
    });

    const [variations, setVariations] = useState([{ name: "", value: "", stock: "" }]);

    // Handle input change for product details
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // Handle file upload
    const handleFileChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    // Handle variation changes (name, value, stock)
    const handleVariationChange = (index, e) => {
        const newVariations = [...variations];
        newVariations[index][e.target.name] = e.target.value;
        setVariations(newVariations);
    };

    // Add new variation
    const addVariation = () => {
        setVariations([...variations, { name: "", value: "", stock: "" }]);
    };

    // Remove variation
    const removeVariation = (index) => {
        setVariations(variations.filter((_, i) => i !== index));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("regularPrice", product.regularPrice);
        formData.append("salePrice", product.salePrice);
        formData.append("category", product.category);
        formData.append("tags", product.tags);
        formData.append("description", product.description);
        formData.append("stock", product.stock);
        formData.append("variations", JSON.stringify(variations));
        formData.append("image", product.image);

        const toastId = toast.loading("Adding product...");
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Product added successfully!", { id: toastId });
            } else {
                toast.error(data.error || "Failed to add product", { id: toastId });
            }
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
            <Toaster position="top-right" reverseOrder={false} />
            <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md"
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block font-medium">Regular Price (BDT)</label>
                            <input
                                type="number"
                                name="regularPrice"
                                value={product.regularPrice}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md"
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium">Sale Price (BDT)</label>
                            <input
                                type="number"
                                name="salePrice"
                                value={product.salePrice}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md"
                            placeholder="e.g. Electronics"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Tags (comma separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={product.tags}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md"
                            placeholder="e.g. gaming, console, new"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md"
                            placeholder="Total Stock Available"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Description</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md h-28"
                            placeholder="Enter product details"
                            required
                        ></textarea>
                    </div>
                </div>

                {/* Right Column */}
                {/* Right Column */}
                <div className="space-y-4">
                    <label className="block font-medium">Variations</label>
                    {variations.map((variation, index) => (
                        <div key={index} className="flex gap-3 items-center mb-2">
                            <input
                                type="text"
                                name="name"
                                value={variation.name}
                                onChange={(e) => handleVariationChange(index, e)}
                                className="w-1/4 p-2 border rounded-md"
                                placeholder="Size, Color..."
                                required
                            />
                            <input
                                type="text"
                                name="value"
                                value={variation.value}
                                onChange={(e) => handleVariationChange(index, e)}
                                className="w-1/4 p-2 border rounded-md"
                                placeholder="e.g. Large, Blue"
                                required
                            />
                            <input
                                type="number"
                                name="stock"
                                value={variation.stock}
                                onChange={(e) => handleVariationChange(index, e)}
                                className="w-1/4 p-2 border rounded-md"
                                placeholder="Stock"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeVariation(index)}
                                className="p-2 bg-red-500 text-white rounded-md"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addVariation}
                        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer"
                    >
                        + Add Variation
                    </button>
                </div>

                <div className="col-span-2">
                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md cursor-pointer">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
}
