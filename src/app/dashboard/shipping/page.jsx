"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaTrash, FaTruck, FaTimes } from "react-icons/fa";

const initialShipments = [
  { id: 1, trackingId: "SHIP12345", carrier: "FedEx", status: "Shipped", estimatedDelivery: "2024-04-08" },
  { id: 2, trackingId: "SHIP67890", carrier: "DHL", status: "In Transit", estimatedDelivery: "2024-04-10" },
  { id: 3, trackingId: "SHIP54321", carrier: "UPS", status: "Out for Delivery", estimatedDelivery: "2024-04-12" },
];

export default function AdminShippingPage() {
  const [shipments, setShipments] = useState(initialShipments);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editShipment, setEditShipment] = useState(null);

  // Open Edit Modal
  const handleEditClick = (shipment) => {
    setEditShipment(shipment);
    setIsEditing(true);
  };

  // Close Edit Modal
  const closeModal = () => {
    setIsEditing(false);
    setEditShipment(null);
  };

  // Handle Shipment Update
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedShipments = shipments.map(s =>
      s.id === editShipment.id ? editShipment : s
    );
    setShipments(updatedShipments);
    toast.success("Shipment updated successfully!");
    closeModal();
  };

  // Handle Shipment Deletion
  const deleteShipment = (id) => {
    const updatedShipments = shipments.filter(shipment => shipment.id !== id);
    setShipments(updatedShipments);
    toast.error("Shipment deleted successfully!");
  };

  // Handle Search Filtering
  const filteredShipments = shipments.filter(shipment =>
    shipment.trackingId.toLowerCase().includes(search.toLowerCase()) ||
    shipment.carrier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Shipping & Delivery Management</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search shipments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
      </div>

      {/* Shipment List */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
        {filteredShipments.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">Tracking ID</th>
                <th className="p-3 border">Carrier</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Estimated Delivery</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map(shipment => (
                <tr key={shipment.id} className="hover:bg-gray-100">
                  <td className="p-3 border">{shipment.trackingId}</td>
                  <td className="p-3 border">{shipment.carrier}</td>
                  <td className="p-3 border">
                    <span className={`px-2 py-1 rounded-md text-white ${
                      shipment.status === "Shipped" ? "bg-blue-500" :
                      shipment.status === "In Transit" ? "bg-yellow-500" :
                      shipment.status === "Out for Delivery" ? "bg-orange-500" :
                      "bg-green-500"
                    }`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td className="p-3 border">{shipment.estimatedDelivery}</td>
                  <td className="p-3 border flex gap-3">
                    <button
                      onClick={() => handleEditClick(shipment)}
                      className="px-3 py-2 bg-yellow-500 text-white rounded-md flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteShipment(shipment.id)}
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
          <p className="text-gray-500 text-center">No shipments found.</p>
        )}
      </div>

      {/* Edit Shipment Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Shipment</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <div>
                <label className="block font-medium">Carrier</label>
                <input
                  type="text"
                  value={editShipment.carrier}
                  onChange={(e) => setEditShipment({ ...editShipment, carrier: e.target.value })}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div>
                <label className="block font-medium">Status</label>
                <select
                  value={editShipment.status}
                  onChange={(e) => setEditShipment({ ...editShipment, status: e.target.value })}
                  className="w-full p-3 border rounded-md"
                >
                  <option value="Shipped">Shipped</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">
                Update Shipment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
