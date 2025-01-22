import React, { useState } from 'react';

const Calc = () => {
  const [activationAmount, setActivationAmount] = useState(1000000); // Default ₹10,00,000
  const [lockInPeriod, setLockInPeriod] = useState(12); // Default 12 years

  const yearlyGrowth = 0.48; // 48% yearly growth
  const monthlyPayoutRate = 0.04; // 4% monthly payout

  const monthlyPayout = activationAmount * monthlyPayoutRate;
  const yearlyPayout = activationAmount * yearlyGrowth;
  const totalMonthlyPayout = monthlyPayout * 12 * lockInPeriod;
  const totalYearlyGrowth = yearlyPayout * lockInPeriod;
  const totalReturns = totalMonthlyPayout + totalYearlyGrowth;

  return (
    <div className='mt-20' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Boost Income In Action - Real Growth Examples</h1>
      <div>
        <label>
          <strong>Activation Amount: </strong>
          ₹{activationAmount.toLocaleString()}
        </label>
        <input
          type="range"
          min="100000"
          max="5000000"
          step="100000"
          value={activationAmount}
          onChange={(e) => setActivationAmount(parseInt(e.target.value, 10))}
          style={{ width: '100%' }}
        />
      </div>
      <div>
        <label>
          <strong>Lock-In Period: </strong>
          {lockInPeriod} Years
        </label>
        <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={lockInPeriod}
          onChange={(e) => setLockInPeriod(parseInt(e.target.value, 10))}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Paxo Returns</h2>
        <p>
          <strong>Activation Amount:</strong> ₹{activationAmount.toLocaleString()}
        </p>
        <p>
          <strong>Earn Monthly Payouts:</strong> ₹{monthlyPayout.toLocaleString()}
        </p>
        <p>
          <strong>Total Monthly Payouts (Over {lockInPeriod} Years):</strong> ₹{totalMonthlyPayout.toLocaleString()}
        </p>
        <p>
          <strong>Estimated Gains (Yearly Growth):</strong> ₹{totalYearlyGrowth.toLocaleString()}
        </p>
        <p>
          <strong>Total Returns:</strong> ₹{totalReturns.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Calc;