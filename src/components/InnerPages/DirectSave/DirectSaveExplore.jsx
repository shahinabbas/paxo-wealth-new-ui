import React from "react";
import image from "/explores.png";
import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";

function DirectSaveExplore() {
  return (
    <div className="relative bg-customYellow mt-10 md:mt-32">
      {/* Image */}
      <img src={image} alt="Explore" className="w-full h-auto" />

      {/* Content Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="md:text-5xl md:mt-3 mt-4 font-meuthanies text-center">
          Unlock
          <span className="relative inline-block text-center ml-2">
            <span className="absolute inset-0 bg-[#0056E0] transform rotate-[-2deg]"></span>
            <span className="relative text-white z-10 block text-center">
              Your Dream Home
            </span>
          </span>
        </h1>
        <br />
        <h1 className="md:text-5xl  mb-2 md:mb-6 md:-mt-0 -mt-6  font-meuthanies text-center">
          with Direct Save Today
        </h1>

        <p className="md:mb-6 text-[10px] md:text-sm opacity-50 text-center font-sf-pro">
        We're here to help you to find the perfect property to boost your income.
        </p>

        <div>
          <Link
            to="/contact-us"
            className="md:mt-0 rounded-full text-white bg-black inline-flex items-center justify-center space-x-2 md:p-2 p-1 px-4 mb-3 md:mb-0 md:px-8"
          >
            <p className="md:text-lg text-[10px]">Contact our Team</p>
            <RxArrowTopRight className="md:text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DirectSaveExplore;
