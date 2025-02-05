import React, { useEffect, useState } from "react";
import {
  FaLocationDot,
  FaBuilding,
  FaChartLine,
  FaFileContract,
  FaCalculator,
  FaRegCircleCheck,
  FaArrowTrendUp,
  FaFileInvoice,
} from "react-icons/fa6";
import {
  MdArrowForwardIos,
  MdArrowOutward,
  MdCurrencyRupee,
  MdFileCopy,
  MdInfoOutline,
} from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { BsGraphUp } from "react-icons/bs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const PropertyDetail = () => {
  const { slug } = useParams();
  const [isChecked, setIsChecked] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");
  const [quantityInput, setQuantityInput] = useState("1");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const [propertyDetails, setPropertyDetails] = useState([]);

  useEffect(() => {
    const fetchPropertyBySlug = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${apiURL}/property/get-property-by-slug/${slug}`
        );
        setPropertyDetails(response.data);
      } catch (error) {
        console.error("Error fetching property by slug:", error);
        setError(
          error.response?.data?.message ||
            "Failed to fetch the property. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyBySlug();
  }, [apiURL]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle checkbox state
  };

  // Sample chart data with bull and bear trends
  const propertyGrowthData = [
    { month: "Jan", value: 4000, bullTrend: 4000, bearTrend: 4000 },
    { month: "Feb", value: 4200, bullTrend: 4300, bearTrend: 3800 },
    { month: "Mar", value: 4500, bullTrend: 4700, bearTrend: 3600 },
    { month: "Apr", value: 4800, bullTrend: 5200, bearTrend: 3400 },
    { month: "May", value: 5100, bullTrend: 5800, bearTrend: 3200 },
    { month: "Jun", value: 5400, bullTrend: 6500, bearTrend: 3000 },
  ];

  const [selectedTrend, setSelectedTrend] = useState("value");
  const quantity =
    quantityInput === "" ? 1 : Math.max(1, parseInt(quantityInput) || 1);

  // Calculate values
  const availableArea = propertyDetails.available_unit;
  const totalArea = quantity * propertyDetails.minimum_sqft;
  const totalPrice =
    quantity *
    propertyDetails.property_unit_price *
    propertyDetails.minimum_sqft;

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Allow empty string or valid numbers
    if (value === "" || /^\d+$/.test(value)) {
      // Check if the new quantity would exceed available units
      const newQuantity = parseInt(value) || 0;
      if (newQuantity <= availableArea || value === "") {
        setQuantityInput(value);
      }
    }
  };

  const handleIncrease = () => {
    const newQuantity = (parseInt(quantityInput) || 1) + 1;
    if (newQuantity <= availableArea) {
      setQuantityInput(newQuantity.toString());
    }
  };

  const handleDecrease = () => {
    const currentValue = parseInt(quantityInput) || 1;
    if (currentValue > 1) {
      setQuantityInput((currentValue - 1).toString());
    }
  };

  const handleBlur = () => {
    // When input loses focus, ensure we have a valid number >= 1 and <= availableArea
    const value = parseInt(quantityInput) || 0;
    if (value < 1) {
      setQuantityInput("1");
    } else if (value > availableArea) {
      setQuantityInput(availableArea.toString());
    }
  };

  const handlePayment = () => {
    const orderSummary = {
      quantity: quantity,
      propertySlug: slug,
      timestamp: new Date().getTime(),
    };

    sessionStorage.setItem("orderSummary", JSON.stringify(orderSummary));
    navigate("/payment-page");
  };

  return (
    <div className=" min-h-screen p-6 py-12">
      {/* Main Content */}
      <div className="w-full  font-sf-pro mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 font-sf-pro">
          {/* Left Column - Tabs Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg p-3 md:p-4 mb-4 md:mb-6 ">
              {/* Tab Buttons */}
              <div className="flex flex-wrap gap-2 pb-4">
                {[
                  {
                    id: "overview",
                    label: "Property Overview",
                    icon: FaHome,
                  },
                  {
                    id: "calculator",
                    label: "Growth Trend",
                    icon: FaFileContract,
                  },
                  {
                    id: "legal",
                    label: "Legal Documents",
                    icon: FaCalculator,
                  },
                  {
                    id: "location",
                    label: "Location Highlights",
                    icon: FaCalculator,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-1 px-2 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                      activeTab === tab.id
                        ? "bg-customBlue text-white"
                        : "bg-[#F6F6F6] text-[#666666]  "
                    }`}
                  >
                    <div
                      className={`p-1 rounded-full ${
                        activeTab === tab.id
                          ? "bg-[#FFFFFF] bg-opacity-10 "
                          : "bg-customBlue bg-opacity-10 "
                      }`}
                    >
                      <tab.icon className="text-sm md:text-base" />
                    </div>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-10">
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-3xl font-semibold text-customBlue font-meuthanies">
                      PAXO Capital Heights
                    </h3>
                    <h3 className="text-lg md:text-3xl font-semibold font-meuthanies">
                      Your Gateway to High-Growth Investment
                    </h3>
                    <div className="flex pt-10">
                      <div className=" space-y-8 w-4/5">
                        <div>
                          <div className="text-[#A6A6A6] text-sm">Category</div>
                          <div className="text-[#101010]  text-sm font-semibold mt-1">
                            {propertyDetails.property_location}
                          </div>
                        </div>

                        <div>
                          <div className="text-[#A6A6A6] text-sm">Location</div>
                          <div className="text-[#101010]  text-sm font-semibold mt-1">
                            {propertyDetails.property_location}
                          </div>
                        </div>

                        <div>
                          <div className="text-[#A6A6A6] text-sm">
                            Total Area
                          </div>
                          <div className="text-[#101010]  text-sm font-semibold mt-1">
                            {propertyDetails.total_unit} sqft
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8  w-4/5">
                        <div className=" ">
                          <div className="text-[#A6A6A6] text-sm">
                            Market Value
                          </div>
                          <div className="text-[#101010]  text-sm font-semibold mt-1">
                            ₹ {propertyDetails.marketValue}
                          </div>
                        </div>
                        <div className=" ">
                          <div className="text-[#A6A6A6] text-sm">
                            Growth Potential
                          </div>
                          <div className="text-customBlue text-sm font-semibold mt-1">
                            {propertyDetails.capital_appreciation} %
                          </div>
                        </div>

                        <div className=" ">
                          <div className="text-[#A6A6A6] text-sm">
                            Available Area
                          </div>
                          <div className="text-customBlue text-sm font-semibold mt-1">
                            {propertyDetails.available_unit} sqft
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8  w-4/5">
                        <div className=" ">
                          <div className="text-[#A6A6A6] text-sm">
                            Property Type
                          </div>
                          <div className="text-[#101010]  text-sm font-semibold mt-1">
                            {propertyDetails.property_type}
                          </div>
                        </div>
                        <div className=" ">
                          <div className="text-[#A6A6A6] text-sm">
                            Plots Available
                          </div>
                          <div className="text-[#101010]  text-sm font-semibold mt-1">
                            {propertyDetails.minimum_sqft}
                          </div>
                        </div>
                        <div className=" ">
                          <div className="text-[#A6A6A6] text-sm">
                            Minimum Participation
                          </div>
                          <div className="text-[#101010]  text-sm font-semibold mt-1">
                            {propertyDetails.minimum_sqft} sqft
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-10">
                      <h1 className="text-[#666666] text-sm">
                        PAXO Capital Heights offers premium plots in the heart
                        of Bengaluru, surrounded by <br />
                        lush greenery and seamless connectivity. Strategically
                        located near major IT hubs,
                        <br />
                        educational institutions, and hospitals, this property
                        is ideal for both investors and
                        <br /> families looking to build their dream homes. The
                        project comes with legal approvals, <br />
                        ensuring secure and hassle-free ownership.
                        {/* {propertyDetails.description} */}
                      </h1>
                    </div>
                  </div>
                )}

                {activeTab === "legal" && (
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-[#101010]">
                      Legal Documents
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Property Title",
                        "NOC Certificate",
                        "Building Approval",
                        "Tax Documents",
                      ].map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center">
                            <FaRegCircleCheck className="text-customBlue mr-2" />
                            <span className="text-[#101010] text-sm md:text-base">
                              {doc}
                            </span>
                          </div>
                          <button className="text-customBlue hover:text-blue-700 text-sm md:text-base">
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "calculator" && (
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-[#101010]">
                      ROI Calculator
                    </h3>
                    <div className="rounded-md border border-customBlue p-3 md:p-5">
                      <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <span className="text-gray-600 font-semibold text-sm md:text-base">
                            One Square Feet Price
                          </span>
                          <span className="text-[#101010] flex items-center text-sm md:text-base">
                            <MdCurrencyRupee />
                            {propertyDetails.property_unit_price}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <span className="text-gray-600 font-semibold text-sm md:text-base">
                            Quantity
                          </span>
                          <div className="flex items-center">
                            <button
                              onClick={handleDecrease}
                              className="px-2 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={quantity}
                              onChange={handleQuantityChange}
                              className="w-12 mx-2 pl-2 text-center bg-white text-[#101010] border border-gray-300 rounded-md font-semibold"
                            />
                            <button
                              onClick={handleIncrease}
                              className="px-2 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Additional calculator fields */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <span className="text-gray-600 font-semibold text-sm md:text-base">
                            Area Per Quantity
                          </span>
                          <span className="text-[#101010] flex items-center text-sm md:text-base">
                            {totalArea} sqft
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <span className="text-gray-600 font-semibold text-sm md:text-base">
                            Total Price
                          </span>
                          <span className="text-[#101010] flex items-center text-sm md:text-base">
                            <MdCurrencyRupee /> {totalPrice}
                          </span>
                        </div>

                        <div className="bg-blue-50 text-customBlue p-3 md:p-4 rounded-lg">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <span className="font-semibold text-sm md:text-base">
                              Monthly Earnings
                            </span>
                            <span className="flex items-center font-bold text-sm md:text-base">
                              <MdCurrencyRupee />
                              {Math.ceil(
                                ((propertyDetails.capital_appreciation / 100) *
                                  totalPrice) /
                                  12
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="max-w-7xl mx-auto rounded-lg p-6 mb-6 md:mt-20 border border-[#D9D9D9]">
              <div className="">
                <h1 className="font-meuthanies text-2xl text-customBlue">
                  Growth Trend
                </h1>
                <div className="space-y-4 font-sf-pro mt-4">
                  <div className="flex gap-3">
                    {[
                      { value: "value", label: "Current", color: "#0056E0" },
                      {
                        value: "bullTrend",
                        label: "Bull Trend",
                        color: "#22c55e",
                      },
                      {
                        value: "bearTrend",
                        label: "Bear Trend",
                        color: "#ef4444",
                      },
                    ].map((trend) => (
                      <button
                        key={trend.value}
                        onClick={() => setSelectedTrend(trend.value)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          selectedTrend === trend.value
                            ? "bg-customBlue text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {trend.label}
                      </button>
                    ))}
                  </div>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={propertyGrowthData}>
                        <defs>
                          <linearGradient
                            id="customBlueGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#0056E0"
                              stopOpacity={0.2}
                            />
                            <stop
                              offset="95%"
                              stopColor="#0056E0"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="bullGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#22c55e"
                              stopOpacity={0.2}
                            />
                            <stop
                              offset="95%"
                              stopColor="#22c55e"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="bearGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#ef4444"
                              stopOpacity={0.2}
                            />
                            <stop
                              offset="95%"
                              stopColor="#ef4444"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#e5e7eb",
                            borderRadius: "0.5rem",
                            color: "#111827",
                          }}
                        />
                        {selectedTrend === "value" && (
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#0056E0"
                            strokeWidth={2}
                            fill="url(#customBlueGradient)"
                            dot={{ stroke: "#0056E0", strokeWidth: 2 }}
                            activeDot={{
                              r: 6,
                              stroke: "#0056E0",
                              strokeWidth: 2,
                            }}
                          />
                        )}
                        {selectedTrend === "bullTrend" && (
                          <Area
                            type="monotone"
                            dataKey="bullTrend"
                            stroke="#22c55e"
                            strokeWidth={2}
                            fill="url(#bullGradient)"
                            dot={{ stroke: "#22c55e", strokeWidth: 2 }}
                            activeDot={{
                              r: 6,
                              stroke: "#22c55e",
                              strokeWidth: 2,
                            }}
                          />
                        )}
                        {selectedTrend === "bearTrend" && (
                          <Area
                            type="monotone"
                            dataKey="bearTrend"
                            stroke="#ef4444"
                            strokeWidth={2}
                            fill="url(#bearGradient)"
                            dot={{ stroke: "#ef4444", strokeWidth: 2 }}
                            activeDot={{
                              r: 6,
                              stroke: "#ef4444",
                              strokeWidth: 2,
                            }}
                          />
                        )}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex text-center justify-between px-5 py-2 bg-[#F6F6F6] rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Lowest</p>
                      <p className="font-semibold text-red-600">
                        ₹
                        {Math.min(
                          ...propertyGrowthData.map((d) => d[selectedTrend])
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Highest</p>
                      <p className="font-semibold text-customBlue">
                        ₹
                        {Math.max(
                          ...propertyGrowthData.map((d) => d[selectedTrend])
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Change</p>
                      <p className="font-semibold text-customBlue">
                        {Math.round(
                          ((propertyGrowthData[propertyGrowthData.length - 1][
                            selectedTrend
                          ] -
                            propertyGrowthData[0][selectedTrend]) /
                            propertyGrowthData[0][selectedTrend]) *
                            100
                        )}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto rounded-lg p-6 mb-6 md:mt-20 border border-[#D9D9D9]">
              <h1 className="text-customBlue font-meuthanies text-2xl">
                Legal Documents
              </h1>
              <div className="mt-10 space-y-4">
                <div className="bg-[#F6F6F6] p-6 flex justify-between rounded-xl">
                  <div className="flex gap-2 items-center">
                    <FaFileInvoice />
                    <h1>Property Title</h1>
                  </div>
                  <div>
                    <MdArrowForwardIos />
                  </div>
                </div>
                <div className="bg-[#F6F6F6] p-6 flex justify-between  rounded-xl">
                  <div className="flex gap-2 items-center">
                    <FaFileInvoice />
                    <h1>NOC Certificate</h1>
                  </div>
                  <div>
                    <MdArrowForwardIos />
                  </div>
                </div>
                <div className="bg-[#F6F6F6] p-6 flex justify-between  rounded-xl">
                  <div className="flex gap-2 items-center">
                    <FaFileInvoice />
                    <h1>Building Approval</h1>
                  </div>
                  <div>
                    <MdArrowForwardIos />
                  </div>
                </div>
                <div className="bg-[#F6F6F6] p-6 flex justify-between  rounded-xl">
                  <div className="flex gap-2 items-center">
                    <FaFileInvoice />
                    <h1>Tax Documents</h1>
                  </div>
                  <div>
                    <MdArrowForwardIos />
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto  rounded-lg p-6 mb-6 md:mt-20 border border-[#D9D9D9]">
              <h1 className="font-meuthanies text-2xl text-customBlue">
                Key Location Highlights
              </h1>
              <div>
                <div className="md:flex gap-6 mt-4 md:space-y-0 space-y-4">
                  <div className="bg-[#F4F8FF] flex items-center gap-2 p-2 px-4">
                    <div className="w-2 h-2 bg-[#0CB184] rounded-full"></div>
                    <h1>IT Park (5 km)</h1>
                  </div>
                  <div className="bg-[#F4F8FF] flex items-center gap-2 p-2 px-4">
                    <div className="w-2 h-2 bg-[#0CB184] rounded-full"></div>
                    <h1>School (2 km)</h1>
                  </div>
                  <div className="bg-[#F4F8FF] flex items-center gap-2 p-2 px-4">
                    <div className="w-2 h-2 bg-[#0CB184] rounded-full"></div>
                    <h1>Hospital (3 km)</h1>
                  </div>
                </div>
                <div className="mt-10">
                  <iframe
                    title="Google Map"
                    className="w-full h-80 rounded-lg shadow"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.9753412516534!2d72.85315777346183!3d19.15255664956802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7b58e9e570f%3A0x6e6ed2e34fe4570c!2sNESCO%20IT%20Park%2C%20NH%208%2C%20NESCO%2C%20Goregaon%2C%20Mumbai%2C%20Maharashtra%20400063!5e0!3m2!1sen!2sin!4v1738143613499!5m2!1sen!2sin"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white h-[620px] rounded-lg shadow-lg ">
            <div className="rounded-md  p-5">
              <h1 className="text-xl font-medium text-customBlue mb-4 font-meuthanies">
                Order Summary
              </h1>

              {/* Property Details */}
              <div className="flex flex-col gap-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#101010] font-medium">
                    Property Name
                  </span>
                  <span className="text-sm text-[#101010] font-semibold flex items-center">
                    {propertyDetails.property_name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#101010] font-medium">
                    One Square Feet Price
                  </span>
                  <span className="text-sm text-[#101010] font-semibold flex items-center">
                    <MdCurrencyRupee /> {propertyDetails.property_unit_price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#101010] font-medium">
                    Quantity
                  </span>
                  <div className="flex items-center">
                    <button
                      onClick={handleDecrease}
                      className="px-2 border border-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={quantityInput}
                      onChange={handleQuantityChange}
                      onBlur={handleBlur}
                      className="w-12 pl-2 text-center bg-white text-[#101010] border border-gray-300 rounded-md font-semibold"
                    />
                    <button
                      onClick={handleIncrease}
                      className="px-2 border border-gray-300 text-gray-700 rounded-md ml-2 hover:bg-gray-100"
                      disabled={quantity >= availableArea}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#101010] font-medium">
                    Area Per Quantity
                  </span>
                  <span className="text-sm text-[#101010] font-semibold flex items-center">
                    <IoHomeOutline className="mr-1" /> {totalArea} sqft
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#101010] font-medium">
                    Growth Rate
                  </span>
                  <span className="text-sm text-customBlue font-semibold flex items-center">
                    <BsGraphUp className="mr-1" />
                    {propertyDetails.capital_appreciation}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#101010] font-medium">
                    Total Investment
                  </span>
                  <span className="text-sm text-[#101010] font-semibold  flex items-center ">
                    <MdCurrencyRupee /> {totalPrice}
                  </span>
                </div>
              </div>

              {/* Monthly Earnings Card */}
              <div className="bg-blue-50  border-customBlue border p-4 rounded-lg mb-6 mt-24">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Monthly Earnings</span>
                  <span className="flex items-center font-bold text-lg">
                    <MdCurrencyRupee />
                    {Math.ceil(
                      ((propertyDetails.capital_appreciation / 100) *
                        totalPrice) /
                        12
                    )}
                  </span>
                </div>
                <div className="mt-2 text-xs ">
                  Based on {propertyDetails.capital_appreciation}% annual
                  returns
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="mb-6">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1.5"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <span className="text-xs text-[#666666]">
                    I agree to the{" "}
                    <button className="text-[#101010]">
                      Terms & Conditions
                    </button>{" "}
                    and
                    <button className="text-[#101010] ml-1">
                      Privacy Policy
                    </button>{" "}
                    of Paxo Wealth
                  </span>
                </label>
              </div>

              {/* CTA Button */}
              <div
                className={`flex rounded-full py-3 justify-center items-center gap-3 ${
                  isChecked
                    ? "bg-customYellow "
                    : "bg-gray-400 cursor-not-allowed text-gray-600"
                }`}
              >
                <button
                  className="  font-medium"
                  onClick={handlePayment}
                  disabled={!isChecked}
                >
                  PROCEED TO PAYMENT
                </button>
                <div>
                  <MdArrowOutward />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
