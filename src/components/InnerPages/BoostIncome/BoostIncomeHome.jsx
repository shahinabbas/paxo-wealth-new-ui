import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-scroll"; // Import react-scroll Link
import BoostIncomeIcon from "../../Home/BoostIncomeIcon";

function BoostIncomeHome() {
  return (
    <div className="bg-white h-screen md:px-10 px-4">
      <div className="bg-customBlue xl:h-[700px] rounded-xl mt-20 md:flex gap-60 items-center p-6">
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
            <div className="border rounded-full  border-customYellow text-customYellow flex items-center justify-center xl:p-3 p-2 px-4">
              <h1>Learn How It Works</h1>
              <MdArrowOutward />
            </div>
            <Link
              to="highlighted"
              smooth={true}
              duration={500}
              className="bg-customYellow rounded-full text-black flex items-center justify-center p-2 xl:p-3 px-4 cursor-pointer"
            >
              <h1>Activate Boost Income Now</h1>
              <MdArrowOutward />
            </Link>
          </div>
        </div>
        <div className="md:mt-36 mt-10">
          <BoostIncomeIcon className="md:w-8[300px] md:h-[300px] xl:h-[600px] xl:w-[600px]" />
        </div>
      </div>
    </div>
  );
}

export default BoostIncomeHome;
