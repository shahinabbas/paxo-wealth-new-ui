import React from "react";
import BoostIncomeIcon from "../../Home/BoostIncomeIcon";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-scroll"; // Import react-scroll Link

function BoostIncomeHome() {
  return (
    <div className="bg-white h-screen md:px-10 px-4">
      <div className="bg-customBlue rounded-xl mt-20 md:flex gap-60 items-center p-6">
        <div className="text-center md:text-left">
          <h1 className="md:text-5xl text-3xl text-white font-meuthanies">
            Boost Income -
          </h1>
          <h1 className="text-white text-3xl md:text-5xl md:mt-2 font-meuthanies">
            <span className="text-customYellow mr-2">Instant Growth</span>Secure
          </h1>
          <h1 className="md:text-5xl text-3xl font-meuthanies md:mt-2 text-white">
            {" "}
            and Hassle-Free
          </h1>
          <h2 className="text-white font-sf-pro mt-4">
            Achieve immediate growth of up to 48% backed by verified properties,{" "}
            <br />
            with consistent payouts for 12 months.
          </h2>
          <div className="md:flex md:space-y-0 space-y-4 gap-10 md:mt-10 mt-4">
            <div className="border rounded-full border-customYellow text-customYellow flex items-center p-2 px-4">
              <h1>Learn How It Works</h1>
              <MdArrowOutward />
            </div>
            {/* Use Link from react-scroll for smooth scrolling */}
            <Link
              to="highlighted" // Target the id of the Highlighted component
              smooth={true}
              duration={500}
              className="bg-customYellow rounded-full text-black flex items-center p-2 px-4 cursor-pointer"
            >
              <h1>Activate Boost Income Now</h1>
              <MdArrowOutward />
            </Link>
          </div>
        </div>
        <div className="md:mt-36 mt-10">
          <BoostIncomeIcon />
        </div>
      </div>
    </div>
  );
}

export default BoostIncomeHome;
