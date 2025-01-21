import React from "react";
import RentRiseGif from "/Rent.gif";

function RentRise() {
  return (
    <div className="h-screen md:flex bg-white items-center justify-center  ">
      <div className="md:w-[700px] md:h-[550px] xl:-ml-40 md:-ml-40 md:mt-0 mt-10 flex items-center justify-center">
        <img
          src={RentRiseGif}
          alt="Direct Save"
          className="max-w-full max-h-full"
        />
      </div>
      <div className="md:-ml-20 ml-14 md:mt-0 -mt-10">
        <h1 className=" text-5xl font-meuthanies md:mt-0 mt-10">
          Rent <span className="text-customBlue">Rise</span>
        </h1>
        <p className="text-black opacity-50 mt-4 font-sf-pro">
          Turn properties into a steady income <br />
          source effortlessly.
        </p>
      </div>
    </div>
  );
}

export default RentRise;
