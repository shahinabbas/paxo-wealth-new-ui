import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import image2 from "/earn.png";
import { Link } from "react-router-dom";

function Earnings() {
  const [hovered, setHovered] = useState(false);
  const [animationDone, setAnimationDone] = useState(false); // Track if animation is done
  const [isMobile, setIsMobile] = useState(false); // Check for mobile screen

  // Check screen size on component mount
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  const handleMouseEnter = () => {
    if (!animationDone && !isMobile) {
      setHovered(true);
    }
  };

  const handleAnimationComplete = () => {
    setAnimationDone(true); // Mark animation as complete
  };

  return (
    <div
      className="md:min-h-screen"
      onMouseEnter={handleMouseEnter} // Trigger animation only if it's not already done
    >
      <div className="relative">
        <img src={image2} className="transform-none" alt="Earnings" />

        {/* Animated "Start Earning" Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          {(!isMobile && (hovered || animationDone)) && ( // Show animation only on non-mobile
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delay: 0.2, duration: 1 },
                },
              }}
              className="relative"
              onAnimationComplete={handleAnimationComplete} // Mark animation as complete
            >
              {/* Top-to-center animation */}
              <motion.h1
                initial={{ y: -100, opacity: 0.2, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-[#6200EE] font-meuthanies text-[40px] md:text-[113px] top-0"
              >
                Start Earning
              </motion.h1>

              {/* Bottom-to-center animation */}
              <motion.h1
                initial={{ y: 100, opacity: 0.2, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.1 }}
                className="absolute text-[#6200EE] font-meuthanies text-[40px] md:text-[113px] top-0"
              >
                Start Earning
              </motion.h1>

              {/* Fading layer */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                className="absolute text-[#6200EE] font-meuthanies text-[40px] md:text-[113px] top-0"
              >
                Start Earning
              </motion.h1>
            </motion.div>
          )}
          {isMobile && ( // Display static content on mobile
            <h1 className="text-[#6200EE] font-meuthanies text-[40px] md:text-[113px]">
              Start Earning
            </h1>
          )}
        </div>
      </div>

      {/* Subtext and Button */}
      <div className="justify-center text-center p-4 flex -mt-10 font-sf-pro">
        <div>
          <h1 className="font-sf-pro md:text-3xl">
            Guaranteed Growth, Hassle-Free <br />
            Income, and Exclusive Deals.
          </h1>
          <div className="mt-6 mb-8 md:mb-20">
            <Link to="/boost-income" className="hover:underline">
              <div className="bg-customYellow rounded-full inline-flex items-center justify-center space-x-2 p-2 px-8">
                <p className="text-black font-semibold text-xl">
                  Start Earning
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Earnings;
