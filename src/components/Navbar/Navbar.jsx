import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { RxArrowTopRight, RxHamburgerMenu } from "react-icons/rx";
import { GlowingStarsBackgroundCardPreview } from "./GlowingStarsBackgroundCardPreview";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import PW from "/paxowealth.png";
import PW from "/PWnew.png";

import { FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");

  const handleClick = () => navigate("/");
  const handleDashboardClick = () => navigate("/dashboard");
  const handleLoginClick = () => navigate("/login");

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const renderAuthButton = () => {
    if (token && userName) {
      return (
        <div className="relative group">
          <div
            className="flex items-center gap-2 bg-customGreen text-black rounded-full text-sm font-semibold p-2 cursor-pointer"
            onClick={handleDashboardClick}
          >
            <FaUser />
            <p>{userName}</p>
          </div>
        </div>
      );
    }
    return (
      <div
        className="bg-black text-white rounded-full text-sm font-semibold p-2 cursor-pointer"
        onClick={handleLoginClick}
      >
        <p>Login/SignUp</p>
      </div>
    );
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="fixed top-2 left-0 w-full flex h-16 bg-transparent items-center justify-between px-4 z-50">
      <div
        className="flex justify-center items-center mt-2 cursor-pointer"
        onClick={handleClick}
      >
        <img src={PW} alt="Logo" className="w-44 h-38 md:ml-10 bg-cover" />
      </div>

      {/* Rest of the desktop menu code remains the same until the auth section */}

      <div className="relative hidden lg:flex">
        <div
          className={`relative flex  border w-[540px] h-12 border-gray-700 gap-8 px-6 rounded-xl justify-center items-center bg-transparent transition-all duration-300 ${
            openDropdown ? "border-b-0 rounded-b-none" : "rounded-xl"
          }`}
        >
          <div className="flex flex-col items-center cursor-pointer relative">
            <Link to="/boost-income" className="flex items-center">
              <h1 className="text-sm font-sf-pro">PAXO Products</h1>
            </Link>
          </div>
          <div>
            <h1 className="text-sm cursor-pointer font-sf-pro">
              ROI Calculator
            </h1>
          </div>
          <div className="flex flex-col items-center cursor-pointer relative">
            <div
              className="flex items-center"
              onMouseEnter={() => setOpenDropdown("company")} // Open dropdown on hover
            >
              <h1 className="text-sm font-sf-pro">Company</h1>
              <IoIosArrowDown
                className={`mt-1 ml-1 transform transition-transform ${
                  openDropdown === "company" ? "rotate-180" : ""
                }`}
              />
            </div>
            {/* Dropdown content */}
            <AnimatePresence>
              {openDropdown === "company" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`absolute w-[540px] top-[33px] -right-[154.5px] bg-white border border-gray-700 p-4 ${
                    openDropdown === "company"
                      ? "border-t-0 rounded-b-xl"
                      : "rounded-xl"
                  }`}
                  ref={dropdownRef}
                  onMouseEnter={() => setOpenDropdown("company")} // Keep open when hovering over the dropdown
                  onMouseLeave={() => setOpenDropdown(null)} // Close when mouse leaves the dropdown
                >
                  <div className="flex gap-5">
                    <GlowingStarsBackgroundCardPreview />
                    <div className="w-[250px] font-sf-pro">
                      <div className="bg-[linear-gradient(110deg,#333_0.6%,#222)] rounded-xl">
                        <div className="p-4">
                          <h1 className="text-white">Career</h1>
                          <div className="flex gap-1 w-[110px] rounded-full p-1 mt-[28px] ml-auto justify-center items-center text-[10px] bg-customYellow text-black">
                            <h1>Learn More</h1> <RxArrowTopRight />
                          </div>
                        </div>
                      </div>
                      <div className="bg-[linear-gradient(110deg,#333_0.6%,#222)] mt-4 rounded-xl">
                        <div className="p-4">
                          <h1 className="text-white">Blog</h1>
                          <div className="flex gap-1 w-[110px] rounded-full p-1 mt-[28px] ml-auto justify-center items-center text-[10px] bg-customYellow text-black">
                            <h1>Learn More</h1> <RxArrowTopRight />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div>
            <Link to="/contact-us">
              <h1 className="text-sm cursor-pointer font-sf-pro">Contact Us</h1>
            </Link>
          </div>
        </div>
      </div>

      {/* Location and Login */}
      <div className="gap-10 justify-center items-center text-white hidden lg:flex font-sf-pro">
        <div>
          <p className="text-sm">EN</p>
        </div>
        {renderAuthButton()}
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center gap-4">
        <div
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="cursor-pointer text-white"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {!isMobileMenuOpen && <RxHamburgerMenu className="text-2xl text-black" />}
          </motion.div>
        </div>
      </div>

      {/* Mobile menu content */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed h-screen top-0 right-0 w-[80%] bg-white text-black lg:hidden font-sf-pro z-50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
            >
              <div className="flex flex-col p-5 py-4 font-sf-pro relative">
                <div
                  className="absolute top-4 right-4 text-2xl cursor-pointer text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IoMdClose />
                </div>
                <img src={PW} alt="Logo" className="w-44 h-38 bg-cover" />
                {/* Mobile menu items */}
                <div className="py-2 mt-4 text-sm cursor-pointer">
                  <Link to="/boost-income">PAXO Products</Link>
                </div>
                <div className="py-2 text-sm cursor-pointer">
                  <Link to="/roi-calculator">ROI Calculator</Link>
                </div>
                <div
                  className="py-2 text-sm cursor-pointer"
                  onClick={() => toggleDropdown("company")}
                >
                  Company
                </div>
                {openDropdown === "company" && (
                  <div className="w-full py-2 bg-gray-800">
                    <div className="py-2 text-sm">
                      <Link to="/about-us">About Us</Link>
                    </div>
                    <div className="py-2 text-sm">
                      <Link to="/blog">Blog</Link>
                    </div>
                  </div>
                )}
                <div className="py-2 text-sm cursor-pointer">
                  <Link to="/contact-us">Contact Us</Link>
                </div>
                <div
                  className="py-2 text-sm cursor-pointer"
                  onClick={handleSignOut}
                >
                  <Link to="/contact-us">Sign Out</Link>
                </div>
                <div className="mt-4 flex justify-start">
                  {renderAuthButton()}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
