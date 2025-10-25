import React from "react";
import { Home, CreditCard, Settings, BarChart2 } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard" },
    { icon: <CreditCard size={20} />, label: "Payments" },
    { icon: <BarChart2 size={20} />, label: "Analytics" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 p-5 flex flex-col">
      <h1 className="text-2xl font-bold text-blue-600 mb-10">SmartPay</h1>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
