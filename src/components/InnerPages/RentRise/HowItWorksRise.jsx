import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Rent from "/Rent.gif";
const steps = [
  {
    title: "Explore High-Yield Rental Properties",
    description:
      "Browse our curated list of premium rental properties selected for their high return potential",
  },
  {
    title: "Verify and Finalize",
    description:
      "Our team ensures that all properties and tenants are pre-verified, providing a secure and worry-free rental process.",
  },
  {
    title: "Automated Agreement Setup",
    description:
      "Leases are digitally created, signed, and managed, eliminating manual paperwork and saving time.",
  },
  {
    title: "Monthly Payouts",
    description:
      "Receive steady monthly rental income directly to your bank account.",
  },
  {
    title: "Monitor Progress",
    description:
      "Use your personalized dashboard to track rental payments, tenant performance, and property insights.",
  },
];

function HowItWorksRise() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative h-[190vh] xl:h-[120vh] 2xl:h-[100vh]">
      {/* Heading */}
      <h1 className="font-meuthanies text-center text-5xl px-8 mt-8 relative z-10">
        How Rent Rise Works!{" "}
      </h1>
      <div className="flex justify-center">
        <div className=" px-2 md:px-8 mt-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="panel sticky top-20 bg-[#F6F6F6] p-4 md:p-6 md:w-[800px] rounded-xl md:flex"
              style={{
                transform:
                  scrollY > index * 400
                    ? `translateY(${index * 44}px)`
                    : `translateY(${index * 30 + 100}px)`,
                opacity: scrollY > index * 400 ? 1 : 0,
                transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
                zIndex: 10 + index,
              }}
            >
              <div className="">
                <div>
                  <h1 className="font-meuthanies">0{index + 1}</h1>
                  <h1 className="font-meuthanies text-customBlue text-3xl">
                    {step.title}
                  </h1>
                  <h1 className="mt-4 text-black">{step.description}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorksRise;
