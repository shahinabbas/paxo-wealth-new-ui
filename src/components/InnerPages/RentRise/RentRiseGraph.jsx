import React, { useState } from "react";
import {
  AreaChart,
  Area,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CiCircleInfo } from "react-icons/ci";

const data = [
  { month: "Jan", monthlyIncome: 200, annualYield: 240 },
  { month: "Feb", monthlyIncome: 240, annualYield: 270 },
  { month: "Mar", monthlyIncome: 280, annualYield: 320 },
  { month: "Apr", monthlyIncome: 300, annualYield: 340 },
  { month: "May", monthlyIncome: 350, annualYield: 400 },
  { month: "Jun", monthlyIncome: 400, annualYield: 480 },
];

function RentRiseGraph() {
  const [monthlyIncome, setMonthlyIncome] = useState(1);

  return (
    <div className="md:h-screen md:p-8 p-4 ">
      {/* Text part */}
      <h1 className="font-meuthanies text-5xl xl:text-6xl 2xl:mt-20">
        Real-Time Rental Performance Graph
      </h1>
      <div className="md:flex justify-between">
        <div className="flex flex-col md:w-1/2">
          <div className="2xl:w-[700px] xl:w-[600px] lg:w-[500px]">
            <div>
              <div className="flex mt-20  xl:mt-40 justify-between items-center mb-4">
                <h1 className="font-sf-pro">Current Monthly Income</h1>
                <div className="bg-[#F6F6F6] p-2 w-32">
                  <h1>₹ {monthlyIncome} Lakhs</h1>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(parseInt(e.target.value, 10))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1DF6A7 ${
                    monthlyIncome * 2
                  }%, #D9D9D9 ${monthlyIncome * 2}%)`,
                }}
              />
            </div>
            <div className="bg-[#F4F8FF] border font-sf-pro border-customGreen rounded-xl mt-10 xl:mt-20 2xl:mt-32 p-4 w-auto ">
              <h1 className="font-sf-pro xl:text-xl font-semibold">
                Paxo Returns
              </h1>
              <div className="xl:gap-14 gap-6 space-y-4 mt-8">
                <div className="flex justify-between">
                  <h1 className="font-sf-pro xl:text-xl">
                    Current Monthly Income
                  </h1>
                  <h1 className="font-semibold xl:text-xl">
                    ₹ {monthlyIncome} Lakhs
                  </h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-sf-pro xl:text-xl">
                    Projected Annual Yield
                  </h1>
                  <h1 className="md:text-center xl:text-xl font-semibold">
                    ₹ {Number(monthlyIncome * 100000).toFixed(2)}
                  </h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-sf-pro xl:text-xl">
                    Tenant Reliability Score
                  </h1>
                  <h1 className="md:text-right xl:text-xl font-semibold">
                    ₹ {Number(monthlyIncome * 100000).toFixed(2)}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Graph part */}
        <div className="flex justify-center items-center md:w-1/2 mt-20">
          <div>
            <ResponsiveContainer
              width="100%"
              height="100%"
              className="border-l border-b border-b-black border-l-black"
            >
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid stroke="none" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="monthlyIncome"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="annualYield"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="mt-4 flex gap-2">
              <CiCircleInfo className="size-5" />
              <p className="text-sm">
                The graph dynamically displays rental income trends, helping
                <br className="md:block hidden" />
                you make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentRiseGraph;
