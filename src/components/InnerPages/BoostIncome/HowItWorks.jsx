import React, { useEffect, useState } from "react";
import Step1 from "/Step1.gif";
import Step2 from "/Step2.gif";
import Step3 from "/Step3.gif";
import Step4 from "/Step4.gif";
import Step5 from "/Step5.gif";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Explore Verified Properties",
    description:
      "Browse through premium, carefully curated real estate options backed by verified assets to ensure security and transparency.",
  },
  {
    title: "Activate Your Boost Plan",
    description:
      "Select a growth plan that aligns with your financial goals and start your journey instantly.",
  },
  {
    title: "Pre-Verified Matching",
    description:
      "Our system connects your selected opportunity with pre-verified participants, ensuring a smooth and efficient process.",
  },
  {
    title: "Start Earning Immediately",
    description:
      "Begin receiving guaranteed monthly payouts from day one, tracked and managed through your personalized dashboard.",
  },
  {
    title: "Monitor Progress",
    description:
      "Use the PAXO Wealth dashboard to track your earnings, agreements, and overall growth effortlessly in real time.",
  },
];
const gifs = [Step1, Step2, Step3, Step4, Step5];

function HowItWorks() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 3000); // Change GIF every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F5F9FF] min-h-screen pt-10 pb-10 md:overflow-hidden">
      <div className="md:px-20 px-5">
        <h1 className="font-meuthanies xl:text-6xl text-4xl md:pt-10 xl:pt-10 xl:ml-20">
          How it works!
        </h1>

        {/* GIF Section */}
        <div className="flex justify-center mt-10">
          <motion.img
            key={currentIndex} 
            src={gifs[currentIndex]}
            alt={`Step ${currentIndex + 1}`}
            className="size-3/4 h-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 4,  }}
          />
        </div>
      </div>

      {/* Steps and Progress Line */}
      <div className="relative md:mx-auto px-7 p-4 mt-16 max-w-5xl">
        <motion.div
          className="absolute top-1/2 h-1 bg-gray-300"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentIndex / (gifs.length - 1)) * 100}%` }}
          transition={{ duration: 2, ease: "easeInOut" }}
        ></motion.div>

        {/* Step Indicators */}
        <div className="relative flex justify-between items-center">
          {gifs.map((_, index) => (
            <div
              key={index}
              className={`relative w-4 h-4 rounded-full flex items-center justify-center shadow-md md:w-6 md:h-6 xl:w-12 xl:h-12 ${
                index === currentIndex
                  ? "bg-black border-4 text-white"
                  : "bg-white border-2 text-gray-500"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Steps Description */}
      <div className="md:mx-auto px-7 mt-10">
        <div className="md:flex md:space-y-0 space-y-10 justify-between gap-x-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start transition-opacity duration-500 "
            >
              <div className="flex flex-col">
                <h3 className="md:text-[15px] xl:text-[18px] text-xl font-meuthanies text-black">
                  {step.title}
                </h3>
                <p className="font-sf-pro mt-2 text-[12px] xl:text-[15px] xl:w-72 md:w-56 text-black">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
