import React, { useEffect, useState } from "react";
import { PieChart, Pie, Legend, Cell } from "recharts";

function GrowthExamples() {
  const [selectedCategory, setSelectedCategory] = useState("Starter Edge");
  const [activationAmount, setActivationAmount] = useState(1000000);
  const [chartDimensions, setChartDimensions] = useState({
    width: 400,
    height: 790,
  });

  const [lockInPeriod, setLockInPeriod] = useState(12);
  const yearlyGrowth = 0.48;
  const monthlyPayoutRate = 0.04;
  const monthlyPayout = activationAmount * monthlyPayoutRate;
  const yearlyPayout = activationAmount * yearlyGrowth;
  const totalMonthlyPayout = monthlyPayout * 12 * lockInPeriod;
  const totalYearlyGrowth = yearlyPayout * lockInPeriod;
  const totalReturns = totalMonthlyPayout + totalYearlyGrowth;

  const categories = ["Starter Edge", "Progressive Growth", "Pinnacle Growth"];

  const computeStarterEdgeData = () => [
    {
      name: "Investment Amount",
      value: activationAmount,
      fill: "#0056E0",
    },
    {
      name: "Est. Returns",
      value: totalYearlyGrowth,
      fill: "#ECF1F8",
    },
  ];

  const computeProgressiveGrowthData = () => [
    {
      name: "Investment Amount",
      value: activationAmount,
      fill: "#1DF6A7",
    },
    {
      name: "Est. Returns",
      value: totalYearlyGrowth,
      fill: "#ECF1F8",
    },
  ];

  const computePinnacleGrowthData = () => [
    {
      name: "Investment Amount",
      value: activationAmount,
      fill: "#1DF6A7",
    },
    {
      name: "Est. Returns",
      value: totalYearlyGrowth,
      fill: "#ECF1F8",
    },
  ];

  const getCategoryData = (category) => {
    switch (category) {
      case "Starter Edge":
        return computeStarterEdgeData();
      case "Progressive Growth":
        return computeProgressiveGrowthData();
      case "Pinnacle Growth":
        return computePinnacleGrowthData();
      default:
        return [];
    }
  };

  const currentData = getCategoryData(selectedCategory);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartDimensions({ width: 350, height: 800 });
      } else {
        setChartDimensions({ width: 400, height: 790 });
      }
    };

    window.addEventListener("resize", handleResize);

    // Call the function initially to set dimensions
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="md:px-10 mt-10 ">
      <h1 className="font-meuthanies xl:text-6xl text-4xl px-5">
        Boost Income In Action -<br /> Real Growth Examples
      </h1>
      <div className="md:flex mt-12">
        <div className="px-5">
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
              <div className="flex mt-10 justify-between items-center mb-4">
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
                onChange={(e) =>
                  setActivationAmount(parseInt(e.target.value, 10))
                }
                className="w-full accent-customBlue"
              />

              {/* Time Period Slider */}
              <div className="flex justify-between items-center mt-6 mb-4">
                <h1 className="font-sf-pro">Lock-In Period</h1>
                <div className="bg-[#F6F6F6] w-32 p-2">
                  <h1>{lockInPeriod} Years</h1>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={lockInPeriod}
                onChange={(e) => setLockInPeriod(parseInt(e.target.value, 10))}
                className="w-full accent-customBlue"
              />
            </div>

            <div className="bg-[#F4F8FF] border font-sf-pro border-customBlue rounded-xl  mt-10 p-4">
              <h1 className="font-sf-pro xl:text-xl font-semibold">
                Paxo Returns
              </h1>
              <div className="md:flex xl:gap-14 gap-6 md:space-y-0 space-y-3 justify-between mt-8">
                <div>
                  <h1 className="font-sf-pro xl:text-xl ">Activation Amount</h1>
                  <h1 className="font-semibold xl:text-xl ">
                    ₹ {activationAmount} Lakhs
                  </h1>
                </div>
                <div>
                  <h1 className="font-sf-pro xl:text-xl  md:text-center">
                    Earn Monthly Payouts
                  </h1>
                  <h1 className="md:text-center xl:text-xl font-semibold">
                    ₹ {Number(monthlyPayout * 100000).toFixed(2)}
                  </h1>
                </div>
                <div>
                  <h1 className="font-sf-pro xl:text-xl  md:text-right">
                    Est Gains
                  </h1>
                  <h1 className="md:text-right xl:text-xl  font-semibold">
                    ₹ {Number(totalYearlyGrowth * 100000).toFixed(2)}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:ml-[200px] xl:ml-[400px] h-[500px] ">
          <h1 className="font-meuthanies xl:text-2xl md:-mt-10 mt-5 md:-ml-16 text-center">
            Paxo Returns
          </h1>
          <div className=" absolute mt-10 border md:-ml-16 ml-1 border-customBlue w-24 rounded-full p-2">
            <p className="text-[13px] text-center">48% Returns</p>
          </div>
          <div className=" md:-ml-8 md:-mb-0 -mb-80">
            {/* <PieChart width={400} height={790}> */}
            <PieChart
              width={chartDimensions.width}
              height={chartDimensions.height}
            >
              <Pie
                data={currentData}
                cx={180}
                cy={200}
                innerRadius={100}
                outerRadius={160}
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
                iconType="square"
                layout="horizontal"
                verticalAlign="middle"
                align="center"
                iconSize={10}
                padding={5}
                formatter={(value, entry) => (
                  <span style={{ color: "black" }}>{entry.payload.name}</span>
                )}
              />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GrowthExamples;
