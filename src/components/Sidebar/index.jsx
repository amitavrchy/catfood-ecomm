"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBox, FaShoppingCart, FaUsers, FaUserShield, FaTachometerAlt } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Products", href: "/dashboard/products", icon: <FaBox /> },
    { name: "Orders", href: "/dashboard/orders", icon: <FaShoppingCart /> },
    { name: "Customers", href: "/dashboard/customers", icon: <FaUsers /> },
    { name: "Users", href: "/dashboard/users", icon: <FaUserShield /> },
  ];

  return (
    <div className="w-72 bg-gray-900 text-white h-screen p-6 flex flex-col">
      {/* Branding */}
      <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg transition duration-300 ${
                  pathname === item.href ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
