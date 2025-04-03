"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaTrash, FaMoneyBillWave, FaTimes } from "react-icons/fa";

const initialTransactions = [
  { id: 1, user: "John Doe", amount: "BDT 3200.00", method: "Credit Card", status: "Completed", date: "2024-04-08" },
  { id: 2, user: "Jane Smith", amount: "BDT 8500.00", method: "PayPal", status: "Pending", date: "2024-04-10" },
  { id: 3, user: "Amit Roy", amount: "BDT 14500.00", method: "Bank Transfer", status: "Failed", date: "2024-04-12" },
];

export default function AdminTransactionPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);

  // Open Edit Modal
  const handleEditClick = (transaction) => {
    setEditTransaction(transaction);
    setIsEditing(true);
  };

  // Close Edit Modal
  const closeModal = () => {
    setIsEditing(false);
    setEditTransaction(null);
  };

  // Handle Transaction Update
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTransactions = transactions.map(t =>
      t.id === editTransaction.id ? editTransaction : t
    );
    setTransactions(updatedTransactions);
    toast.success("Transaction updated successfully!");
    closeModal();
  };

  // Handle Transaction Deletion
  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
    toast.error("Transaction deleted successfully!");
  };

  // Handle Search Filtering
  const filteredTransactions = transactions.filter(transaction =>
    transaction.user.toLowerCase().includes(search.toLowerCase()) ||
    transaction.method.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Payment & Transaction Management</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
      </div>

      {/* Transaction List */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
        {filteredTransactions.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">User</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Payment Method</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(transaction => (
                <tr key={transaction.id} className="hover:bg-gray-100">
                  <td className="p-3 border">{transaction.user}</td>
                  <td className="p-3 border">{transaction.amount}</td>
                  <td className="p-3 border">{transaction.method}</td>
                  <td className="p-3 border">
                    <span className={`px-2 py-1 rounded-md text-white ${
                      transaction.status === "Completed" ? "bg-green-500" :
                      transaction.status === "Pending" ? "bg-yellow-500" :
                      transaction.status === "Failed" ? "bg-red-500" :
                      "bg-blue-500"
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="p-3 border">{transaction.date}</td>
                  <td className="p-3 border flex gap-3">
                    <button
                      onClick={() => handleEditClick(transaction)}
                      className="px-3 py-2 bg-yellow-500 text-white rounded-md flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
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
          <p className="text-gray-500 text-center">No transactions found.</p>
        )}
      </div>

      {/* Edit Transaction Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Transaction</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <div>
                <label className="block font-medium">Payment Method</label>
                <input
                  type="text"
                  value={editTransaction.method}
                  onChange={(e) => setEditTransaction({ ...editTransaction, method: e.target.value })}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div>
                <label className="block font-medium">Status</label>
                <select
                  value={editTransaction.status}
                  onChange={(e) => setEditTransaction({ ...editTransaction, status: e.target.value })}
                  className="w-full p-3 border rounded-md"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">
                Update Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
