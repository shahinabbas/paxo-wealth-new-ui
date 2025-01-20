import React from "react";
import image from "/explores.png";
import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";

function Explore() {
  return (
    <div className="relative bg-customYellow mt-10 md:mt-32">
      {/* Image */}
      <img src={image} alt="Explore" className="w-full h-auto" />

      {/* Content Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="md:text-5xl md:mt-3 mb-2 md:mb-6 font-meuthanies text-center">
          Take the Smart Step with <br />
          <span className="relative inline-block text-center">
            <span className="absolute inset-0 bg-[#6200EE] transform rotate-[-2deg]"></span>
            <span className="relative text-white z-10 block text-center">
              Paxo Wealth
            </span>
          </span>
          <span className="ml-2">Today</span>
        </h1>

        <p className="md:mb-6 text-[10px] md:text-sm opacity-50 text-center font-sf-pro">
          Explore opportunities tailored to your goals and start growing with
          confidence.
        </p>

        <div>
          <Link
            to="/contact-us"
            className="md:mt-0 rounded-full text-white bg-black inline-flex items-center justify-center space-x-2 p-2 px-8"
          >
            <p className="md:text-lg text-[10px]">Contact our Team</p>
            <RxArrowTopRight className="md:text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Explore;
