import React, { useState, useEffect } from "react";
import Financial from "/financial-advisor.gif";

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
    <div className="md:h-screen bg-white md:flex items-center justify-center ">
      <div className="text-center">
        <h1 className="md:text-6xl text-3xl font-meuthanies md:mt-0 mt-40">
          Step into Smarter
          <br className="" /> Financial Growth with
          <br className="" />
          <span className="text-customBlue">PAXO Wealth</span>
        </h1>
        <hr className="md:w-[380px] w-3/4 mt-2 mx-auto border border-t-1 border-black" />
        <p className="text-black text-xl opacity-50 mt-2 font-sf-pro">
          Transform your future with our core solutions
        </p>
      </div>
      {/* Counter in the bottom-right corner */}
      <div
        className="absolute  top-[420px] text-black  md:right-4 text-6xl font-meuthanies 
                right-1/2 translate-x-1/2 md:translate-x-0 "
      >
        {counter}%
      </div>
    </div>
  );
}

export default Introduction;
