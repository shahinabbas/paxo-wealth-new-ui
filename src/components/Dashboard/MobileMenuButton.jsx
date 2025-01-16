import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const MobileMenuButton = ({ isOpen, onClick }) => {
  return (
    <button
      className="md:hidden fixed top-20 right-4 z-50 p-2 rounded-lg bg-gray-800"
      onClick={onClick}
    >
      {isOpen ? <FaTimes /> : <FaBars />}
    </button>
  );
};

export default MobileMenuButton;
