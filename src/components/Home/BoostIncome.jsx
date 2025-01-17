import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion for animations
import { Typewriter } from "react-simple-typewriter"; // Import Typewriter
import IncomeGif from "/Income_2.gif";

function BoostIncome() {
  const [startSecondLine, setStartSecondLine] = useState(false); // State to control second line

  // Animation variants for the title
  const titleVariants = {
    hidden: { x: "100vw", opacity: 0 }, // Start off-screen (right)
    visible: {
      x: 0, // Move to the fixed position
      opacity: 1, // Fade in
      transition: {
        type: "spring",
        stiffness: 60, // Smooth spring effect
        damping: 12, // Prevent overshooting
        duration: 1, // Animation duration
      },
    },
  };

  const gifVariants = {
    hidden: { y: "-100vh", opacity: 0 }, // Start off-screen (top)
    visible: {
      y: 0, // Move to the fixed position
      opacity: 1, // Fade in
      transition: {
        type: "spring",
        stiffness: 50, // Smooth spring effect
        damping: 10, // Prevent overshooting
        duration: 3, // Animation duration
      },
    },
  };
  // Trigger the second line after the first line finishes
  useEffect(() => {
    if (!startSecondLine) {
      // Delay the start of the second line after the first line
      const timer = setTimeout(() => {
        setStartSecondLine(true); // Set to true after a delay
      }, 4000); // 4 seconds for first line to finish typing (adjust as needed)

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [startSecondLine]);

  return (
    <div className="h-screen md:flex bg-white items-center ">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={gifVariants}
        className="md:w-[700px] md:h-[550px] md:mt-0 mt-10 flex items-center justify-center"
      >
        <img
          src={IncomeGif}
          alt="Boost Income"
          className="max-w-full max-h-full"
        />
      </motion.div>
      <div className="md:-ml-20 ml-14 md:mt-0 -mt-10">
        {/* Animated Title */}
        <motion.h1
          className="md:text-5xl  text-4xl mt-10 md:mt-0 font-meuthanies"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          Boost <span className="text-customBlue">Income</span>
        </motion.h1>
        {/* Typewriter Description - First Line */}
        <div className="text-black opacity-50 mt-4 font-sf-pro">
          <Typewriter
            words={["Experience immediate 48% growth with"]}
            loop={1} // Type once
            cursor={false} // Disable cursor
            typeSpeed={85} // Type each character at 55ms
            delaySpeed={500} // Optional delay before starting the next word
          />
        </div>

        {/* Typewriter Description - Second Line (Rendered after delay) */}
        <div className="text-black opacity-50 font-sf-pro">
          <Typewriter
            words={[" secure payouts."]}
            loop={1} // Type once
            cursor={false} // Disable cursor
            typeSpeed={100}
            delaySpeed={0} // Slight delay after first line
          />
        </div>
      </div>
    </div>
  );
}

export default BoostIncome;
