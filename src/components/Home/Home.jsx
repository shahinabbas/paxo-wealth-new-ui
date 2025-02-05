import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import BoostIncome from "./BoostIncome";
import DirectSave from "./DirectSave";
import RentRise from "./RentRise";
import Combined from "./Combined";
import Introduction from "./Introduction";

function Home() {
  const variants = {
    hidden: { x: "100vw" },
    visible: (i) => ({
      x: 0,
      transition: {
        delay: i * 1,
        duration: 1,
        type: "spring",
        stiffness: 40,
      },
    }),
    exit: {
      x: "-100vw",
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="overflow-hidden relative h-[190vh] md:h-screen">
      {/* Introduction component */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        custom={0}
        style={{
          position: "absolute",
          width: "100%",
        }}
      >
        <Introduction />
      </motion.div>

      

      {/* Combined component */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        custom={4}
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
