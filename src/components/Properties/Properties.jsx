import React from "react";
import { ThreeDCardDemo } from "./ThreeDCardDemo";
import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";

function Properties() {
  return (
    <div className=" text-black min-h-screen md:mt-4 p-5 md:p-16 py-16">
      <div className="max-w-4xl">
        <h1 className="text-3xl mb-4 font-meuthanies">
          Smarter Insights for <br />
          Smarter Earnings
        </h1>
        <p className="text-sm font-sf-pro text-[#303030] opacity-50">
          Paxo Wealth is your gateway to financial growth, combining smart
          technology with asset-
          <br />
          backed security. Our platform ensures guaranteed and steady income,
          and exclusive deals by <br />
          eliminating risks and complexity for you.
        </p>
      </div>
      <ThreeDCardDemo />
      <div className=" flex justify-center md:mt-0 mt-4 ml-50">
        <Link
          to="/blog"
          className=" rounded-full bg-customYellow text-white px-8 inline-flex items-center justify-center  space-x-2 p-2"
        >
          <p className="text-black text-lg">View All Blogs</p>
          <RxArrowTopRight className="text-black" />
        </Link>
      </div>
    </div>
  );
}

export default Properties;
