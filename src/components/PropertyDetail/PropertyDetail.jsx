import React, { useEffect, useState } from "react";
import {
  FaLocationDot,
  FaBuilding,
  FaChartLine,
  FaFileContract,
  FaCalculator,
  FaRegCircleCheck,
  FaArrowTrendUp,
} from "react-icons/fa6";
import { MdCurrencyRupee, MdInfoOutline } from "react-icons/md";
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
import { useNavigate, useParams } from "react-router-dom";

const PropertyDetail = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [quantity, setQuantity] = useState(1);
  const [showTermsModal, setShowTermsModal] = useState(false);
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

  // Calculate values
  const availableArea = propertyDetails.available_unit;
  const totalArea = quantity * 100; 
  const totalPrice = quantity * propertyDetails.property_unit_price * 100;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    if (value >= 1) setQuantity(value);
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => quantity > 1 && setQuantity((prev) => prev - 1);

  const handlePayment = () => {
    const orderSummary = {
      quantity: quantity,
      propertySlug: slug,
      timestamp: new Date().getTime()
    };
  
    sessionStorage.setItem('orderSummary', JSON.stringify(orderSummary));
    navigate("/payment-page");
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 py-12">
      {/* Property Header */}
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg p-6 mb-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-meuthanies">
              {propertyDetails.property_name}
            </h1>
            {/* <div className="flex items-center text-gray-400 mb-4 font-sf-pro">
              <FaLocationDot className="mr-2" />
              {propertyDetails.location}
            </div> */}
            <div className="grid grid-cols-2 gap-4 font-sf-pro">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-gray-400 text-sm">Property Type</div>
                <div className="text-white font-semibold flex items-center">
                  <FaBuilding className="mr-2" />
                  {propertyDetails.property_type}
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-gray-400 text-sm">Growth Rate</div>
                <div className="text-customGreen font-semibold flex items-center">
                  <FaChartLine className="mr-2" />
                  {propertyDetails.capital_appreciation}%
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 font-sf-pro">
            <div className="flex gap-3">
              {[
                { value: "value", label: "Current", color: "#4ade80" },
                { value: "bullTrend", label: "Bull Trend", color: "#22c55e" },
                { value: "bearTrend", label: "Bear Trend", color: "#ef4444" },
              ].map((trend) => (
                <button
                  key={trend.value}
                  onClick={() => setSelectedTrend(trend.value)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedTrend === trend.value
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {trend.label}
                </button>
              ))}
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={propertyGrowthData}>
                  <defs>
                    <linearGradient
                      id="bullGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="bearGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="currentGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#4ade80" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    tick={{ fill: "#9ca3af" }}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    tick={{ fill: "#9ca3af" }}
                    domain={["dataMin - 500", "dataMax + 500"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      borderRadius: "0.5rem",
                      color: "#fff",
                    }}
                  />
                  {selectedTrend === "value" && (
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#4ade80"
                      strokeWidth={2}
                      fill="url(#currentGradient)"
                      dot={{ stroke: "#4ade80", strokeWidth: 2 }}
                      activeDot={{ r: 6, stroke: "#4ade80", strokeWidth: 2 }}
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
                      activeDot={{ r: 6, stroke: "#22c55e", strokeWidth: 2 }}
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
                      activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2 }}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between px-4 py-2 bg-gray-700 rounded-lg">
              <div>
                <p className="text-sm text-gray-400">Lowest</p>
                <p className="font-semibold text-red-400">
                  ₹
                  {Math.min(...propertyGrowthData.map((d) => d[selectedTrend]))}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Highest</p>
                <p className="font-semibold text-customGreen">
                  ₹
                  {Math.max(...propertyGrowthData.map((d) => d[selectedTrend]))}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Change</p>
                <p className="font-semibold text-customGreen">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 font-sf-pro ">
        {/* Left Column - Tabs Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex space-x-4 border-b border-gray-700 pb-4">
              {[
                { id: "overview", label: "Overview", icon: FaChartLine },
                { id: "legal", label: "Legal Documents", icon: FaFileContract },
                {
                  id: "calculator",
                  label: "ROI Calculator",
                  icon: FaCalculator,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-customGreen text-black"
                      : "text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  <tab.icon />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6 font-sf-pro">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white font-meuthanies">
                    Property Overview
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="text-gray-400 text-sm">Total Area</div>
                      <div className="text-white font-semibold">
                        {propertyDetails.total_unit} sqft
                      </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="text-gray-400 text-sm">
                        Available Area
                      </div>
                      <div className="text-white font-semibold">
                        {availableArea} sqft
                      </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="text-gray-400 text-sm">
                        Completion Date
                      </div>
                      <div className="text-white font-semibold">
                        {propertyDetails.completion_date}
                      </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="text-gray-400 text-sm">Monthly Yield</div>
                      <div className="text-customGreen font-semibold">
                        {propertyDetails.capital_appreciation}%
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "legal" && (
                <div className="space-y-4 font-sf-pro">
                  <h3 className="text-xl font-semibold text-white">
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
                        className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
                      >
                        <div className="flex items-center">
                          <FaRegCircleCheck className="text-customGreen mr-2" />
                          <span className="text-white">{doc}</span>
                        </div>
                        <button className="text-customGreen hover:text-customGreen">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "calculator" && (
                <div className="space-y-4 font-sf-pro">
                  <h3 className="text-xl font-semibold text-white">
                    ROI Calculator
                  </h3>
                  <div className="rounded-md border border-customGreen p-5">
                    <div className="flex flex-col gap-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-semibold">
                          One Square Feet Price
                        </span>
                        <span className="text-white flex items-center">
                          <MdCurrencyRupee />
                          {propertyDetails.property_unit_price}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-semibold">
                          Quantity
                        </span>
                        <div className="flex items-center">
                          <button
                            onClick={handleDecrease}
                            className="px-2 border border-gray-600 text-white rounded-md mr-2 hover:bg-gray-700"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-12 pl-2 text-center bg-gray-700 text-white border border-gray-600 rounded-md font-semibold"
                          />
                          <button
                            onClick={handleIncrease}
                            className="px-2 border border-gray-600 text-white rounded-md ml-2 hover:bg-gray-700"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-semibold">
                          Area Per Quantity
                        </span>
                        <span className="text-white flex items-center">
                          {totalArea} sqft
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-semibold">
                          Total Price
                        </span>
                        <span className="text-white flex items-center">
                          <MdCurrencyRupee /> {totalPrice}
                        </span>
                      </div>

                      <div className="bg-green-900/30 text-customGreen p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">
                            Monthly Earnings
                          </span>
                          <span className="flex items-center font-bold">
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
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-gray-800 rounded-lg font-sf-pro">
          <div className="rounded-md border border-customGreen p-5">
            {/* Step Indicator */}
            {/* <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-customGreen flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="ml-2">
                  <p className="text-sm text-customGreen font-semibold">Step 1</p>
                  <p className="text-xs text-gray-400">Review Order</p>
                </div>
              </div>
              <div className="h-0.5 w-12 bg-gray-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="ml-2">
                  <p className="text-sm text-gray-400 font-semibold">Step 2</p>
                  <p className="text-xs text-gray-400">Payment</p>
                </div>
              </div>
            </div> */}

            <h1 className="text-xl font-semibold text-customGreen mb-4 font-meuthanies">
              Order Summary
            </h1>

            {/* Property Details */}
            <div className="flex flex-col gap-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 font-semibold">
                  Property Name
                </span>
                <span className="text-sm text-white flex items-center">
                  {propertyDetails.property_name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 font-semibold">
                  One Square Feet Price
                </span>
                <span className="text-sm text-white flex items-center">
                  <MdCurrencyRupee /> {propertyDetails.property_unit_price}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 font-semibold">
                  Area Per Quantity
                </span>
                <span className="text-sm text-white flex items-center">
                  <IoHomeOutline className="mr-1" /> {totalArea} sqft
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 font-semibold">
                  Quantity
                </span>
                <div className="flex items-center">
                  <button
                    onClick={handleDecrease}
                    className="px-2 border border-gray-600 text-white rounded-md mr-2 hover:bg-gray-700"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-12 pl-2 text-center bg-gray-700 text-white border border-gray-600 rounded-md font-semibold"
                  />
                  <button
                    onClick={handleIncrease}
                    className="px-2 border border-gray-600 text-white rounded-md ml-2 hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 font-semibold">
                  Growth Rate
                </span>
                <span className="text-sm text-customGreen flex items-center">
                  <BsGraphUp className="mr-1" />
                  {propertyDetails.capital_appreciation}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 font-semibold">
                  Total Investment
                </span>
                <span className="text-sm text-white flex items-center font-bold">
                  <MdCurrencyRupee /> {totalPrice}
                </span>
              </div>
            </div>

            {/* Monthly Earnings Card */}
            <div className="bg-green-900/30 text-customGreen p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Monthly Earnings</span>
                <span className="flex items-center font-bold text-lg">
                  <MdCurrencyRupee />
                  {Math.ceil(
                  ((propertyDetails?.capital_appreciation / 100) * totalPrice) /
                    12
                )}
                </span>
              </div>
              <div className="mt-2 text-xs text-customGreen/80">
                Based on {propertyDetails.capital_appreciation}% annual returns
              </div>
            </div>

            {/* KYC Status */}
            {/* <div className="bg-yellow-900/30 text-yellow-400 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <span className="font-semibold">KYC Status</span>
                <span className="text-sm">Pending</span>
              </div>
              <p className="text-xs mt-1">
                Complete KYC to proceed with investment
              </p>
            </div> */}

            {/* Terms & Conditions */}
            <div className="mb-6">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1.5" />
                <span className="text-sm text-gray-400">
                  I agree to the{" "}
                  <button className="text-customGreen">
                    Terms & Conditions
                  </button>{" "}
                  and
                  <button className="text-customGreen">
                    {" "}
                    Privacy Policy
                  </button>{" "}
                  of Paxo Wealth
                </span>
              </label>
            </div>

            {/* CTA Button */}
            <button
              className="w-full bg-customGreen hover:bg-green-600 text-black py-3 rounded-lg font-bold transition-colors"
              onClick={handlePayment}
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
