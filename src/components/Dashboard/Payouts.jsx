import React, { useEffect } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const payoutHistory = [
  { date: "2024-01-15", amount: 24000, status: "Completed" },
  { date: "2024-01-01", amount: 24000, status: "Completed" },
  { date: "2023-12-15", amount: 24000, status: "Completed" },
];

const Payouts = () => {
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
      <h2 className="text-3xl font-bold mb-8 font-meuthanies">Payouts</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-400 mb-2">Next Payout</p>
          <div className="flex items-center text-2xl font-bold text-green-400">
            <MdCurrencyRupee />
            <span>24,000</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">Due on Feb 15, 2024</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-400 mb-2">Total Earned</p>
          <div className="flex items-center text-2xl font-bold">
            <MdCurrencyRupee />
            <span>72,000</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">Last 3 months</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-400 mb-2">Pending Payouts</p>
          <div className="flex items-center text-2xl font-bold">
            <MdCurrencyRupee />
            <span>216,000</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">Next 9 months</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Payout History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {payoutHistory.map((payout, index) => (
                  <tr key={index}>
                    <td className="py-4">
                      {new Date(payout.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 flex items-center">
                      <MdCurrencyRupee />
                      {payout.amount.toLocaleString()}
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-400">
                        <FaCheckCircle className="mr-1" /> {payout.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payouts;
