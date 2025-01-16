import React from "react";
import Video1 from "/Income.mp4";
import Video2 from "/DirectSave.mp4";
import Video3 from "/Rent.mp4";
import { RxArrowTopRight } from "react-icons/rx";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { useNavigate } from "react-router-dom";
import BoostIncomeIcon from "./BoostIncomeIcon";
import RentRiseIcon from "./RentRiseIcon";
import DirectSave from "./DirectSave";
import DirectSaveIcon from "./DirectSaveIcon";

function Combined() {
  const navigate = useNavigate(); // Initialize the navigate hook

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
        delay: 11,
      },
    },
  };

  // Define animation variants for the video
  const videoVariants = {
    hidden: { opacity: 0, x: "-100%", y: "-30%" }, // Start from top-left
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
      <div className="hidden bg-white md:flex min-h-screen mt-14 gap-10  px-10 items-center text-center justify-center">
        {/* Boost Income Section */}
        <div className=" bg-[#AED1FF] bg-opacity-20 p-8">
          <motion.h1
            className=" text-4xl font-meuthanies"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Boost <span className="text-customGreen">Income</span>
          </motion.h1>
          <p className="opacity-50 text-sm mt-4 font-sf-pro">
            Experience immediate 48% growth with <br />
            secure payouts
          </p>
          {/* <video
            src={Video1}
            alt="Boost Income"
            autoPlay
            loop
            muted
            playsInline
            className="w-80 h-72"
          /> */}
          <BoostIncomeIcon />
          <div className="bottom-5  cursor-pointer">
            <div
              className="border bg-customYellow rounded-full  inline-flex items-center justify-center space-x-2 p-2 px-8 transition-all duration-300 ease-in-out"
              onClick={() => handleClick("/boost-income")}
            >
              <p className=" text-xl font-semibold font-sf-pro">Unlock</p>
              <RxArrowTopRight />
            </div>
          </div>
        </div>

        {/* Rent Rise Section */}
        <div className=" bg-[#89DDBF] bg-opacity-20 p-8">
          <motion.h1
            className=" text-4xl font-meuthanies"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Rent <span className="text-customGreen">Rise</span>
          </motion.h1>
          <p className="opacity-50 text-sm mt-4 font-sf-pro">
            Turn properties into a steady income <br />
            source effortlessly.
          </p>
          {/* <video
            src={Video3}
            alt="Rent Rise"
            autoPlay
            loop
            muted
            playsInline
            className="w-80 h-72"
          /> */}
          <DirectSaveIcon />
          <div className="bottom-5  cursor-pointer">
            <div
              className="border bg-customYellow rounded-full  inline-flex items-center justify-center space-x-2 p-2 px-8 transition-all duration-300 ease-in-out"
              onClick={() => handleClick("/rent-rise")}
            >
              <p className=" text-xl font-semibold font-sf-pro">Unlock</p>
              <RxArrowTopRight />
            </div>
          </div>
        </div>

        {/* Direct Save Section */}
        <div className="bg-[#CAB5F5] bg-opacity-20 p-8">
          <motion.h1
            className=" text-4xl font-meuthanies"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Direct <span className="text-customGreen">Save</span>
          </motion.h1>
          <p className="opacity-50 text-sm mt-4 font-sf-pro">
            Save big with exclusive discounts <br />
            on premium properties
          </p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={videoVariants} // Apply the video animation variants
          >
            {/* <video
              src={Video2}
              className="w-80 h-72"
              autoPlay
              loop
              muted
              playsInline
            /> */}
            <RentRiseIcon />
          </motion.div>
          <div className="bottom-5 cursor-pointer">
            <div
              className="border bg-customYellow rounded-full  inline-flex items-center justify-center space-x-2 p-2 px-8 transition-all duration-300 ease-in-out"
              onClick={() => handleClick("/direct-save")}
            >
              <p className=" text-xl font-semibold font-sf-pro">Unlock</p>
              <RxArrowTopRight />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex h-[10rem] lg:hidden flex-col min-h-screen mt-14 gap-10  items-center text-center overflow-y-auto">
        {[
          {
            title: "Boost Income",
            video: Video1,
            icon: BoostIncomeIcon,
            desc: "Experience immediate 48% growth with secure payouts",
            link: "/boost-income",
          },
          {
            title: "Rent Rise",
            video: Video3,
            icon: RentRiseIcon,
            desc: "Turn properties into a steady income source effortlessly.",
            link: "/rent-rise",
          },
          {
            title: "Direct Save",
            video: Video2,
            icon: DirectSaveIcon,
            desc: "Save big with exclusive discounts on premium properties",
            link: "/direct-save",
          },
        ].map((section, index) => (
          <div key={index} className="bg-white w-full flex flex-col items-center py-4">
            <div className=" text-2xl font-meuthanies">{section.title}</div>
            <p className="opacity-50 text-xs mt-2 font-sf-pro">
              {section.desc}
            </p>
            {/* <video
              src={section.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-11/12 h-60 mt-4"
            /> */}
            <section.icon />
            <div className=" cursor-pointer">
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
