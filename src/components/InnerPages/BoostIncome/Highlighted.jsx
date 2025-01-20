import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IoIosArrowDown,
  IoIosArrowRoundDown,
  IoIosArrowRoundUp,
} from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Highlighted() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [categoriesResponse, propertiesResponse] = await Promise.all([
          axios.get(`${apiURL}/category/get-boostincome-category`),
          axios.get(`${apiURL}/property/get-boostincome-property`),
        ]);

        // Transform categories data to match the required format
        const transformedCategories = [
          {
            name: "All Categories",
            value: "all",
            description: "View all property opportunities",
          },
          ...categoriesResponse.data.map((cat) => ({
            name: cat.name,
            value: cat._id,
            description: cat.description,
            range: cat.range,
          })),
        ];

        setCategories(transformedCategories);
        setProperties(propertiesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          error.response?.data?.message ||
            "Failed to load data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiURL]);

  // Filter properties based on selected category
  const filteredProperties = properties.filter((property) => {
    const matchesCategory =
      activeCategory === "all" || property.category?._id === activeCategory;
    const matchesType =
      propertyTypeFilter === "all" || property.type === propertyTypeFilter;
    return matchesCategory && matchesType;
  });

  if (loading) {
    return (
      <div className="px-10 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-customBlue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-10 flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const onClick = (slug) => {
    navigate(`/property-detail/${slug}`);
  };

  return (
    <div className="px-10">
      <h1 className="font-meuthanies text-[45px]">
        Highlighted Opportunities 
      </h1>
      <div className="md:flex justify-between mt-10">
        <div className="md:flex bg-[#F6F6F6] gap-3 font-sf-pro md:rounded-full rounded-lg md:w-[688px] overflow-auto">
          {categories.map((category) => (
            <h1
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`p-2 cursor-pointer rounded-full ${
                category.value === activeCategory
                  ? "bg-customYellow font-semibold"
                  : "bg-transparent"
              }`}
            >
              {category.name}
            </h1>
          ))}
        </div>
        <div className="bg-[#F6F6F6] p-2 px-3 md:mt-0 mt-4 rounded-full flex items-center gap-2 font-sf-pro">
          <select
            value={propertyTypeFilter}
            onChange={(e) => setPropertyTypeFilter(e.target.value)}
            className="bg-transparent outline-none"
          >
            <option value="all">All Property Types</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="plot">Plot</option>
          </select>
          <IoIosArrowDown />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 font-sf-pro mt-10 gap-y-10 mb-10">
        {filteredProperties.map((property) => (
          <div
            key={property._id}
            className="shadow-lg rounded-lg bg-white flex flex-col p-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{property?.property_name}</h2>
              <div
                className={`rounded-full w-10 h-10 flex items-center justify-center ${
                  property.demand === "high"
                    ? "bg-[#1DF6A7]"
                    : "bg-customYellow"
                }`}
              >
                {property.demand === "high" ? (
                  <IoIosArrowRoundUp className="text-2xl" />
                ) : (
                  <IoIosArrowRoundDown className="text-2xl" />
                )}
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <p className="text-sm">Category: </p>
                <h1 className="text-customBlue">
                  {property.category?.name || ""}
                </h1>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Market Value: </p>
                <h1>₹ {property.marketValue?.toLocaleString("en-IN")}</h1>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Growth Potential: </p>
                <h1 className="text-customBlue">
                  {property.capital_appreciation}%
                </h1>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Pre-listed Buyers:</p>
                <h1 className="text-right">{property.preBuyers} Available</h1>
              </div>
            </div>
            <button
              onClick={() => onClick(property.slug)}
              className="bg-black text-white flex items-center gap-2 rounded-full p-2 justify-center mt-4 hover:bg-gray-800 transition-colors"
            >
              <span>Activate Growth Now</span>
              <MdArrowOutward />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Highlighted;
