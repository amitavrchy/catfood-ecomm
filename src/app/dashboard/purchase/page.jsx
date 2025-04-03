"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch, FaEye, FaTrash, FaTimes } from "react-icons/fa";

const initialPurchases = [
  { id: 1, user: "John Doe", total: 3200.00, items: ["Laptop", "Mouse"], date: "2024-04-08" },
  { id: 2, user: "Jane Smith", total: 8500.00, items: ["Smartphone", "Headphones"], date: "2024-04-10" },
  { id: 3, user: "Amit Roy", total: 14500.00, items: ["Gaming Console", "Controller"], date: "2024-04-02" },
];

export default function AdminPurchaseHistoryPage() {
  const [purchases, setPurchases] = useState(initialPurchases);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isViewing, setIsViewing] = useState(false);
  const [viewPurchase, setViewPurchase] = useState(null);

  // Open View Modal
  const handleViewClick = (purchase) => {
    setViewPurchase(purchase);
    setIsViewing(true);
  };

  // Close View Modal
  const closeModal = () => {
    setIsViewing(false);
    setViewPurchase(null);
  };

  // Handle Purchase Deletion
  const deletePurchase = (id) => {
    const updatedPurchases = purchases.filter(purchase => purchase.id !== id);
    setPurchases(updatedPurchases);
    toast.error("Purchase record deleted successfully!");
  };

  // Apply Filter
  const filterPurchases = () => {
    const now = new Date();
    return purchases.filter((purchase) => {
      const purchaseDate = new Date(purchase.date);

      if (filter === "Day") {
        return purchaseDate.toDateString() === now.toDateString();
      } else if (filter === "Week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return purchaseDate >= oneWeekAgo;
      } else if (filter === "Month") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return purchaseDate >= oneMonthAgo;
      }
      return true; // Show all if no filter is applied
    });
  };

  const filteredPurchases = filterPurchases().filter(purchase =>
    purchase.user.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate Total Amount
  const totalAmount = filteredPurchases.reduce((sum, purchase) => sum + purchase.total, 0).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Purchase History</h1>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search purchases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-2/3 p-3 border rounded-md"
        />
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 border rounded-md"
        >
          <option value="All">All</option>
          <option value="Day">Last Day</option>
          <option value="Week">Last Week</option>
          <option value="Month">Last Month</option>
        </select>
      </div>

      {/* Total Summary */}
      <div className="bg-gray-100 p-5 rounded-lg shadow-md mb-4">
        <h3 className="text-xl font-bold">Total Purchases: BDT {totalAmount}</h3>
      </div>

      {/* Purchase List */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
        {filteredPurchases.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">User</th>
                <th className="p-3 border">Total Amount</th>
                <th className="p-3 border">Items</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map(purchase => (
                <tr key={purchase.id} className="hover:bg-gray-100">
                  <td className="p-3 border">{purchase.user}</td>
                  <td className="p-3 border">BDT {purchase.total.toFixed(2)}</td>
                  <td className="p-3 border">{purchase.items.join(", ")}</td>
                  <td className="p-3 border">{purchase.date}</td>
                  <td className="p-3 border flex gap-3">
                    <button
                      onClick={() => handleViewClick(purchase)}
                      className="px-3 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2"
                    >
                      <FaEye /> View
                    </button>
                    <button
                      onClick={() => deletePurchase(purchase.id)}
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
          <p className="text-gray-500 text-center">No purchase history found.</p>
        )}
      </div>

      {/* View Purchase Modal */}
      {isViewing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Purchase Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <p><strong>User:</strong> {viewPurchase.user}</p>
              <p><strong>Total Amount:</strong> BDT {viewPurchase.total.toFixed(2)}</p>
              <p><strong>Items Purchased:</strong> {viewPurchase.items.join(", ")}</p>
              <p><strong>Date:</strong> {viewPurchase.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
