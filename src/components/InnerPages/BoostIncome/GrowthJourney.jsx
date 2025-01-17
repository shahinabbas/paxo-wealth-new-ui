import React from "react";
import { MdArrowOutward } from "react-icons/md";

function GrowthJourney() {
  return (
    <div className=" mt-20">
      <div className="bg-white flex justify-center items-center">
        <div className="bg-customBlue h-[350px] w-full flex justify-center items-center">
          <div className="text-center">
            <h1 className="font-meuthanies text-white text-[30px] md:text-[45px]">
              Ready to Start Your
            </h1>
            <div className="relative inline-block">
              <span className="absolute inset-0 bg-white transform rotate-[-2deg] w-full h-full"></span>
              <span className="relative z-10 font-meuthanies text-[30px] md:text-[45px]">
                Growth Journey?
              </span>
            </div>
            <h1 className="font-sf-pro text-white opacity-70 md:px-0 px-4 text-[13px] mt-4">
              Join thousands of investors already growing their wealth with
              Boost Income
            </h1>
            <div className="flex items-center justify-center md:mb-0 mb-10 w-40 rounded-full bg-customYellow p-2 mt-8 mx-auto">
              <h1 className="font-sf-pro font-semibold">Get Started</h1> <MdArrowOutward />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GrowthJourney;
