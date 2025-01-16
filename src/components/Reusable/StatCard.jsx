import React from 'react';
import { MdCurrencyRupee } from 'react-icons/md';

const StatCard = ({ label, value, subtext, isGreen = false }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <p className="text-gray-400 mb-2">{label}</p>
      <div className={`flex items-center text-2xl font-bold ${isGreen ? 'text-green-400' : ''}`}>
        <MdCurrencyRupee />
        <span>{value.toLocaleString()}</span>
      </div>
      {subtext && <p className="text-sm text-gray-400 mt-2">{subtext}</p>}
    </div>
  );
};

export default StatCard;