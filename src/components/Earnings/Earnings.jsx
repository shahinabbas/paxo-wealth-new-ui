import React from "react";
import image1 from "/earnings.png";
import image2 from "/earn.png";
import { Link } from "react-router-dom";

function Earnings() {
  return (
    <div className="md:min-h-screen">
      <div className="relative">
        <img src={image2} className="transform-none" alt="Earnings" />

        <h1 className="text-[#6200EE] font-meuthanies text-[40px] md:text-[113px] absolute inset-0 flex items-center justify-center">
          Start Earning
        </h1>
      </div>

      <div className="justify-center text-center p-4 flex -mt-10 font-sf-pro">
        <div>
          <h1 className=" font-sf-pro  md:text-3xl">
            Guaranteed Growth, Hassle-Free <br />
            Income, and Exclusive Deals.
          </h1>
          <div className=" mt-6 mb-8 md:mb-20 ">
            <Link to="/boost-income" className="hover:underline">
              <div className="bg-customYellow rounded-full  inline-flex items-center justify-center space-x-2 p-2 px-8">
                <p className="text-black font-semibold text-xl">Start Earning</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Earnings;
