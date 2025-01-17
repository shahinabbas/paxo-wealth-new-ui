import React, { useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowRoundDown,
  IoIosArrowRoundUp,
} from "react-icons/io";
import { MdArrowDownward, MdArrowOutward, MdArrowUpward } from "react-icons/md";

function Highlighted() {
  const [selectedCategory, setSelectedCategory] = useState("All categories");

  const categories = [
    "All categories",
    "Starter Edge",
    "Progressive Growth",
    "Wealth Builder",
    "Pinnacle Growth",
  ];
  const properties = [
    {
      title: "2BHK",
      category: "Prime Horizon",
      marketValue: "₹ 10 Lakhs",
      growthPotential: "48%",
      preListedBuyers: "5 Available",
      growthPositive: true,
    },
    {
      title: "Commercial Office Space",
      category: "Elite Vault",
      marketValue: "₹ 25 Lakhs",
      growthPotential: "42%",
      preListedBuyers: "3 Available",
      growthPositive: false,
    },
    {
      title: "Premium Plot",
      category: "Elite Vault",
      marketValue: "₹ 15 Lakhs",
      growthPotential: "45%",
      preListedBuyers: "4 Available",
      growthPositive: true,
    },
    {
      title: "OpenLandPL321",
      category: "Starter Path",
      marketValue: "₹ 1,00,000",
      growthPotential: "30%",
      preListedBuyers: "4 Available",
      growthPositive: true,
    },
    {
      title: "Commercial Office Space",
      category: "Growth Edge",
      marketValue: "₹ 2,50,000",
      growthPotential: "40%",
      preListedBuyers: "3 Available",
      growthPositive: true,
    },
  ];

  return (
    <div className="px-10">
      <h1 className="font-meuthanies text-[45px] ">
        Highlighted Opportunities - <br className="hidden md:block" />
        Come Under Above
      </h1>
      <div className="md:flex justify-between mt-10">
        <div className="md:flex bg-[#F6F6F6] gap-3 font-sf-pro md:rounded-full rounded-lg  md:w-[688px] overflow-auto">
          {categories.map((category) => (
            <h1
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`p-2 cursor-pointer rounded-full ${
                selectedCategory === category
                  ? "bg-customYellow font-semibold"
                  : "bg-transparent"
              }`}
            >
              {category}
            </h1>
          ))}
        </div>
        <div className="bg-[#F6F6F6] p-2 px-3 md:mt-0 mt-4 rounded-full flex items-center gap-2  font-sf-pro">
          <h1>All Property Types</h1>
          <IoIosArrowDown />
        </div>
      </div>
      {/* cards */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 font-sf-pro mt-10 gap-y-10 mb-10">
        {properties.map((property, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg bg-white flex flex-col p-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold ">{property.title}</h2>
              <div
                className={`rounded-full w-10 h-10 flex items-center justify-center ${
                  property.growthPositive ? "bg-[#1DF6A7]" : "bg-customYellow"
                }`}
              >
                {property.growthPositive ? (
                  <IoIosArrowRoundUp className="text-2xl " />
                ) : (
                  <IoIosArrowRoundDown className="text-2xl " />
                )}
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <p className="text-sm">Category: </p>
                <h1 className="text-customBlue">{property.category}</h1>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Market Value: </p>
                <h1 className="">{property.marketValue}</h1>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Growth Potential: </p>
                <h1 className="text-customBlue">{property.growthPotential}</h1>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Pre-listed Buyers:</p>
                <h1 className="text-right">{property.preListedBuyers}</h1>
              </div>
            </div>
            <div className="bg-black text-white flex items-center gap-2 rounded-full p-2 justify-center mt-4">
              <h1>Activate Growth Now</h1>
              <MdArrowOutward />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Highlighted;
