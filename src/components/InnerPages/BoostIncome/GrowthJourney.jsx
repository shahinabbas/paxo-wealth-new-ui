import React from "react";
import image from "/explores.png";
import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";

function GrowthJourney() {
  return (
    <div className="relative bg-customYellow mt-10 md:mt-32">
      {/* Image */}
      <img src={image} alt="Explore" className="w-full md:h-auto xl:h-auto h-[150px]" />

      {/* Content Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="md:text-5xl xl:text-6xl  md:mt-3 mb-2 md:mb-6 font-meuthanies text-center">
          Ready to Start your <br />
          <span className="relative inline-block text-center">
            <span className="absolute inset-0 bg-[#6200EE] transform rotate-[-1deg]"></span>
            <span className="relative text-white z-10 block text-center">
              Growth Journey{" "}
            </span>
          </span>
        </h1>

        <p className="md:mb-6 text-[10px] md:text-sm xl:text-xl opacity-50 text-center font-sf-pro">
          Join thousands of investors already growing their wealth with Boost
          Income
        </p>

        <div>
          <Link
            to="/contact-us"
            className="mt-4 xl:mt-6 xl:text-4xl text-sm rounded-full text-white bg-black inline-flex items-center justify-center space-x-2 p-1 md:p-2 xl:p-3 xl:px-6 md:px-8"
          >
            <p>Contact our Team</p>
            <RxArrowTopRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GrowthJourney;
