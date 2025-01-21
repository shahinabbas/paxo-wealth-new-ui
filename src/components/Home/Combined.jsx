import React from "react";
import { RxArrowTopRight } from "react-icons/rx";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { useNavigate } from "react-router-dom";
import IncomeGif from "/Income_2.gif";
import DirectSaveGif from "/DirectSave.gif";
import RentRiseGif from "/Rent.gif";

function Combined() {
  const navigate = useNavigate();

  const handleClick = (link) => {
    if (link) {
      navigate(link); // Navigate to the provided link
    }
  };

  // Define the fade-in animation variants for text
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 18.5,
      },
    },
  };

  // Define animation variants for the video
  const videoVariants = {
    hidden: { opacity: 0, x: "-100%", y: "-5%" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 10.5,
      },
    },
  };

  return (
    <div>
      <div className="hidden bg-white md:flex min-h-screen xl:mt-10 md:mt-10 md:gap-10 xl:gap-32 px-10 items-center text-center justify-center ">
        {/* Boost Income Section */}
        <div className=" bg-[#AED1FF] bg-opacity-20 p-8 w-[380px] ">
          <motion.h1
            className=" text-4xl xl:mt-10  font-meuthanies"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Boost <span className="text-customGreen">Income</span>
          </motion.h1>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="opacity-50 text-sm mt-4 font-sf-pro"
          >
            Experience immediate 48% growth with <br />
            secure payouts
          </motion.h1>

          <img src={IncomeGif} alt="Boost Income" className="w-full" />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="bottom-5  cursor-pointer"
          >
            {" "}
            <div
              className="border bg-customYellow rounded-full xl:mb-10 inline-flex items-center justify-center space-x-2 p-2 px-8 transition-all duration-300 ease-in-out"
              onClick={() => handleClick("/boost-income")}
            >
              <p className=" text-xl font-semibold font-sf-pro">Unlock</p>
              <RxArrowTopRight />
            </div>
          </motion.div>
        </div>

        {/* Rent Rise Section */}
        <div className=" bg-[#89DDBF] bg-opacity-20 p-8 w-[380px]">
          <motion.h1
            className=" text-4xl xl:mt-10  font-meuthanies"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Rent <span className="text-customGreen">Rise</span>
          </motion.h1>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="opacity-50 text-sm mt-4 font-sf-pro"
          >
            Turn properties into a steady income <br />
            source effortlessly.
          </motion.h1>

          <img src={RentRiseGif} alt="Rent Rise" className="w-full" />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="bottom-5  cursor-pointer"
          >
            <div
              className="border bg-customYellow rounded-full xl:mb-10 inline-flex items-center justify-center space-x-2 p-2 px-8 transition-all duration-300 ease-in-out"
              onClick={() => handleClick("/rent-rise")}
            >
              <p className=" text-xl font-semibold font-sf-pro">Unlock</p>
              <RxArrowTopRight />
            </div>
          </motion.div>
        </div>

        {/* Direct Save Section */}
        <div
          initial="hidden"
          animate="visible"
          variants={videoVariants}
          className="bg-[#CAB5F5] bg-opacity-20 p-8 w-[380px]"
        >
          <motion.h1
            className=" text-4xl xl:mt-10 font-meuthanies"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Direct <span className="text-customGreen">Save</span>
          </motion.h1>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="opacity-50 text-sm mt-4 font-sf-pro"
          >
            Save big with exclusive discounts <br />
            on premium properties
          </motion.h1>

          <img src={DirectSaveGif} alt="" />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="bottom-5  cursor-pointer"
          >
            <div
              className="border bg-customYellow rounded-full xl:mb-10 inline-flex items-center justify-center space-x-2 p-2 px-8 transition-all duration-300 ease-in-out"
              onClick={() => handleClick("/direct-save")}
            >
              <p className=" text-xl font-semibold font-sf-pro">Unlock</p>
              <RxArrowTopRight />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex h-[40rem] pt-8 lg:hidden flex-col min-h-screen md:mt-14 md:gap-10  items-center text-center overflow-y-auto scrollbar-hide">
        {[
          {
            title: "Boost Income",
            icon: IncomeGif,
            desc: "Experience immediate 48% growth with secure payouts",
            link: "/boost-income",
          },
          {
            title: "Rent Rise",
            icon: RentRiseGif,
            desc: "Turn properties into a steady income source effortlessly.",
            link: "/rent-rise",
          },
          {
            title: "Direct Save",
            icon: DirectSaveGif,
            desc: "Save big with exclusive discounts on premium properties",
            link: "/direct-save",
          },
        ].map((section, index) => (
          <div
            key={index}
            className="bg-white w-full flex flex-col items-center  pt-16"
          >
            <div className=" text-2xl font-meuthanies ">{section.title}</div>
            <p className="opacity-50 text-xs mt-2 -mb-10 font-sf-pro">
              {section.desc}
            </p>
            <img
              src={section.icon}
              alt={`${section.title} GIF`}
              className="w-full h-full"
            />
            <div className=" cursor-pointer -mt-8">
              <div
                className="border rounded-full  inline-flex items-center justify-center space-x-2 py-1 px-5  bg-customYellow"
                onClick={() => handleClick(section.link)}
              >
                <p className=" text-xl font-sf-pro font-medium md:text-[10px]">
                  Unlock
                </p>
                <RxArrowTopRight />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Combined;
