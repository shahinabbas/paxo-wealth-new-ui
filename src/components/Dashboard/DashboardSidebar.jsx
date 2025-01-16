import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaChartLine,
  FaWallet,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

const navigationItems = [
  { id: "/dashboard", label: "Portfolio", icon: FaHome },
  { id: "/dashboard/payouts", label: "Payouts", icon: FaWallet },
  { id: "/dashboard/analytics", label: "Growth Analytics", icon: FaChartLine },
  { id: "/dashboard/order", label: "Order", icon: AiOutlineShoppingCart },
  { id: "/dashboard/profile", label: "Profile", icon: FaUser },
];

const DashboardSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-28 md:left-4 h-auto rounded-xl w-64 bg-gray-800 transform transition-transform duration-200 ease-in-out z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-8">Paxo Wealth</h1>
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.id
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                <item.icon />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="p-6">
          <button
            className="flex items-center space-x-3 text-gray-400 hover:text-white"
            onClick={handleSignOut}
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardSidebar;
