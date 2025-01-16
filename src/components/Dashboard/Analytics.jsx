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
          // Smooth scroll to top
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }, []);
  return (
    <div className="space-y-6 font-sf-pro">
      <h2 className="text-3xl font-bold mb-8 font-meuthanies">Growth Analytics</h2>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-6">Portfolio Growth</h3>
        <GrowthChart data={growthData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Growth Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Initial Investment</span>
              <span className="flex items-center font-semibold">
                <MdCurrencyRupee />600,000
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Current Value</span>
              <span className="flex items-center font-semibold text-customGreen">
                <MdCurrencyRupee />888,000
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Growth</span>
              <span className="font-semibold text-customGreen">48%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Monthly Returns</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Monthly Payout</span>
              <span className="flex items-center font-semibold text-customGreen">
                <MdCurrencyRupee />24,000
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Return Rate</span>
              <span className="font-semibold text-customGreen">4% monthly</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Next Payout</span>
              <span className="font-semibold">Feb 15, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;