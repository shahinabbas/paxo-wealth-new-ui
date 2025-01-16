import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Updated hook for navigation

function ComingSoon() {
  const navigate = useNavigate(); // Using the useNavigate hook for navigation

  const handleGoHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-white">Coming Soon!</h1>
        <p className="text-lg mb-6 text-white">
          We're working hard to bring something amazing!
        </p>

        {/* Button to go home */}
        <motion.button
          className="px-6 py-2 text-white border border-purple-900 rounded-full"
          onClick={handleGoHome}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Go Home
        </motion.button>
      </motion.div>
    </div>
  );
}

export default ComingSoon;
