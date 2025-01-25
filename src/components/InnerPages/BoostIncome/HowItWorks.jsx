import React, { useEffect, useState } from "react";
import Step1 from "/Step1.gif";
import Step2 from "/Step2.gif";
import Step3 from "/Step3.gif";
import Step4 from "/Step4.gif";
import Step5 from "/Step5.gif";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger every time the component comes into view
    threshold: 0.5, // Adjust the threshold as needed
  });

  useEffect(() => {
    let interval;
    if (inView) {
      setCurrentIndex(0); // Reset the animation when in view
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % gifs.length);
      }, 3000);
    }
    return () => clearInterval(interval); // Cleanup the interval
  }, [inView]);

  return (
    <div
      className="bg-[#F5F9FF] min-h-screen font-sf-pro pb-10"
      ref={ref} // Attach the ref to the container
    >
      <h1 className="font-meuthanies text-2xl md:text-4xl xl:text-6xl px-5 md:px-10 pt-5 md:pt-10">
        How it works
      </h1>
      <div className="flex justify-center items-center px-5">
        <div className="w-full max-w-6xl h-60 md:h-[400px] lg:h-[500px] xl:h-6xl 2xl:h-[750px] overflow-hidden relative lg:mt-20">
          <AnimatePresence>
            <motion.img
              key={currentIndex}
              src={gifs[currentIndex]}
              alt={`Step ${currentIndex + 1}`}
              className="absolute w-full h-full object-contain"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="md:flex hidden items-center md:mt-10 relative gap-5 xl:gap-8 px-5 xl:px-8 overflow-hidden ">
        <div className="w-full md:w-11/12 lg:w-11/12 h-[2px] bg-gray-300 absolute"></div>
        <motion.div
          className="w-full md:w-10/12 lg:w-11/12 h-[2px] bg-[#101010] absolute"
          animate={{
            width: `${((currentIndex + 1) / steps.length) * 96}%`,
          }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
        ></motion.div>
        <div className="flex justify-between md:w-5/6 lg:w-4/5 relative">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                onClick={() => setCurrentIndex(index)}
                className={`w-5 h-5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-[#101010] w-5 h-5 border-4 border-[#D9D9D9]"
                    : "bg-[#D9D9D9]"
                } 
                ${
                  index <= currentIndex
                    ? "bg-black w-5 h-5 border-4 border-[#D9D9D9]"
                    : "bg-[#D9D9D9]"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Steps Information */}
      <div className="md:flex gap-5 xl:gap-8 px-5 xl:px-8 md:mt-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="mb-4 border-gray-300 md:w-56 xl:w-60 2xl:w-[310px]"
          >
            <h3 className="text-sm font-bold text-gray-800 font-meuthanies">
              {step.title}
            </h3>
            <p className="text-gray-600 text-[13px] mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
