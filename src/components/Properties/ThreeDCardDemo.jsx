"use client";

import React, { useRef } from "react";
import { CardBody, CardContainer, CardItem } from "./CardContainer";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

export function ThreeDCardDemo() {
  const cardContainerRef = useRef(null);

  const cardData = [
    {
      id: 1,
      title: "5 Ways to Simplify Your Earning Journey with Paxo Wealth.",
      date: "24 DEC 2024 | 6min read",
      imageSrc:
        "https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Unlocking the Power of Asset-Backed Security for Your Earnings",
      date: "25 DEC 2024 | 5min read",
      imageSrc:
        "https://images.unsplash.com/photo-1445359179985-460648949e10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Step-by-Step Guide to Using PAXO Wealth’s Dashboard",
      date: "25 DEC 2024 | 5min read",
      imageSrc:
        "https://images.unsplash.com/photo-1472387040940-3ae0cdbf127d?q=80&w=2009&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "The Importance of Transparency in Modern Earning Platforms",
      date: "25 DEC 2024 | 5min read",
      imageSrc:
        "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      title: "Choosing the Right Plan: BoostIncome, Rent Rise, or DirectSave?",
      date: "25 DEC 2024 | 5min read",
      imageSrc:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbWV8ZW58MHx8MHx8fDI%3D",
    },
    
  ];

  // Function to handle left button click
  const scrollLeft = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Function to handle right button click
  const scrollRight = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative font-sf-pro">
      <div className="absolute z-10 sm:flex hidden gap-2 justify-end w-full">
        <button
          className="border border-customBlue text-black p-2 rounded-full"
          onClick={scrollLeft}
        >
          <MdOutlineArrowBackIos />
        </button>
        <button
          className="border  border-customBlue text-black p-2 rounded-full"
          onClick={scrollRight}
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>

      <div
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        ref={cardContainerRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cardData.map((card) => (
          <CardContainer key={card.id} className="inter-var">
            <CardBody className="relative group/card dark:hover:shadow-2xl border-gray-[#B6B6B6] w-[20rem] md:w-[25rem] lg:w-[25rem] h-auto rounded-xl p-6 border">
              <CardItem translatez="100" className="w-full mt-1">
                <img
                  src={card.imageSrc}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <CardItem
                as="p"
                translatez="60"
                className="text-[#999999] text-sm max-w-sm mt-4  relative before:content-['•'] before:mr-2 before:text-[#999999] dark:before:text-white"
              >
                {card.date}
              </CardItem>
              <hr translatez="60" className="mt-4 border-[#6246EA] border-[1.5px]" />
              <div className="justify-between items-center mt-5">
                <CardItem
                  translatez="50"
                  className="text-xl font-bold text-black "
                >
                  {card.title}
                </CardItem>
                <CardItem
                  as="p"
                  translatez="60"
                  className="text-black text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {card.description}
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}
