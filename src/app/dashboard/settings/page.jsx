"use client";
import { useState } from "react";

export default function AdminSettingsPage() {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Settings</h1>
      </div>

      {/* Account Settings */}
      <div className="bg-gray-100 p-5 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">Account Settings</h3>
        <div className="mt-4 space-y-4">
          <label className="block font-medium">Admin Name</label>
          <input type="text" placeholder="Enter name" className="w-full p-3 border rounded-md" />
          <label className="block font-medium">Email</label>
          <input type="email" placeholder="Enter email" className="w-full p-3 border rounded-md" />
          <label className="block font-medium">Password</label>
          <input type="password" placeholder="Enter new password" className="w-full p-3 border rounded-md" />
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md">Update Profile</button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-gray-100 p-5 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">Security Settings</h3>
        <div className="mt-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={twoFactorAuth} onChange={() => setTwoFactorAuth(!twoFactorAuth)} />
            Enable Two-Factor Authentication (2FA)
          </label>
        </div>
        <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md">Save Changes</button>
      </div>

      {/* Notification Preferences */}
      <div className="bg-gray-100 p-5 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">Notification Preferences</h3>
        <div className="mt-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
            Receive Email & App Notifications
          </label>
        </div>
        <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md">Save Preferences</button>
      </div>

      {/* System Settings */}
      <div className="bg-gray-100 p-5 rounded-lg shadow-md">
        <h3 className="text-xl font-bold flex items-center gap-2">System Settings</h3>
        <div className="mt-4 space-y-4">
          <label className="block font-medium">Language</label>
          <select className="w-full p-3 border rounded-md">
            <option value="English">English</option>
            <option value="Bangla">Bangla</option>
          </select>
          <label className="block font-medium">Currency</label>
          <select className="w-full p-3 border rounded-md">
            <option value="BDT">BDT</option>
            <option value="USD">USD</option>
          </select>
          <label className="block font-medium">Theme</label>
          <div className="flex gap-4">
            <button onClick={() => setTheme("light")} className={`px-6 py-3 rounded-md flex items-center gap-2 ${theme === "light" ? "bg-yellow-500 text-white" : "bg-gray-300"}`}>
              Light Mode
            </button>
            <button onClick={() => setTheme("dark")} className={`px-6 py-3 rounded-md flex items-center gap-2 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-300"}`}>
              Dark Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
