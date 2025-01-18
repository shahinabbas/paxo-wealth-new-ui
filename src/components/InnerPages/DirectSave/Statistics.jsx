import React from "react";

function Statistics() {
  const stats = [
    {
      value: "1,500+",
      label: "Properties Sold",
      description:
        "Successfully connecting buyers with verified builders and developers.",
    },
    {
      value: "₹300+",
      label: "Crores Saved",
      description: "Helping customers save big with exclusive discounts.",
    },
    {
      value: "98%",
      label: "Customer Satisfaction",
      description: "Trusted by happy homeowners.",
    },
  ];

  return (
    <div className="bg-[#6200EE] py-14 px-40 md:mt-14 mt-40">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className=" text-white flex justify-center items-center"
          >
            <div className="">
              <h2 className="text-5xl font-bold text-primary mb-4">
                {stat.value}
              </h2>
              <h3 className="text-xl font-meuthanies mb-2">{stat.label}</h3>
              <p className="text-[#D4B6FF] text-[14px] text-left w-40">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statistics;
