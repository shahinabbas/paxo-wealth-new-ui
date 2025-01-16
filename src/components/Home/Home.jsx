import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import BoostIncome from "./BoostIncome";
import DirectSave from "./DirectSave";
import RentRise from "./RentRise";
import Combined from "./Combined";

function Home() {
  const variants = {
    hidden: { x: "100vw" }, // Start off-screen (for sliding components)
    visible: (i) => ({
      x: 0, // Move to the center (for sliding components)
      transition: {
        delay: i * 3.5, // Delay between components for slower effect
        duration: 4.5, // Duration for smoother, slower animation
        type: "spring",
        stiffness: 40, // Slightly reduce stiffness for a gentler motion
      },
    }),
    exit: {
      x: "-100vw", // Exit to the left (for sliding components)
      transition: { duration: 0.8 },
    },
  };

  const firstComponentVariants = {
    visible: {
      opacity: 1, // Just fade in for the first component
      transition: { duration: 1.5 }, // Slight fade-in effect for the first component
    },
    hidden: { opacity: 0 }, // Start invisible
  };

  return (
    <div
      style={{
        overflow: "hidden",
        height: "110vh",
        position: "relative",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={firstComponentVariants}
        style={{
          position: "absolute",
          width: "100%",
        }}
      >
        <BoostIncome />
      </motion.div>

      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        style={{
          position: "absolute",
          width: "100%",
        }}
      >
        <RentRise />
      </motion.div>

      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        style={{
          position: "absolute",
          width: "100%",
        }}
      >
        <DirectSave />
      </motion.div>

      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        style={{
          position: "absolute",
          width: "100%",
        }}
      >
        <Combined />
      </motion.div>
    </div>
  );
}

export default Home;
