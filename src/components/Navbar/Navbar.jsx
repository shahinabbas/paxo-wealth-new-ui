import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { RxArrowTopRight, RxHamburgerMenu } from "react-icons/rx";
import { GlowingStarsBackgroundCardPreview } from "./GlowingStarsBackgroundCardPreview";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import PW from "/paxowealth.png";
import PW from "/PaxoRed.png";
import axios from "axios";

function Navbar({ setIsSidebarOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUserData] = useState(null);
  const apiURL = process.env.REACT_APP_API_URL;

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

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${apiURL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setUserData(response.data);
      localStorage.setItem("name", response?.data?.username);
      localStorage.setItem("kycStatus", response?.data?.isKycVerified);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  useEffect(() => {
    setIsSidebarOpen(isMobileMenuOpen);
  }, [isMobileMenuOpen, setIsSidebarOpen]);

  useEffect(() => {
    fetchUserData();
  }, [apiURL, token]);

  useEffect(() => {
    fetchUserData();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const renderAuthButton = () => {
    if (token && user) {
      return (
        <div className="relative group">
          <div
            className="flex items-center gap-2 bg-customGreen text-black rounded-full text-sm font-semibold p-2 px-6  cursor-pointer"
            onClick={handleDashboardClick}
          >
            <FaUser />
            <p>{user?.username || "user"}</p>
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
    <div className="fixed top-0 left-0 w-full flex h-16 items-center justify-between px-4 z-50 bg-[#FFFFFF99] rounded-md bg-clip-padding backdrop-filter backdrop-blur-[10px] bg-opacity-10 ">
      <div
        className="flex justify-center items-center mt-2 cursor-pointer"
        onClick={handleClick}
      >
        <img src={PW} alt="Logo" className="w-40 md:ml-10 bg-cover" />
      </div>

      {/* Rest of the desktop menu code remains the same until the auth section */}

      <div className="relative hidden lg:flex">
        <div className="relative flex   w-[540px] h-12 gap-8 px-6 rounded-xl justify-center items-center bg-transparent transition-all duration-300">
          <div className="flex flex-col items-center cursor-pointer relative">
            <Link to="/boost-income" className="flex items-center">
              <h1 className="text-sm font-sf-pro">PAXO Products</h1>
            </Link>
          </div>
          <div>
            <Link to="/roi-calculator">
              <h1 className="text-sm cursor-pointer font-sf-pro">
                ROI Calculator
              </h1>
            </Link>
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
                  className="absolute w-[540px] top-[42px] -right-[154.5px] p-4 bg-[#FFFFFF99]  bg-clip-padding backdrop-filter backdrop-blur-[10px] bg-opacity-10"
                  ref={dropdownRef}
                  onMouseEnter={() => setOpenDropdown("company")}
                  onMouseLeave={() => setOpenDropdown(null)}
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
        {/* <div>
          <p className="text-sm">EN</p>
        </div> */}
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
            {!isMobileMenuOpen && (
              <RxHamburgerMenu className="text-2xl text-black" />
            )}
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
              className="fixed h-screen top-0 right-0 w-[80%] bg-white text-black lg:hidden font-sf-pro z-[45]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
            >
              <div className="flex flex-col font-sf-pro relative">
                <div
                  className="absolute top-4 right-4 text-2xl cursor-pointer text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IoMdClose />
                </div>
                <img src={PW} alt="Logo" className="w-40 p-5 bg-cover" />
                {/* Mobile menu items */}
                <div className="px-5">
                  <div className="py-2 text-sm cursor-pointer">
                    <Link
                      to="/boost-income"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      PAXO Products
                    </Link>
                  </div>
                  <div className="py-2 text-sm cursor-pointer">
                    <Link
                      to="/roi-calculator"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      ROI Calculator
                    </Link>
                  </div>
                  <div className="py-2 text-sm cursor-pointer">
                    <Link
                      to="/about-us"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About Us{" "}
                    </Link>
                  </div>
                  <div className="py-2 text-sm cursor-pointer">
                    <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>
                      Blog{" "}
                    </Link>
                  </div>
                  <div className="py-2 text-sm cursor-pointer">
                    <Link
                      to="/contact-us"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </div>
                  <div
                    className="py-2 text-sm cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <Link
                      to="/contact-us"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Out
                    </Link>
                  </div>
                  <div
                    className="mt-4 flex justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {renderAuthButton()}
                  </div>
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
