import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Introduction() {
  const [counter, setCounter] = useState(0);
  const speed = 35; // Adjust this value to control the speed (lower = faster)

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, speed); // Use the speed variable here
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="h-screen bg-white md:flex items-center justify-center ">
      <div className="text-center">
        <h1 className="md:text-6xl lg:text-7xl xl:text-8xl text-3xl font-meuthanies md:mt-0 mt-40">
          Step into Smarter
          <br className="" /> Financial Growth with
          <br className="" />
          <span className="text-customBlue">PAXO Wealth</span>
        </h1>
        <hr className="md:w-[380px] lg:w-[432px] xl:w-[570px] w-3/4 mt-2 mx-auto border border-t-1 border-black" />
        <p className="text-black text-xl lg:text-2xl xl:text-3xl opacity-50 mt-2 font-sf-pro">
          Transform your future with our core solutions
        </p>
      </div>
      {/* Counter in the bottom-right corner */}
      <div className="absolute xl:top-[84%] md:top-[80%] top-96 text-black lg:right-8 md:right-4 text-6xl xl:text-7xl font-meuthanies right-1/2 translate-x-1/2 md:translate-x-0 ">
        {counter}%
      </div>
    </div>
  );
}

export default Introduction;
