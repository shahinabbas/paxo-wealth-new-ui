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

const OpportunitiesPage = () => {
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
      name: "2 BHK Flat",
      type: "residential",
      location: "Bangalore",
      tradeValue: "₹10 Lakhs",
      growthPotential: 48,
      preBuyers: 5,
      demand: "high",
      category: "Prime Horizon",
    },
    {
      id: 2,
      name: "Commercial Office Space",
      type: "commercial",
      location: "Mumbai",
      tradeValue: "₹25 Lakhs",
      growthPotential: 42,
      preBuyers: 3,
      demand: "medium",
      category: "Elite Vault",
    },
    {
      id: 3,
      name: "Premium Plot",
      type: "plot",
      location: "Delhi",
      tradeValue: "₹15 Lakhs",
      growthPotential: 45,
      preBuyers: 4,
      demand: "high",
      category: "Elite Vault",
    },
    {
      id: 4,
      name: "OpenLandPL321",
      type: "plot",
      location: "Nagpur",
      tradeValue: "₹1,00,000",
      growthPotential: 30,
      preBuyers: 4,
      demand: "high",
      category: "Starter Path",
    },
    {
      id: 5,
      name: "CommercialAX213",
      type: "commercial",
      location: "Hyderabad",
      tradeValue: "₹2,50,000",
      growthPotential: 40,
      preBuyers: 3,
      demand: "high",
      category: "Growth Edge",
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
    <div className="bg-gray-950 text-white min-h-screen font-sans pb-10">
      {/* Hero Section */}
      <section className="px-4 py-2 pt-20 text-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl  mb-6 font-meuthanies">
          Explore Paxo Wealth Opportunities

          </h1>
          <p className=" mb-8 text-gray-300 font-sf-pro">
          Discover premium residential, commercial, and land opportunities with
          fixed growth rates of 25%-48% per annum. <br /> Invest securely with
          Paxo Wealth's verified properties.
          </p>
        </div>
      </section>

      {/* Trading Dashboard Section */}
      <section className="px-4 py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto">
        
          {/* Category Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeCategory === category.value
                      ? "bg-customGreen text-white"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      {/* <div className="flex items-center text-gray-400 text-sm">
                        <FaLocationDot className="mr-1" />
                        {property.location}
                      </div> */}
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
                      <span className="text-gray-400">Pre-Listed Buyers:</span>
                      <span className="font-semibold">
                        {property.preBuyers} Available
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full mt-6 bg-customGreen hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors"
                    onClick={onClick}
                  >
                    Activate Growth Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OpportunitiesPage;
