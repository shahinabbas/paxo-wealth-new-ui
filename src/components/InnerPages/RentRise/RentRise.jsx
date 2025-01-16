import React, { useEffect, useState } from "react";
import {
  FaArrowTrendUp,
  FaShield,
  FaMoneyBillTrendUp,
  FaChartLine,
  FaArrowRight,
  FaLock,
  FaClock,
  FaCircleCheck,
  FaUsers,
  FaBuilding,
  FaLocationDot,
  FaArrowUp,
  FaArrowDown,
  FaFilter,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoShieldCheckmark } from "react-icons/io5";

const RentRise = () => {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [cityFilter, setCityFilter] = React.useState("all");
  const [propertyTypeFilter, setPropertyTypeFilter] = React.useState("all");
  const categories = [
    {
      name: "All Categories",
      value: "all",
      description: "View all property opportunities",
    },
    {
      name: "Starter Path",
      value: "Starter Path",
      description: "A perfect entry into consistent growth plans",
      range: "₹50K – ₹1L",
    },
    {
      name: "Growth Edge",
      value: "Growth Edge",
      description:
        "Expand your portfolio with opportunities in thriving markets",
      range: "₹1L – ₹5L",
    },
    {
      name: "Prime Horizon",
      value: "Prime Horizon",
      description: "Premium options in high-demand locations",
      range: "₹5L – ₹10L",
    },
    {
      name: "Elite Vault",
      value: "Elite Vault",
      description: "Exclusive plans for significant growth potential",
      range: "₹10L+",
    },
  ];

  const properties = [
    {
      id: 1,
      name: "RentResidSR958",
      type: "Residential Lease",
      location: "Bangalore",
      tradeValue: "₹12 Lakhs",
      growthPotential: 30,
      preBuyers: 5,
      demand: "high",
      category: "Prime Horizon",
      soldOut: false,
    },
    {
      id: 2,
      name: "RentCommCY782",
      type: "Commercial Lease",
      location: "Delhi",
      tradeValue: "₹20 Lakhs",
      growthPotential: 25,
      preBuyers: 3,
      demand: "medium",
      category: "Elite Vault",
      soldOut: false,
    },
    {
      id: 3,
      name: "RentLandPL401",
      type: "Open Land Lease",
      location: "Hyderabad",
      tradeValue: "₹10 Lakhs",
      growthPotential: 28,
      preBuyers: 4,
      demand: "high",
      category: "Elite Vault",
      soldOut: true, // Mark this property as sold out
    },
    {
      id: 4,
      name: "RentFlatRC556",
      type: "Residential Flat",
      location: "Pune",
      tradeValue: "₹15,00,000",
      growthPotential: 30,
      preBuyers: 4,
      demand: "high",
      category: "Starter Path",
      soldOut: false,
    },
  ];

  // Filter properties based on all active filters
  const filteredProperties = properties.filter((property) => {
    const matchesCategory =
      activeCategory === "all" || property.category === activeCategory;
    const matchesCity =
      cityFilter === "all" ||
      property.location.toLowerCase() === cityFilter.toLowerCase();
    const matchesType =
      propertyTypeFilter === "all" || property.type === propertyTypeFilter;
    return matchesCategory && matchesCity && matchesType;
  });

  const navigate = useNavigate();

  const onClick = () => {
    navigate("/property-detail");
  };
  useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen font-sans pb-16 ">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800">
        <section className="px-4 py-16  text-center bg-gradient-to-b from-gray-900 to-gray-800 ">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl mt-10 mb-6 font-meuthanies">
              RentRise – Earn Consistent Rental Income Hassle-Free
            </h1>
            <p className=" mb-8 text-gray-300 font-sf-pro">
              Explore RentRise opportunities for earning steady rental income of
              up to 30% per annum. Let Paxo Wealth manage tenants and leases for
              you.
            </p>
            <div className="md:flex justify-center gap-4 font-sf-pro">
              <button className="bg-customGreen text-black hover:bg-green-600 px-8 py-3 rounded-lg font-semibold">
                Explore Rental Options{" "}
              </button>
              <button className="border md:mt-0 mt-5 border-customGreen hover:bg-customGreen/10 md:px-8 px-16 py-3 rounded-lg font-semibold">
                Learn How It Works
              </button>
            </div>
            {/* <div className="flex justify-center gap-16 mt-16 font-sf-pro">
            <div className="text-center">
              <IoShieldCheckmark className="w-12 h-12 text-customGreen mx-auto mb-2" />
              <p>Stress-Free <br/>Property Management</p>
            </div>
            <div className="text-center">
              <FaMoneyBillTrendUp className="w-12 h-12 text-customGreen mx-auto mb-2" />
              <p>Earn Consistent Income</p>
            </div>
            <div className="text-center">
              <FaChartLine className="w-12 h-12 text-customGreen mx-auto mb-2" />
              <p>Real-time Monitoring</p>
            </div>
          </div> */}
          </div>
        </section>

        {/* Trading Dashboard Section */}
        <section className="px-4 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl  text-center font-meuthanies ">
              Your Property, Hassle-Free Income.
            </h2>
            <h1 className="text-center mb-10 mt-3">
              Lease properties and earn predictable rental income with no tenant
              hassles.
            </h1>
            {/* Category Tabs */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setActiveCategory(category.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeCategory === category.value
                        ? "bg-customGreen text-black"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {category.name}
                    {category.range && (
                      <span className="ml-2 text-xs opacity-75">
                        ({category.range})
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {/* Category Description */}
              <div className="text-gray-400 text-sm">
                {
                  categories.find((cat) => cat.value === activeCategory)
                    ?.description
                }
              </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-900 p-6 rounded-lg mb-8">
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2">
                  <FaFilter className="text-customGreen" />
                  <span className="font-semibold">Filters:</span>
                </div>

                {/* <select
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm"
                onChange={(e) => setCityFilter(e.target.value)}
              >
                 <option value="all">All Cities</option> 
                <option value="bangalore">Bangalore</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
              </select> */}

                <select
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm"
                  onChange={(e) => setPropertyTypeFilter(e.target.value)}
                >
                  <option value="all">All Property Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="plot">Plot</option>
                </select>
              </div>
            </div>

            {/* Property Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-gray-900 rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          {property.name}
                        </h3>
                      </div>
                      <div className="flex items-center">
                        {property.demand === "high" ? (
                          <FaArrowUp className="text-customGreen" />
                        ) : (
                          <FaArrowDown className="text-yellow-500" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Category:</span>
                        <span className="font-semibold text-customGreen">
                          {property.category}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Market Value:</span>
                        <span className="font-semibold">
                          {property.tradeValue}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Growth Potential:</span>
                        <span className="font-semibold text-customGreen">
                          {property.growthPotential}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          Pre-Listed Buyers:
                        </span>
                        <span className="font-semibold">
                          {property.preBuyers} Available
                        </span>
                      </div>
                    </div>

                    <button
                      className={`w-full mt-6 py-2 rounded-lg font-semibold transition-colors ${
                        property.soldOut
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-customGreen text-black"
                      }`}
                      onClick={!property.soldOut ? onClick : undefined}
                      disabled={property.soldOut}
                    >
                      {property.soldOut ? "Notify Me" : "Activate Growth Now"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RentRise;
