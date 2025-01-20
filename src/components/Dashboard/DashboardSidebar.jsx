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
      className={`fixed top-28 md:left-4 h-auto rounded-xl w-64 bg-white shadow-lg border border-gray-200 transform transition-transform duration-200 ease-in-out z-30 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-8 text-gray-900">Paxo Wealth</h1>
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.id
                    ? "bg-blue-50 text-customBlue"
                    : "text-gray-600 hover:bg-gray-50 hover:text-customBlue"
                }`}
              >
                <item.icon className={`${
                  location.pathname === item.id
                    ? "text-customBlue"
                    : "text-gray-500"
                }`} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-gray-200">
          <button
            className="flex items-center space-x-3 text-gray-600 hover:text-customBlue transition-colors w-full px-4 py-3 rounded-lg hover:bg-gray-50"
            onClick={handleSignOut}
          >
            <FaSignOutAlt />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardSidebar;