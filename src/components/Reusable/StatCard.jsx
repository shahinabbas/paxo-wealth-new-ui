import React from 'react';
import { MdCurrencyRupee } from 'react-icons/md';

const StatCard = ({ label, value, subtext, isGreen = false }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <p className="text-gray-600 mb-2">{label}</p>
      <div className={`flex items-center text-2xl font-bold ${isGreen ? 'text-customBlue' : 'text-gray-900'}`}>
        <MdCurrencyRupee />
        <span>{value.toLocaleString()}</span>
      </div>
      {subtext && <p className="text-sm text-gray-500 mt-2">{subtext}</p>}
    </div>
  );
};

export default StatCard;