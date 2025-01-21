import React from "react";
import { color, motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";

function AboutUsAnimation() {
  const text = "About Us • About Us • About Us •";

  const curveStyle = {
    fill: "transparent",
  };

  const textStyle = {
    fill: "black",
    fontSize: "12px",
    letterSpacing: "6px",
  };

  return (
    <div className="relative bg-transparent flex justify-center items-center w-screen md:w-40">
      <div className="animate-spin-slow absolute border-black w-40 h-40 rounded-full border-dashed border-2"></div>
      <div className="animate-spin-slow absolute border-black w-20 h-20 rounded-full border-dashed border-2"></div>
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "linear",
        }}
      >
        <svg className="w-[150px] h-[150px]">
          <path
            id="curve"
            d="M 15 75 A 60 60 0 1 1 15 77"
            style={curveStyle}
          ></path>
          <text>
            <textPath href="#curve" style={textStyle}>
              {text}
            </textPath>
          </text>
        </svg>
      </motion.div>
      <MdArrowOutward
        className="text-black absolute text-4xl"
        style={{
          animation: "spin 5s linear infinite",
        }}
      />
    </div>
  );
}

export default AboutUsAnimation;
