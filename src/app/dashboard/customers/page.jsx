"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const initialCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "+88012345678", status: "Active", registered: "2024-02-01" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+88098765432", status: "Suspended", registered: "2024-03-10" },
  { id: 3, name: "Amit Roy", email: "amit@example.com", phone: "+88011122233", status: "Blocked", registered: "2024-01-25" },
];

export default function AdminCustomerPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

  // Open Edit Modal
  const handleEditClick = (customer) => {
    setEditCustomer(customer);
    setIsEditing(true);
  };

  // Close Edit Modal
  const closeModal = () => {
    setIsEditing(false);
    setEditCustomer(null);
  };

  // Handle Customer Update
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedCustomers = customers.map(c =>
      c.id === editCustomer.id ? editCustomer : c
    );
    setCustomers(updatedCustomers);
    toast.success("Customer updated successfully!");
    closeModal();
  };

  // Handle Customer Deletion
  const deleteCustomer = (id) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id);
    setCustomers(updatedCustomers);
    toast.error("Customer deleted successfully!");
  };

  // Handle Search Filtering
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Customer Management</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
      </div>

      {/* Customer List */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
        {filteredCustomers.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Registered</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-100">
                  <td className="p-3 border">{customer.name}</td>
                  <td className="p-3 border">{customer.email}</td>
                  <td className="p-3 border">{customer.phone}</td>
                  <td className="p-3 border">
                    <span className={`px-2 py-1 rounded-md text-white ${customer.status === "Active" ? "bg-green-500" : customer.status === "Suspended" ? "bg-yellow-500" : "bg-red-500"}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-3 border">{customer.registered}</td>
                  <td className="p-3 border flex gap-3">
                    <button
                      onClick={() => handleEditClick(customer)}
                      className="px-3 py-2 bg-yellow-500 text-white rounded-md flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteCustomer(customer.id)}
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
          <p className="text-gray-500 text-center">No customers found.</p>
        )}
      </div>

      {/* Edit Customer Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Customer</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  value={editCustomer.name}
                  onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  value={editCustomer.email}
                  onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div>
                <label className="block font-medium">Phone</label>
                <input
                  type="text"
                  value={editCustomer.phone}
                  onChange={(e) => setEditCustomer({ ...editCustomer, phone: e.target.value })}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">
                Update Customer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
