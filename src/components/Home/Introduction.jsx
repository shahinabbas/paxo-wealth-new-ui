import React from "react";
import Financial from "/financial-advisor.gif";
function Introduction() {
  return (
    <div className="h-screen bg-white md:flex items-center md:justify-center gap-20 mt-10">
      <div className="md:w-[450px] md:h-[350px] flex items-center justify-center">
        <img
          src={Financial}
          alt="Introduction"
          className="max-w-full max-h-full md:mt-0 mt-20"
        />
      </div>
      <div className="md:-ml-20 px-5 md:mt-0 -mt-10 md:text-left text-center">
        <h1 className="md:text-5xl text-xl font-meuthanies ">
          Step into Smarter
          <br className="md:block hidden" /> Financial Growth
          <br className="md:block hidden" />
          with <span className="text-customBlue">PAXO Wealth</span> <br />
        </h1>
        <p className="text-black opacity-50 mt-4 font-sf-pro">
          Transform your future with our core solutions
        </p>
      </div>
    </div>
  );
}

export default Introduction;
