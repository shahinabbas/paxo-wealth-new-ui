import React from "react";
import { MdArrowOutward } from "react-icons/md";
import BoostIncomeIcon from "../../Home/BoostIncomeIcon";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

function BoostIncomeHome() {
  return (
    <div className="bg-white md:h-auto md:px-10 px-4">
      <div className="bg-customBlue rounded-xl mt-20 md:mt-10 md:flex justify-between items-center p-6">
        <div className="text-left">
          <h1 className="md:text-5xl xl:text-6xl text-3xl text-white font-meuthanies">
            Boost Income -
          </h1>
          <h1 className="text-white text-3xl xl:text-6xl  md:text-5xl md:mt-2 font-meuthanies">
            <span className="text-customYellow mr-2">Instant Growth</span>Secure
          </h1>
          <h1 className="md:text-5xl text-3xl xl:text-6xl font-meuthanies md:mt-2 text-white">
            {" "}
            and Hassle-Free
          </h1>
          <h2 className="text-white xl:text-2xl font-sf-pro md:mt-6 xl:mt-10">
            Achieve immediate growth of up to 48% backed by verified properties,
            <br className="xl:hidden block" />
            with consistent payouts for 12 months.
          </h2>
          <div className="md:flex md:space-y-0 font-semibold space-y-4 gap-10 md:mt-10 xl:mt-16 mt-4">
            <ScrollLink
              to="HowItWork" // The id of the section to scroll to
              smooth={true} // Enables smooth scrolling
              duration={500} // The duration of the scroll (in ms)
              className="border cursor-pointer rounded-full border-customYellow text-customYellow flex items-center justify-center gap-2 xl:p-3 p-2 px-4"
            >
              <h1>Learn How It Works</h1>
              <MdArrowOutward />
            </ScrollLink>
            <Link
              to="/boost-income/properties"
              className="bg-customYellow rounded-full text-black flex items-center justify-center p-2 xl:p-3 px-4 gap-2 cursor-pointer"
            >
              <h1>Activate Boost Income Now</h1>
              <MdArrowOutward />
            </Link>
          </div>
        </div>
        <div className="md:mt-36 mt-10">
          <BoostIncomeIcon className=" md:h-[300px] md:w-[300px] lg:h-full lg:w-[450px] xl:h-[600px] xl:w-[600px]" />
        </div>
      </div>
    </div>
  );
}

export default BoostIncomeHome;
