import React from "react";
import { MdArrowOutward } from "react-icons/md";
import DirectSaveIcon from "../../Home/RentRiseIcon"
function DirectSaveHome() {
  return (
    <div className="bg-white h-screen md:px-10 px-4">
      <div className="bg-customBlue rounded-xl mt-20 md:flex  gap-60 items-center p-6">
        <div className="text-center md:text-left">
          <h1 className="md:text-5xl mt-5 text-3xl text-white font-meuthanies">
            Direct Save:{" "}
          </h1>

          <h1 className="md:text-5xl mt-2 text-3xl text-white font-meuthanies">
            Unlock Exclusive{" "}
          </h1>

          <h1 className="md:text-5xl mt-2 text-3xl text-white font-meuthanies">
            Property Deals with Up{" "}
          </h1>

          <h1 className="md:text-5xl mt-2 text-3xl text-white font-meuthanies">
            to 30% Discount{" "}
          </h1>
          <h1 className="font-sf-pro text-white mt-4 opacity-50">
            Direct Save is your gateway to owning your dream home at an
            unbeatable price. With discounts of up to 30% on premium properties,
            enjoy a seamless experience with verified listings, transparent
            documentation, and end-to-end assistance through the Paxo Wealth
            platform.
          </h1>

          <div className="md:flex md:space-y-0 space-y-4 gap-10 md:mt-10 mt-4">
            <div className="border rounded-full  font-semibold border-white text-white gap-2 flex items-center p-2 px-4">
              <h1>Explore Rental Opportunities</h1>
              <MdArrowOutward />
            </div>
            <div className="bg-customYellow font-semibold rounded-full gap-2 text-black flex items-center p-2 px-4">
              <h1>Contact Us Now</h1>
              <MdArrowOutward />
            </div>
          </div>
        </div>
        <div className=" mt-5 md:mt-40">
          <DirectSaveIcon />
        </div>
      </div>
    </div>
  );
}

export default DirectSaveHome;
