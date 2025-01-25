import React from "react";
import { StickyScrollRevealDemo } from "./StickyScrollRevealDemo";
import { BackgroundBeamsDemo } from "./BackgroundBeamsDemo";
import Image from "/explore1.png";



function Explore() {
  return (
    <div className="relative h-[970px]  md:h-[800px] xl:min-h-screen bg-[#006FFF]">
      <div className="absolute top-0 left-0 w-full flex flex-col items-center justify-center h-full">
        <h1 className="relative z-10 text-2xl md:text-5xl mt-52 md:mb-10 text-white text-center font-meuthanies">
          Explore Our Core
          <span className="relative inline-block text-center ml-2">
            <span className="absolute inset-0 bg-white transform rotate-[-2deg]"></span>
            <span className="relative text-black z-10 block text-center">
              Products
            </span>
          </span>
          <br /> Designed for You
        </h1>
        <img
          src={Image}
          alt=""
          className="absolute w-full h-[300px] md:h-[500px] bottom-0 object-left"
        />
        <div className="relative z-30">
          <StickyScrollRevealDemo />
        </div>
      </div>
    </div>
  );
}

export default Explore;
