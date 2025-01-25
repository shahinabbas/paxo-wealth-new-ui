import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";

export const StickyScroll = ({ content }) => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionsRef = useRef([]);

  const handleButtonClick = (index) => {
    setActiveCard(index);
  };

  return (
    <div className="font-sf-pro flex flex-col relative bg- rounded-md overflow-hidden">
      {/* Buttons for Mobile View */}
      <div className="flex md:hidden justify-center space-x-4 py-4  px-4">
        {content.map((item, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`px-4 py-2 rounded-lg font-meuthanies ${
              activeCard === index ? "bg-[#0056E0] text-white" : "bg-white"
            } font-semibold`}
          >
            {item.buttonLabel}
          </button>
        ))}
      </div>

      {/* Main Container */}
      <div className="md:h-[30rem] md:pl-20 flex relative md:space-x-20 rounded-md md:p-6">
        {/* Sticky Buttons for Desktop View */}
        <div className="sticky top-10 flex-col md:space-y-4 bg-[#024EC880] p-10 h-60 rounded-lg hidden md:flex">
          {content.map((item, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              className={`w-full px-10 text-left py-2 rounded-lg font-meuthanies ${
                activeCard === index ? "bg-white text-black" : "bg-transparent text-white"
              } font-semibold`}
            >
              {item.buttonLabel}
            </button>
          ))}
        </div>

        {/* Content Titles and Descriptions */}
        <div className="relative flex items-start md:px-4">
          <div className="max-w-2xl px-4">
            {content.map((item, index) => (
              <div
                key={item.title + index}
                ref={(el) => (sectionsRef.current[index] = el)} // Assign refs
              >
                {/* Title Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                    y: activeCard === index ? 0 : 50,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <h2 className="text-2xl font-meuthanies text-slate-100">
                    {activeCard === index ? item.title : ""}
                  </h2>
                </motion.div>

                {/* Description Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                    y: activeCard === index ? 0 : 50,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <p className="text-white font-sf-pro mt-3">
                    {activeCard === index ? item.description : ""}
                  </p>
                </motion.div>

                {/* Render Points with Icons */}
                <div className="mt-4 max-w-xl grid grid-cols-2 gap-6 ">
                  {activeCard === index &&
                    item.points.map((point, pointIndex) => (
                      <motion.div
                        key={pointIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: activeCard === index ? 1 : 0,
                          y: activeCard === index ? 0 : 20,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: pointIndex * 0.1,
                          ease: "easeInOut",
                        }}
                        className="flex flex-col items-center space-y-3 p-2 rounded-lg md:flex-row md:space-y-0 md:space-x-3"
                      >
                        <div className="text-white">{point.icon}</div>
                        <p className="text-white font-sf-pro text-center md:text-left">
                          {point.text}
                        </p>
                      </motion.div>
                    ))}
                </div>

                {/* Button */}
                <div>
                  {activeCard === index && (
                    <Link 
                      to={item.path}
                      className="bg-customYellow md:mb-0 px-8 rounded-full mt-6 text-black inline-flex items-center justify-center space-x-2 p-2 "
                    >
                      <p className="text-black font-medium text-[10px] md:text-lg">
                        {item.button}
                      </p>
                      <RxArrowTopRight className="md:text-2xl" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
