"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Moderator", status: "Suspended" },
  { id: 3, name: "Amit Roy", email: "amit@example.com", role: "Customer", status: "Blocked" },
];

export default function AdminUserPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Customer", status: "Active" });

  // Open Edit Modal
  const handleEditClick = (user) => {
    setEditUser(user);
    setIsEditing(true);
  };

  // Open Add User Modal
  const handleAddUserClick = () => {
    setIsAdding(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsEditing(false);
    setEditUser(null);
    setIsAdding(false);
    setNewUser({ name: "", email: "", role: "Customer", status: "Active" });
  };

  // Handle User Update
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUsers = users.map((u) => (u.id === editUser.id ? editUser : u));
    setUsers(updatedUsers);
    toast.success("User updated successfully!");
    closeModal();
  };

  // Handle User Deletion
  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    toast.error("User deleted successfully!");
  };

  // Handle Search Filtering
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Handle New User Addition
  const handleAddUser = (e) => {
    e.preventDefault();
    const newUserEntry = { id: users.length + 1, ...newUser };
    setUsers([...users, newUserEntry]);
    toast.success("New user added successfully!");
    closeModal();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={handleAddUserClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add User
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
      </div>

      {/* User List */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
        {filteredUsers.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">
                    <span className={`px-2 py-1 rounded-md text-white ${
                      user.role === "Admin" ? "bg-blue-500" :
                      user.role === "Moderator" ? "bg-yellow-500" :
                      "bg-green-500"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3 border">
                    <span className={`px-2 py-1 rounded-md text-white ${
                      user.status === "Active" ? "bg-green-500" :
                      user.status === "Suspended" ? "bg-yellow-500" :
                      "bg-red-500"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3 border flex gap-3">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="px-3 py-2 bg-yellow-500 text-white rounded-md flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 3l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="px-3 py-2 bg-red-600 text-white rounded-md flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No users found.</p>
        )}
      </div>

      {/* Add New User Modal */}
      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold">Add New User</h2>
            <form onSubmit={handleAddUser} className="mt-4 space-y-4">
              <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full p-3 border rounded-md" required />
              <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full p-3 border rounded-md" required />
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="w-full p-3 border rounded-md">
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="Customer">Customer</option>
              </select>
              <select value={newUser.status} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })} className="w-full p-3 border rounded-md">
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Blocked">Blocked</option>
              </select>
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">Create User</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
