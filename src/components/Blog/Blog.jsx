import React, { useEffect } from "react";

function Blog() {
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
      title: "5 Ways to Simplify Your Earning Journey with PAXO Wealth",
      description:
        "Discover how PAXO Wealth’s innovative solutions make it easier than ever to achieve steady income with zero hassle.",
    },
    {
      title: "Unlocking the Power of Asset-Backed Security for Your Earnings",
      description:
        "Learn why securing your income with real, verified opportunities ensures consistent and risk-free growth.",
    },
    {
      title: "Step-by-Step Guide to Using PAXO Wealth’s Dashboard",
      description:
        "Learn how to navigate PAXO Wealth’s user-friendly platform to track your income, agreements, and progress effortlessly.",
    },
    {
      title: "The Importance of Transparency in Modern Earning Platforms",
      description:
        "Understand why transparency is a core value at PAXO Wealth and how it builds trust and confidence for users.",
    },
    {
      title: "Choosing the Right Plan: BoostIncome, Rent Rise, or DirectSave?",
      description:
        "Compare PAXO Wealth’s core solutions and choose the right plan to meet your earning goals and financial needs.",
    },
  ];

  return (
    <div className="bg-black font-sf-pro">
      <div className="flex flex-col p-5 lg:px-48 lg:py-11">
        <h1 className="text-white text-center font-meuthanies text-4xl mt-16">
          Smarter Insights for Smarter Earnings
        </h1>
        <h1 className="text-white text-lg text-center mt-2">
          Stay ahead with expert guidance, actionable tips, and the latest
          <br />
          updates to unlock your earning potential.
        </h1>
        <div className="mt-20">
          {articles.map((article, index) => (
              <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
                  <ul className="">
                    <li className="text-left mb-10">
                      <div className="flex flex-row items-start">
                        
                        <div className="bg-gray-900 p-5 pb-10 ">
                          <h4 className="text-xl leading-6 font-meuthanies text-customGreen">
                            {article.title}
                          </h4>
                          <p className="mt-2 text-md leading-6 text-white">
                            {article.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
