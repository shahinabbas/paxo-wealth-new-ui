import React from "react";
import { MdArrowOutward } from "react-icons/md";
import RentRiseIcon from "../../Home/RentRiseIcon";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

function RentRiseHome() {
  return (
    <div className="bg-white md:h-auto md:px-10 px-4">
      <div className="bg-customGreen rounded-xl mt-20 md:mt-10 md:flex justify-between items-center ">
        <div className="p-6">
          <div className="text-left">
            <h1 className=" text-3xl xl:text-6xl 2xl:text-7xl md:text-5xl md:mt-2 font-meuthanies">
              Rent Rise:
            </h1>
            <h1 className=" text-3xl xl:text-6xl 2xl:text-7xl  md:text-5xl md:mt-2 font-meuthanies">
              Unlock
              <span className="text-customBlue ml-2">High-Yield Rental </span>
            </h1>
            <h1 className=" text-3xl xl:text-6xl 2xl:text-7xl  md:text-5xl md:mt-2 font-meuthanies ">
              Income with ease{" "}
            </h1>
            <h2 className="xl:text-2xl 2xl:text-3xl font-sf-pro md:mt-6 xl:mt-10">
              Achieve immediate growth of up to 48% backed by
              <br className="xl:hidden block" />
              verified properties, with consistent payouts for 12 months.
            </h2>
            <div className="md:flex md:space-y-0 font-semibold space-y-4 gap-10 md:mt-10 xl:mt-16 mt-4">
              <ScrollLink
                // to="HowItWork"
                // smooth={true}
                // duration={500}
                className="border cursor-pointer rounded-full border-black flex items-center justify-center gap-2 xl:p-3 p-2 px-4 2xl:text-2xl"
              >
                <h1>Explore Rental Opportunities</h1>
                <MdArrowOutward />
              </ScrollLink>
              <Link
                to="/contact-us"
                className="bg-black rounded-full text-white flex items-center justify-center p-2 xl:p-3 px-4 gap-2 cursor-pointer 2xl:text-2xl"
              >
                <h1>Contact Us Now</h1>
                <MdArrowOutward />
              </Link>
            </div>
          </div>
        </div>
        <div className="2xl:-mb-[136px] xl:-mb-[89px] md:-mb-[61px] md:mt-20">
          <RentRiseIcon className="2xl:w-[850px] 2xl:h-[1000px] xl:w-[600px] xl:h-[690px] md:w-[500px] md:h-[550px]" />
        </div>
      </div>
    </div>
  );
}

export default RentRiseHome;
