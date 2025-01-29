import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "/home.png"
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
    <div className="h-screen bg-white md:flex items-center justify-center " style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="text-center">
        <h1 className="md:text-6xl lg:text-7xl xl:text-8xl text-3xl md:pt-0 pt-52">
          Step into Smarter
          <br className="" /> Financial Growth with
          <br className="" />
          <span className="font-bold">PAXO Wealth</span>
        </h1>
        <hr className="md:w-[380px] lg:w-[449px] xl:w-[570px] w-3/4 mt-2 mx-auto border border-t-[0.5px] border-black" />
        <p className="text-black text-xl lg:text-2xl xl:text-3xl  mt-2 font-sf-pro">
          Transform your future with our core solutions
        </p>
      </div>
      {/* Counter in the bottom-right corner */}
      <div className="absolute xl:top-[82%] md:top-[80%] top-[60%] text-white lg:right-8 md:right-4 text-7xl xl:text-8xl 2xl:text-9xl font-meuthanies right-1/2 translate-x-1/2 md:translate-x-0 ">
        {counter}%
      </div>
    </div>
  );
}

export default Introduction;
