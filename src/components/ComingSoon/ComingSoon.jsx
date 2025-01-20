import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRocket, FaHome } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ComingSoon() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="text-center transform -translate-y-12 animate-fadeIn">
        <div className="flex justify-center mb-6">
          <AiOutlineLoading3Quarters className="text-6xl text-customGreen animate-spin" />
        </div>

        <h1 className="text-4xl font-bold mb-4 text-gray-800 animate-slideDown flex items-center justify-center gap-2">
          Coming Soon! <FaRocket className="text-customGreen animate-pulse" />
        </h1>

        <p className="text-lg mb-6 text-gray-600 animate-slideUp">
          We're working hard to bring something amazing!
        </p>

        <button
          className="px-6 py-2 text-gray-800 border-2 border-customGreen rounded-full
                   hover:scale-110 active:scale-95 transition-transform duration-200
                   hover:bg-customGreen group flex items-center gap-2 mx-auto"
          onClick={handleGoHome}
        >
          <span>Go Home</span>
          <FaHome className="text-lg text-customGreen group-hover:text-gray-800" />
        </button>
      </div>
    </div>
  );
}

export default ComingSoon;

/* Add these custom animations to your tailwind.config.js:

{
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in forwards',
        slideDown: 'slideDown 0.8s ease-out forwards',
        slideUp: 'slideUp 0.8s ease-out forwards'
      }
    }
  }
}
*/
