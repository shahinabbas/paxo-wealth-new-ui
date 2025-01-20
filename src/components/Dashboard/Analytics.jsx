import React, { useEffect } from 'react';
import { MdCurrencyRupee } from 'react-icons/md';
import GrowthChart from './GrowthChart';

const growthData = [
  { month: 'Jan', value: 600000 },
  { month: 'Feb', value: 650000 },
  { month: 'Mar', value: 720000 },
  { month: 'Apr', value: 780000 },
  { month: 'May', value: 840000 },
  { month: 'Jun', value: 888000 }
];

const Analytics = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="space-y-6 font-sf-pro">
      <h2 className="text-3xl font-bold mb-8 font-meuthanies text-gray-900">
        Growth Analytics
      </h2>

      {/* Portfolio Growth Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-6 text-gray-900">Portfolio Growth</h3>
        <GrowthChart data={growthData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Growth Summary Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Growth Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Initial Investment</span>
              <span className="flex items-center font-semibold text-gray-900">
                <MdCurrencyRupee />600,000
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Value</span>
              <span className="flex items-center font-semibold text-customBlue">
                <MdCurrencyRupee />888,000
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Growth</span>
              <span className="font-semibold text-customBlue">48%</span>
            </div>
          </div>
        </div>

        {/* Monthly Returns Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Monthly Returns</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Payout</span>
              <span className="flex items-center font-semibold text-customBlue">
                <MdCurrencyRupee />24,000
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Return Rate</span>
              <span className="font-semibold text-customBlue">4% monthly</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next Payout</span>
              <span className="font-semibold text-gray-900">Feb 15, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;