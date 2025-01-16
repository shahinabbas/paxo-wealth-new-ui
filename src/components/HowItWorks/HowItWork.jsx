import React, { useEffect } from "react";
import { FaFaceAngry } from "react-icons/fa6";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { AiOutlineSelect } from "react-icons/ai";
import { AiOutlineControl } from "react-icons/ai";
import { GoGraph } from "react-icons/go";

function HowItWork() {
  useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const articles = [
    {
      title: "Discover Opportunities",
      description:
        "Choose from our tailored solutions – BoostIncome, Rent Rise, or DirectSave. Easily browse through verified and secure plans suited to your goals.",
    icon:<RiCompassDiscoverLine className="text-white text-4xl"/>
    },
    {
      title: "Select & Activate",
      description:
        "Pick a plan that matches your preferences, confirm the details, and let us take care of the rest. No stress, no complicated processes.",
        icon:<AiOutlineSelect className="text-white text-4xl"/>
},
    {
      title: "Stay in Control",
      description:
        "Access your personalized dashboard to track payouts, agreements, and progress in real time, all in one place.",
        icon:<AiOutlineControl className="text-white text-4xl"/>
},
    {
      title: "Enjoy Seamless Growth",
      description:
        "Experience consistent earnings delivered directly to you, securely and hassle-free.",
       icon:<GoGraph className="text-white text-4xl"/>
 },
  ];

  return (
    <div className="bg-black font-sf-pro">
      <div className="flex flex-col p-5  lg:py-11">
        <h1 className="text-white text-center font-meuthanies text-4xl mt-16">
          PAXO Wealth: Your Path to Simple and Secure Earnings in 4 Steps
        </h1>
        <h1 className="text-white text-lg text-center mt-2">
          From exploring opportunities to enjoying consistent payouts, PAXO
          Wealth makes it easy. <br />
          Updates to unlock your earning potential.
        </h1>
        <div className="flex flex-wrap justify-center gap-6 mt-20">
          {articles.map((article, index) => (
            <div
              key={index}
              className="group relative cursor-pointer overflow-hidden bg-gray-900  pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg px-4 w-full sm:w-[48%] lg:w-[23%]"
            >
              <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-customGreen transition-all duration-300 group-hover:scale-[10]"></span>
              <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-customGreen transition-all duration-300 group-hover:bg-customGreen">
{article.icon}                </span>
                <div className="space-y-6 text-2xl pt-5 font-meuthanies leading-7 text-white transition-all duration-300 group-hover:text-white/90">
                  <h1>{article.title}</h1>
                </div>
                <div className="space-y-6 text-md pt-5 leading-7 text-white transition-all duration-300 group-hover:text-white/90">
                  <h1>{article.description}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWork;
