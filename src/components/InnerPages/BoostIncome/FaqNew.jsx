import React, { useState } from "react";
import { motion } from "framer-motion";
import { RxArrowTopRight } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import image from "/explore.png";
import { MdArrowOutward } from "react-icons/md";

const faqData = [
  {
    question: "What is Paxo Wealth?",
    answer:
      "PAXO Wealth is a secure platform offering tailored solutions for consistent and hassle-free earnings through BoostIncome, Rent Rise, and DirectSave.",
  },
  {
    question: "How does Boost Income work?",
    answer:
      "BoostIncome provides immediate financial growth by tying plans to verified, asset-backed properties. You receive consistent payouts for 12 months.",
  },
  {
    question: "What types of properties are eligible for Rent Rise?",
    answer:
      "You can lease residential flats, commercial spaces, open lands, and even under-construction properties through Rent Rise.",
  },
  {
    question: "How much can I save with Direct Save?",
    answer:
      "DirectSave offers savings of up to 30% by connecting you directly with trusted developers, eliminating intermediaries.",
  },
  {
    question: "How secure is my income on PAXO Wealth?",
    answer:
      "All plans are backed by real, verified properties and legal agreements to ensure secure and predictable payouts.",
  },
  {
    question: "Can I track my payouts and progress?",
    answer:
      "Yes, you can monitor all activities, agreements, and payouts in real time through your personalized dashboard.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "Currently, payouts are processed via secure NEFT or direct bank transfers in Phase 1.",
  },
  {
    question: "Do I need prior experience to use PAXO Wealth?",
    answer:
      "Not at all. PAXO Wealth’s hassle-free process is designed for everyone, regardless of experience.",
  },
  {
    question: "Is there any risk involved in these opportunities?",
    answer:
      "While minimal risks exist in all financial activities, PAXO Wealth minimizes them by tying all plans to verified properties and maintaining full transparency.",
  },
  {
    question: "How do I get started with PAXO Wealth?",
    answer:
      "Simply sign up, explore our tailored solutions, and activate the plan that fits your goals.",
  },
];

export default function FaqNew() {
  const [expanded, setExpanded] = useState(null);
  const location = useLocation();

  const toggleAccordion = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  // Determine how many FAQs to show based on the current path
  const faqsToShow =
    location.pathname === "/faq" ? faqData : faqData.slice(0, 5);

  return (
      <div className="relative max-w-full min-h-screen">
        <div className="md:max-w-4xl xl:max-w-7xl mx-auto p-4 h-full flex flex-col relative z-10">
          <div className="text-center md:mt-10 xl:mt-20 flex items-center justify-center">
            <div>
              <h2 className="text-[40px] xl:text-6xl font-meuthanies">
                Got Questions?
              </h2>
              <h1 className="text-[40px] xl:text-6xl xl:mt-2 font-meuthanies">
                We've Got <span className="text-customBlue">Answers</span>
              </h1>
            </div>
          </div>
  
          <div className="flex-grow mt-10 space-y-4 font-sf-pro">
            {faqsToShow.map((faq, index) => (
              <div key={index} className="overflow-hidden ">
                <button
                  className="w-full py-5 xl:py-8 border-l-2 border-customBlue flex justify-between items-center px-4 text-lg font-medium text-left bg-[#F1F1F1] "
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{faq.question}</span>
                  <span className="ml-2">{expanded === index ? "−" : "+"}</span>
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    expanded === index
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{
                    duration: expanded === index ? 0.4 : 1.2,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden"
                >
                  {expanded === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                      }}
                      className="px-4 py-2 text-sm border-l-2 border-customBlue  font-medium text-left bg-[#F1F1F1] "
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        {location.pathname !== "/faq" && (
          <div className="flex justify-center font-medium mt-10 ">
            <Link
              to="/faq"
              className="bg-customYellow gap-2 font-sf-pro w-[210px] rounded-full p-2 flex justify-center items-center"
            >
              <h1>Explore FAQ's Now</h1> <MdArrowOutward />
            </Link>
          </div>
        )}
      </div>
    );
  }

