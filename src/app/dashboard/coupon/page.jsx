"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const initialCoupons = [
  { id: 1, code: "WELCOME10", discount: "10%", usageCount: 45, expires: "2024-12-31" },
  { id: 2, code: "SUMMER25", discount: "25%", usageCount: 20, expires: "2024-08-01" },
  { id: 3, code: "VIP50", discount: "50%", usageCount: 5, expires: "2024-07-15" },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editCoupon, setEditCoupon] = useState(null);

  // Open Edit Modal
  const handleEditClick = (coupon) => {
    setEditCoupon(coupon);
    setIsEditing(true);
  };

  // Close Edit Modal
  const closeModal = () => {
    setIsEditing(false);
    setEditCoupon(null);
  };

  // Handle Coupon Update
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedCoupons = coupons.map(c =>
      c.id === editCoupon.id ? editCoupon : c
    );
    setCoupons(updatedCoupons);
    toast.success("Coupon updated successfully!");
    closeModal();
  };

  // Handle Coupon Deletion
  const deleteCoupon = (id) => {
    const updatedCoupons = coupons.filter(coupon => coupon.id !== id);
    setCoupons(updatedCoupons);
    toast.error("Coupon deleted successfully!");
  };

  // Handle Search Filtering
  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Discounts & Coupons Management</h1>
        <button 
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
        >
          <FaPlus /> Add Coupon
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search coupons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
      </div>

      {/* Coupon List */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
        {filteredCoupons.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">Code</th>
                <th className="p-3 border">Discount</th>
                <th className="p-3 border">Usage Count</th>
                <th className="p-3 border">Expires</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map(coupon => (
                <tr key={coupon.id} className="hover:bg-gray-100">
                  <td className="p-3 border">{coupon.code}</td>
                  <td className="p-3 border">{coupon.discount}</td>
                  <td className="p-3 border">{coupon.usageCount}</td>
                  <td className="p-3 border">{coupon.expires}</td>
                  <td className="p-3 border flex gap-3">
                    <button
                      onClick={() => handleEditClick(coupon)}
                      className="px-3 py-2 bg-yellow-500 text-white rounded-md flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteCoupon(coupon.id)}
                      className="px-3 py-2 bg-red-600 text-white rounded-md flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No coupons found.</p>
        )}
      </div>

      {/* Edit Coupon Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{editCoupon ? "Edit Coupon" : "Add Coupon"}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <div>
                <label className="block font-medium">Coupon Code</label>
                <input
                  type="text"
                  value={editCoupon?.code || ""}
                  onChange={(e) => setEditCoupon({ ...editCoupon, code: e.target.value })}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-medium">Discount (%)</label>
                  <input
                    type="text"
                    value={editCoupon?.discount || ""}
                    onChange={(e) => setEditCoupon({ ...editCoupon, discount: e.target.value })}
                    className="w-full p-3 border rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-medium">Usage Count</label>
                  <input
                    type="number"
                    value={editCoupon?.usageCount || ""}
                    onChange={(e) => setEditCoupon({ ...editCoupon, usageCount: e.target.value })}
                    className="w-full p-3 border rounded-md"
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">
                {editCoupon ? "Update Coupon" : "Create Coupon"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
