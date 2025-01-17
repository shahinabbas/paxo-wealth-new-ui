import React from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

function Values() {
  // Example data (2D array)
  const headers = [
    { label: "Features" }, // No icon for the first header
    { label: "Real Estate " },
    { label: "Stocks" },
    { label: "Bonds" },
    { label: "Cash" },
    { label: "Gold" },
  ];
  const data = [
    [
      "Consistent Monthly Benefits",
      <span className="flex items-center gap-2">
        <TiTick className="text-green-500" />
        Regular Payouts
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        Highly variable{" "}
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        Limited flow{" "}
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        None
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        None
      </span>,
    ],
    [
      "Reccuring Earnings",
      <span className="flex items-center gap-2">
        <TiTick className="text-green-500" />
        Steady Income{" "}
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        Unpredictable{" "}
      </span>,
      <span className="flex items-center gap-2">
        <TiTick className="text-green-500" />
        Structured Payouts{" "}
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        No Growth{" "}
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        None{" "}
      </span>,
    ],
    [
      "Clear Growth Potential",
      <span className="flex items-center gap-2">
        <TiTick className="text-green-500" />
        Gradual Appreciation{" "}
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        Market Dependent{" "}
      </span>,
      <span className="flex items-center gap-2">
        <TiTick className="text-green-500" />
        Fixed but Limited{" "}
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        Static{" "}
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        Slower Growth{" "}
      </span>,
    ],
    [
      "Wealth Accumulation",
      <span className="flex items-center gap-2">
        <TiTick className="text-green-500" />
        Builds Property Value
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        Risk Of Loss{" "}
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        Restricted Growth{" "}
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        None{" "}
      </span>,
      <span className="flex items-center gap-2">
        <TiTick className="text-green-500" />
        Slow But Steady{" "}
      </span>,
    ],
    [
      "Tangible Asset Advantage",
      <span className="flex items-center gap-2">
        <TiTick className="text-green-500" />
        Real Physical Asset
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        Paper Asset{" "}
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        Paper-Based
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        None{" "}
      </span>,
      <span className="flex items-center gap-2">
        <TiTick className="text-green-500" />
        Precious Metal{" "}
      </span>,
    ],
    [
      "Lower Risk Alternative",
      <span className="flex items-center gap-2">
        <TiTick className="text-green-500" />
        Stable and Secure{" "}
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        High Volatility{" "}
      </span>,
      <span className="flex items-center gap-2">
        <TiTick className="text-green-500" />
        Moderately Secure{" "}
      </span>,
      <span className="flex items-center gap-2">
        <TiTick className="text-green-500" />
        Risk-Free{" "}
      </span>,
      <span className="flex items-center gap-2">
        <ImCross className="text-red-500" />
        Market Sensitive{" "}
      </span>,
    ],
  ];
  return (
    <div className="mt-24 px-5 md:px-40">
      <h1 className="font-meuthanies text-3xl text-center">
        How Paxo Wealth Creates Value For You
      </h1>
      {/* Add scrollable container */}
      <div className="overflow-x-auto mt-10">
        <table className="table-auto border-collapse border font-sf-pro border-gray-400 w-full min-w-full">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-400 p-2 text-left font-bold bg-gray-100 text-sm md:text-base"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-400 p-2 text-left text-sm md:text-base"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Values;
