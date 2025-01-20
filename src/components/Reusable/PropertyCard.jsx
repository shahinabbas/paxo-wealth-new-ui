import React from "react";
import { FaBuilding, FaChartLine, FaCalendarAlt, FaFileDownload } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

const PropertyCard = ({ property }) => {
  
  const handleDownloadReceipt = async () => {
    // Implement download functionality
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Left Section */}
        <div className="flex-1 space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaBuilding className="text-2xl text-customBlue" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{property.name}</h3>
              <p className="text-gray-600">{property.type}</p>
              <div className="mt-2 flex items-center text-customBlue">
                <FaChartLine className="mr-2" />
                <span>{property.growth}% Growth</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex-1 space-y-3">
          <div>
            <p className="text-gray-600">Invested Amount</p>
            <p className="text-xl font-bold flex items-center text-gray-900">
              <MdCurrencyRupee />
              {formatCurrency(property.investedAmount).replace('₹', '')}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Current Value</p>
            <p className="text-xl font-bold text-customBlue flex items-center">
              <MdCurrencyRupee />
              {formatCurrency(property.currentValue).replace('₹', '')}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 space-y-3">
          <div>
            <p className="text-gray-600">Monthly Payout</p>
            <p className="text-xl font-bold text-customBlue flex items-center">
              <MdCurrencyRupee />
              {formatCurrency(property.monthlyPayout).replace('₹', '')}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Next Payout</p>
              <p className="flex items-center text-gray-900">
                <FaCalendarAlt className="mr-2 text-customBlue" />
                {new Date(property.nextPayout).toLocaleDateString()}
              </p>
            </div>
            {property.paymentStatus === 'completed' && (
              <button
                onClick={handleDownloadReceipt}
                className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                title="Download Receipt"
              >
                <FaFileDownload className="text-customBlue" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-gray-600">Units Owned</p>
          <p className="text-gray-900 font-bold">{property.units}</p>
        </div>
        <div>
          <p className="text-gray-600">Price Per Unit</p>
          <p className="text-gray-900 font-bold flex items-center">
            <MdCurrencyRupee />
            {formatCurrency(property.priceDetails?.pricePerUnit).replace('₹', '')}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Total Area</p>
          <p className="text-gray-900 font-bold">{property.priceDetails?.totalArea} sqft</p>
        </div>
        <div>
          <p className="text-gray-600">Status</p>
          <p className="text-customBlue font-bold capitalize">{property.orderStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;