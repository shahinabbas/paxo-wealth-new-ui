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
  const [isChecked, setIsChecked] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");
  const [quantityInput, setQuantityInput] = useState("1");

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
    <div className="bg-gray-50 min-h-screen p-6 py-12">
      {/* Property Header */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg p-6 mb-6 mt-20 shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-meuthanies">
              {propertyDetails.property_name}
            </h1>
            <div className="grid grid-cols-2 gap-4 font-sf-pro">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-gray-600 text-sm ">Property Type</div>
                <div className="text-gray-900 font-semibold flex items-center capitalize ">
                  <FaBuilding className="mr-2 text-customBlue " />
                  {propertyDetails.property_type}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-gray-600 text-sm">Growth Rate</div>
                <div className="text-customBlue font-semibold flex items-center">
                  <FaChartLine className="mr-2" />
                  {propertyDetails.capital_appreciation}%
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 font-sf-pro">
            <div className="flex gap-3">
              {[
                { value: "value", label: "Current", color: "#0056E0" },
                { value: "bullTrend", label: "Bull Trend", color: "#22c55e" },
                { value: "bearTrend", label: "Bear Trend", color: "#ef4444" },
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
            <div className="h-64">
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
                      <stop offset="5%" stopColor="#0056E0" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0056E0" stopOpacity={0} />
                    </linearGradient>
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
                      activeDot={{ r: 6, stroke: "#0056E0", strokeWidth: 2 }}
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
            <div className="flex justify-between px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Lowest</p>
                <p className="font-semibold text-red-600">
                  ₹
                  {Math.min(...propertyGrowthData.map((d) => d[selectedTrend]))}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Highest</p>
                <p className="font-semibold text-customBlue">
                  ₹
                  {Math.max(...propertyGrowthData.map((d) => d[selectedTrend]))}
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

      {/* Main Content */}
      <div className="w-full  mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 font-sf-pro">
          {/* Left Column - Tabs Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg p-3 md:p-4 mb-4 md:mb-6 shadow-lg border border-gray-200">
              {/* Tab Buttons */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                {[
                  { id: "overview", label: "Overview", icon: FaChartLine },
                  {
                    id: "legal",
                    label: "Legal Documents",
                    icon: FaFileContract,
                  },
                  {
                    id: "calculator",
                    label: "ROI Calculator",
                    icon: FaCalculator,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-1 px-2 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                      activeTab === tab.id
                        ? "bg-customBlue text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon className="text-sm md:text-base" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-4 md:mt-6">
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 font-meuthanies">
                      Property Overview
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                        <div className="text-gray-600 text-sm">Total Area</div>
                        <div className="text-gray-900 font-semibold">
                          {propertyDetails.total_unit} sqft
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                        <div className="text-gray-600 text-sm">
                          Available Area
                        </div>
                        <div className="text-gray-900 font-semibold">
                          {availableArea} sqft
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                        <div className="text-gray-600 text-sm">
                          Minimum Participation
                        </div>
                        <div className="text-gray-900 font-semibold">
                          {propertyDetails.minimum_sqft} sqft
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                        <div className="text-gray-600 text-sm">
                          Monthly Yield
                        </div>
                        <div className="text-customBlue font-semibold">
                          {propertyDetails.capital_appreciation}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "legal" && (
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
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
                            <span className="text-gray-900 text-sm md:text-base">
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
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      ROI Calculator
                    </h3>
                    <div className="rounded-md border border-customBlue p-3 md:p-5">
                      <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <span className="text-gray-600 font-semibold text-sm md:text-base">
                            One Square Feet Price
                          </span>
                          <span className="text-gray-900 flex items-center text-sm md:text-base">
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
                              className="w-12 mx-2 pl-2 text-center bg-white text-gray-900 border border-gray-300 rounded-md font-semibold"
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
                          <span className="text-gray-900 flex items-center text-sm md:text-base">
                            {totalArea} sqft
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <span className="text-gray-600 font-semibold text-sm md:text-base">
                            Total Price
                          </span>
                          <span className="text-gray-900 flex items-center text-sm md:text-base">
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
          </div>

          {/* Right Column - Order Summary */}
          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="rounded-md border border-customBlue p-5">
              <h1 className="text-xl font-semibold text-customBlue mb-4 font-meuthanies">
                Order Summary
              </h1>

              {/* Property Details */}
              <div className="flex flex-col gap-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-semibold">
                    Property Name
                  </span>
                  <span className="text-sm text-gray-900 flex items-center">
                    {propertyDetails.property_name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-semibold">
                    One Square Feet Price
                  </span>
                  <span className="text-sm text-gray-900 flex items-center">
                    <MdCurrencyRupee /> {propertyDetails.property_unit_price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-semibold">
                    Area Per Quantity
                  </span>
                  <span className="text-sm text-gray-900 flex items-center">
                    <IoHomeOutline className="mr-1" /> {totalArea} sqft
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-semibold">
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
                      className="w-12 pl-2 text-center bg-white text-gray-900 border border-gray-300 rounded-md font-semibold"
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
                  <span className="text-sm text-gray-600 font-semibold">
                    Growth Rate
                  </span>
                  <span className="text-sm text-customBlue flex items-center">
                    <BsGraphUp className="mr-1" />
                    {propertyDetails.capital_appreciation}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-semibold">
                    Total Investment
                  </span>
                  <span className="text-sm text-gray-900 flex items-center font-bold">
                    <MdCurrencyRupee /> {totalPrice}
                  </span>
                </div>
              </div>

              {/* Monthly Earnings Card */}
              <div className="bg-blue-50 text-customBlue p-4 rounded-lg mb-6">
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
                <div className="mt-2 text-xs text-customBlue/80">
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
                  <span className="text-sm text-gray-600">
                    I agree to the{" "}
                    <button className="text-customBlue hover:text-blue-700">
                      Terms & Conditions
                    </button>{" "}
                    and
                    <button className="text-customBlue hover:text-blue-700">
                      {" "}
                      Privacy Policy
                    </button>{" "}
                    of Paxo Wealth
                  </span>
                </label>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-lg font-bold transition-colors ${
                  isChecked
                    ? "bg-customBlue hover:bg-blue-700 text-white"
                    : "bg-gray-400 cursor-not-allowed text-gray-600"
                }`}
                onClick={handlePayment}
                disabled={!isChecked} // Disable the button when not checked
              >
                PROCEED TO PAYMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
