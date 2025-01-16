import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import { FaTimes } from "react-icons/fa"; // Importing the close (X) icon
import BoostIncome from "../../Home/BoostIncome";

const BoostIncomePage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null); // Ref to track the dropdown section

  const handleFilterChange = (filterType, value) => {
    if (filterType === "priceRange") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: value, // value should be an array [min, max]
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: value,
      }));
    }
  };

  const allOpportunities = [
    {
      id: 1,
      name: "ResidentialSV956",
      type: "Residential",
      location: "Bangalore",
      growthRate: 48,
      price: 10000000,
      status: "Available",
    },
    {
      id: 2,
      name: "CommercialAX837",
      type: "Commercial",
      location: "Mumbai",
      growthRate: 30,
      price: 25000000,
      status: "Available",
    },
    {
      id: 3,
      name: "OpenLandPL421",
      type: "Open Land",
      location: "Hyderabad",
      growthRate: 48,
      price: 15000000,
      status: "Sold Out",
    },
    {
      id: 4,
      name: "UnderConstUC675",
      type: "Under Construction",
      location: "Pune",
      growthRate: 25,
      price: 20000000,
      status: "Available",
    },
  ];

  const [opportunities, setOpportunities] = useState(allOpportunities);
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    growthRate: "",
    priceRange: [0, 50000000],
    search: "",
  });

  const filteredOpportunities = opportunities.filter((opp) => {
    const { type, location, growthRate, priceRange, search } = filters;
    const matchesType = !type || opp.type === type;
    const matchesLocation = !location || opp.location === location;
    const matchesGrowthRate =
      !growthRate || opp.growthRate === parseInt(growthRate);
    const matchesPrice =
      opp.price >= priceRange[0] && opp.price <= priceRange[1];
    const matchesSearch =
      !search || opp.name.toLowerCase().includes(search.toLowerCase());
    return (
      matchesType &&
      matchesLocation &&
      matchesGrowthRate &&
      matchesPrice &&
      matchesSearch
    );
  });

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset filters to default values
  const resetFilters = () => {
    setFilters({
      type: "",
      location: "",
      growthRate: "",
      priceRange: [0, 50000000],
      search: "",
    });
    setIsFilterOpen(false);
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans pb-10">
      {/* Hero Section */}
      <header className="py-12 text-center p-4">
        <h1 className="text-4xl font-bold mt-10 font-meuthanies">
          Boost Income – Unlock Instant Growth <br />
          with Asset-Backed Security
        </h1>
        <p className="mt-4 text-sm px-2">
          Explore BoostIncome opportunities offering fixed growth rates of
          25%-48% per annum.
          <br /> Activate secure, hassle-free plans backed by verified assets.
        </p>
      </header>
      <BoostIncome />
      <section className="px-6">
        <div className="md:flex justify-between">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Available Opportunities
          </h2>
          <div className="relative px-6 mb-8 flex ml-[68%] md:ml-0">
            {" "}
            {/* Apply ml-auto to push to right */}
            {/* Filter Icon */}
            <button
              className="flex items-center p-2 bg-gray-800 rounded text-white"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FaFilter className="mr-2" /> Filters
            </button>
            {/* Animated Filter Section */}
            {isFilterOpen && (
              <motion.section
                ref={filterRef} // Attach ref to the dropdown section
                className="absolute top-full right-6 mt-2 w-[270px] bg-gray-900 p-4 rounded shadow-lg z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Close Button */}
                <button
                  className="absolute top-2 right-2 text-white"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <FaTimes />
                </button>
                <div className="space-y-4">
                  {/* Filter 1: Search by Name */}
                  <div>
                    <label className="text-white block mb-2">
                      Search by name
                    </label>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full p-2 bg-gray-800 rounded text-white"
                      onChange={(e) =>
                        handleFilterChange("search", e.target.value)
                      }
                    />
                  </div>

                  {/* Filter 2: Type */}
                  <div>
                    <label className="text-white block mb-2">Type</label>
                    <select
                      className="w-full p-2 bg-gray-800 rounded text-white"
                      onChange={(e) =>
                        handleFilterChange("type", e.target.value)
                      }
                    >
                      <option value="">All Types</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Open Land">Open Land</option>
                      <option value="Under Construction">
                        Under Construction
                      </option>
                    </select>
                  </div>

                  {/* Filter 3: Location */}
                  <div>
                    <label className="text-white block mb-2">Location</label>
                    <select
                      className="w-full p-2 bg-gray-800 rounded text-white"
                      onChange={(e) =>
                        handleFilterChange("location", e.target.value)
                      }
                    >
                      <option value="">All Locations</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                  </div>

                  {/* Filter 4: Growth Rate */}
                  <div>
                    <label className="text-white block mb-2">Growth Rate</label>
                    <select
                      className="w-full p-2 bg-gray-800 rounded text-white"
                      onChange={(e) =>
                        handleFilterChange("growthRate", e.target.value)
                      }
                    >
                      <option value="">All Growth Rates</option>
                      <option value="25">25%</option>
                      <option value="30">30%</option>
                      <option value="48">48%</option>
                    </select>
                  </div>

                  {/* Reset Filters Button */}
                  <div>
                    <button
                      onClick={resetFilters}
                      className="w-full mt-4 py-2 bg-red-500 rounded text-white"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </motion.section>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.length === 0 ? (
            <div className="col-span-full text-center text-lg text-gray-400">
              No opportunities match your filters.
            </div>
          ) : (
            filteredOpportunities.map((opp, index) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-lg overflow-hidden shadow-lg p-6 border border-gray-700 transition-transform transform hover:scale-105 ${
                  opp.status === "Sold Out" ? "bg-gray-800" : "bg-gray-900"
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{opp.name}</h3>
                <p className="text-sm text-gray-400 mb-1">Type: {opp.type}</p>
                <p className="text-sm text-gray-400 mb-1">
                  Location: {opp.location}
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  Growth Rate: {opp.growthRate}%
                </p>
                <p className="text-sm text-gray-400 mb-3">
                  Price: ₹{opp.price.toLocaleString()}
                </p>
                <div
                  className={`text-sm font-semibold mb-4 ${
                    opp.status === "Available"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {opp.status}
                </div>
                <button
                  className={`w-full py-2 rounded-full ${
                    opp.status === "Available"
                      ? "bg-[#1DF6A7] hover:bg-[#5bffc5]  text-black"
                      : "bg-gray-600 text-white cursor-not-allowed"
                  }`}
                  disabled={opp.status !== "Available"}
                >
                  {opp.status === "Available" ? "View & Activate" : "Notify Me"}
                </button>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default BoostIncomePage;
