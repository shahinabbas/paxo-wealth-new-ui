import React, { useState } from "react";
import { PieChart, Pie, Legend, Cell } from "recharts";

// Sample data for categories
const data01 = [
  { name: "Investment Amount", value: 400, fill: "#1DF6A7" },
  { name: "Est. Returns", value: 800, fill: "#ECF1F8" },
];

const data02 = [
  { name: "Investment Amount", value: 400, fill: "#1DF6A7" },
  { name: "Est. Returns", value: 600, fill: "#ECF1F8" },
];

const data03 = [
  { name: "Investment Amount", value: 800, fill: "#1DF6A7" },
  { name: "Est. Returns", value: 200, fill: "#ECF1F8" },
];

function GrowthExamples() {
  const [selectedCategory, setSelectedCategory] = useState("Starter Edge");
  const [activationAmount, setActivationAmount] = useState(10); // Default value in lakhs
  const [timePeriod, setTimePeriod] = useState(10); // Default value in lakhs

  const categories = ["Starter Edge", "Progressive Growth", "Pinnacle Growth"];

  // Define different data for each category
  const categoryData = {
    "Starter Edge": data01,
    "Progressive Growth": data02,
    "Pinnacle Growth": data03,
  };

  const currentData = categoryData[selectedCategory] || data01; // Default to data01 if no category is selected

  return (
    <div className="px-10 mt-10">
      <h1 className="font-meuthanies text-4xl">
        Boost Income In Action -<br /> Real Growth Examples
      </h1>
      <div className="md:flex mt-10">
        <div>
          <div className="md:flex bg-[#F6F6F6] md:h-10 gap-3 font-sf-pro md:rounded-full rounded-lg md:w-[432px] overflow-auto">
            {categories.map((category) => (
              <h1
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-2 cursor-pointer rounded-full ${
                  selectedCategory === category
                    ? "bg-customYellow font-semibold"
                    : "bg-transparent"
                }`}
              >
                {category}
              </h1>
            ))}
          </div>
          <div>
            <div>
              <div className="flex mt-8 justify-between items-center mb-4">
                <h1 className="font-sf-pro">Activation Amount</h1>
                <div className="bg-[#F6F6F6] p-2 w-32">
                  <h1>₹ {activationAmount} Lakhs</h1>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={activationAmount}
                onChange={(e) => setActivationAmount(e.target.value)}
                className="w-full accent-customBlue" // Use Tailwind classes for styling
              />

              {/* Time Period Slider */}
              <div className="flex justify-between items-center mt-6 mb-4">
                <h1 className="font-sf-pro">Time Period</h1>
                <div className="bg-[#F6F6F6] w-32 p-2">
                  <h1>{timePeriod} Years</h1>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="w-full accent-customBlue" // Use Tailwind classes for styling
              />
            </div>
            <div className="bg-[#F4FFFB] border font-sf-pro border-[#1DF6A7]  mt-8 p-4">
              <h1 className="font-sf-pro font-semibold">Paxo Returns</h1>
              <div className="flex gap-6 justify-between mt-8">
                <div>
                  <h1 className="font-sf-pro">Invested Amount</h1>
                  <h1 className="font-semibold">₹10 Lakhs</h1>
                </div>
                <div>
                  <h1 className="font-sf-pro text-center">Earn Monthly Payouts</h1>
                  <h1 className="text-center font-semibold">₹40,000</h1>
                </div>
                <div>
                  <h1 className="font-sf-pro text-right">Est Gains</h1>
                  <h1 className="text-right font-semibold"> ₹14.8 Lakhs</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:ml-60">
          <h1 className="font-meuthanies  mt-5">Returns on Investments</h1>
          <div className="-mt-20 md:-ml-8 md:-mb-0 -mb-40">
            <PieChart width={250} height={550}>
              <Pie
                data={currentData}
                cx={120}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
              >
                {currentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend
                height={36}
                iconType="square" // Make the legend icon square
                layout="horizontal"
                verticalAlign="middle"
                align="center"
                iconSize={10}
                padding={5}
                formatter={(value, entry, index) => {
                  return (
                    <span style={{ color: "black" }}>{entry.payload.name}</span>
                  );
                }}
              />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GrowthExamples;
