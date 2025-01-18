import React, { useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowRoundDown,
  IoIosArrowRoundUp,
} from "react-icons/io";
import { MdArrowDownward, MdArrowOutward, MdArrowUpward } from "react-icons/md";

const Tick = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 92 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M69.969 27.2669L76.208 30.1755C79.1704 31.5582 80.4655 35.1165 79.0864 38.0834L76.1767 44.3218C75.4866 45.8017 75.3772 48.2712 75.9374 49.8105L78.2917 56.2787C79.4104 59.3523 77.8129 62.784 74.7368 63.9036L68.2661 66.2587C66.7293 66.8181 64.9058 68.4884 64.2143 69.9695L61.306 76.2093C59.9232 79.1717 56.3651 80.4668 53.4016 79.0862L47.1629 76.1757C45.6822 75.4859 43.2105 75.3782 41.6737 75.9375L35.2055 78.2918C32.1327 79.4102 28.6998 77.8094 27.5811 74.7358L25.2269 68.2676C24.669 66.7349 22.9972 64.9071 21.5156 64.2168L15.2766 61.3082C12.3096 59.9232 11.0146 56.3651 12.3984 53.4005L15.3081 47.162C15.999 45.6818 16.1052 43.2059 15.5474 41.6734L13.1931 35.2051C12.0733 32.1283 13.6752 28.6987 16.748 27.5803L23.2161 25.2261C24.7496 24.6679 26.5764 22.9964 27.2679 21.5153L30.1756 15.2738C31.5578 12.3098 35.1159 11.0147 38.08 12.3969L44.3181 15.3058C45.7988 15.9954 48.2711 16.1049 49.8079 15.5456L56.2786 13.1905C59.3552 12.0725 62.7836 13.6712 63.9035 16.7481L66.2577 23.2161C66.8177 24.7547 68.4882 26.5764 69.969 27.2669ZM53.9794 28.5009L53.9793 28.5009L43.0053 52.0275L43.0053 52.0276L53.9794 28.5009ZM31.5743 46.6972L31.5743 46.6971L29.0602 52.0871L29.0603 52.0871L31.5743 46.6972Z"
      fill="#6200EE"
    />
  </svg>
);
function FeaturedProperties() {
  const properties = [
    {
      image:
        "https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Premium Apartment ",
      MarketValue: "₹ 1.2 Crore",
      DiscountedPrice: "₹ 90 Lakhs",
      Size: "3500 sq. ft.",
      Amenities: "Gym, Pool, Clubhouse",
      bhk: "3BHK",
      Off: "25%",
      Location: "Bengaluru",
    },

    {
      image:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbWV8ZW58MHx8MHx8fDI%3D",
      title: "Luxury Villa",
      MarketValue: "₹ 1.2 Crore",
      DiscountedPrice: "₹ 90 Lakhs",
      Size: "3500 sq. ft.",
      Amenities: "Private Pool, 24/7 Security, Smart Home Features",
      bhk: "3BHK",
      Off: "25%",
      Location: "Hyderabad",
    },

    {
      image:
        "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Residential Plot",
      MarketValue: "₹ 1.2 Crore",
      DiscountedPrice: "₹ 90 Lakhs",
      Size: "3500 sq. ft.",
      Amenities: "Gym, Pool, Clubhouse",
      bhk: "3BHK",
      Off: "25%",
      Location: "Pune",
    },

    {
      image:
        "https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Premium Apartment ",
      MarketValue: "₹ 1.2 Crore",
      DiscountedPrice: "₹ 90 Lakhs",
      Size: "3500 sq. ft.",
      Amenities: "Private Pool, 24/7 Security, Smart Home Features",
      bhk: "3BHK",
      Off: "25%",
      Location: "Pune",
    },

    {
      image:
        "https://images.unsplash.com/photo-1445359179985-460648949e10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Luxury Villa",
      MarketValue: "₹ 1.2 Crore",
      DiscountedPrice: "₹ 90 Lakhs",
      Size: "3500 sq. ft.",
      Amenities: "Private Pool, 24/7 Security, Smart Home Features",
      bhk: "3BHK",
      Off: "25%",
      Location: "Pune",
    },
    {
      image:
        "https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Residential Plot",
      MarketValue: "₹ 1.2 Crore",
      DiscountedPrice: "₹ 90 Lakhs",
      Size: "3500 sq. ft.",
      Amenities: "Private Pool, 24/7 Security, Smart Home Features",
      bhk: "3BHK",
      Off: "25%",
      Location: "Pune",
    },
  ];

  return (
    <div className="md:px-10 px-4 mr-0 mt-10">
      <h1 className="font-meuthanies text-3xl md:text-[45px] ">Featured Properties</h1>
      <h1 className="font-sf-pro text-black opacity-80 mt-2">
        Discover our premium selection of high-yield rental properties, designed
        to maximize <br />
        your income and minimize your effort. These properties are carefully
        curated for their
        <br /> excellent market potential and verified tenant demand.
      </h1>

      {/* cards */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 font-sf-pro mt-10 gap-y-10 mb-10">
        {properties.map((property, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg bg-white flex flex-col p-4"
          >
            <div className="relative">
              <img
                src={property.image}
                alt="Image"
                className="rounded-lg object-cover w-full h-52"
              />
              <div className="absolute top-2 right-0 p-1 rounded-full flex justify-center items-center">
                <Tick />
                <h1 className="absolute text-white font-semibold">
                  {property.Off}
                </h1>
              </div>

              {/* Positioning bhk and Location over the image */}
              <div className="absolute top-44 left-2 gap-40 md:gap-56 p-2 rounded-md flex ">
                <h1 className="text-white text-sm">{property.bhk}</h1>
                <h1 className="text-white text-sm">{property.Location}</h1>
              </div>

              <h2 className="text-lg font-bold mt-3">{property.title}</h2>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <p className="text-sm">Market Value: </p>
                <h1 className="">{property.MarketValue}</h1>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Discounted Price: </p>
                <h1 className="text-customBlue">{property.DiscountedPrice}</h1>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Size:</p>
                <h1 className="text-right">{property.Size}</h1>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Amenities:</p>
                <h1 className="text-right text-[13px]">
                  {property.Amenities.length > 26
                    ? `${property.Amenities.slice(0, 26)}...`
                    : property.Amenities}
                </h1>
              </div>
            </div>
            <div className="bg-black text-white flex items-center gap-2 rounded-full p-2 justify-center mt-4">
              <h1>View Details</h1>
              <MdArrowOutward />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center ">
        <div className="bg-customYellow flex w-56 gap-2 justify-center font-sf-pro font-semibold rounded-full p-2 items-center">
          <h1>Explore All Properties</h1>
          <MdArrowOutward />
        </div>
      </div>
    </div>
  );
}

export default FeaturedProperties;
