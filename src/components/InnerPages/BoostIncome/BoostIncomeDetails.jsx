import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BoostIncomeDetails = () => {
  // Dummy Data
  const allOpportunities = [
    {
      id: 1,
      name: 'ResidentialSV956',
      location: 'Bangalore',
      growthRate: 48,
      size: 2000,
      tenure: 5,
      price: 10000000,
      status: 'Available',
    },
    {
      id: 2,
      name: 'CommercialAX837',
      location: 'Mumbai',
      growthRate: 30,
      size: 1500,
      tenure: 4,
      price: 25000000,
      status: 'Available',
    },
    // More properties here
  ];

  // Select the first property as a dummy
  const [property, setProperty] = useState(allOpportunities[0]);

  useEffect(() => {
    // In case you want to simulate fetching data, you can log or manipulate this state.
    console.log('Selected Property:', property);
  }, [property]);

  return (
    <div className="bg-black text-white min-h-screen font-sans pb-10">
      <header className="py-12 text-center">
        <h1 className="text-4xl font-bold">{property.name} - Property Details</h1>
      </header>

      <section className="px-6 mb-8">
        <div className="space-y-6">
          <p className="text-xl font-semibold">Location: {property.location}</p>
          <p className="text-xl">Size: {property.size} sq. ft.</p>
          <p className="text-xl">Fixed Growth Rate: {property.growthRate}%</p>
          <p className="text-xl">Tenure: {property.tenure} years</p>
          <p className="text-xl">Price: ₹{property.price.toLocaleString()}</p>

          <button className="w-full py-2 mt-6 bg-green-500 rounded text-black">
            Activate Opportunity Now
          </button>
        </div>
      </section>

      <footer className="text-center mt-10">
        <Link to="/" className="text-blue-500">
          Back to Opportunities
        </Link>
      </footer>
    </div>
  );
};

export default BoostIncomeDetails;
