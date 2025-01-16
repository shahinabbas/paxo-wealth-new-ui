"use client";
import React from "react";
import {
  GlowingStarsTitle,
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
} from "./GlowingStarsBackgroundCard";
import { RxArrowTopRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export function GlowingStarsBackgroundCardPreview() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/about-us");
  };

  return (
    <div className="flex antialiased" onClick={handleLearnMore}>
      <GlowingStarsBackgroundCard>
        <h1 className="-mt-48 text-xl font-bold text-white">About Us</h1>
        <div className="flex justify-between ">
          <h1 className="text-[10px] mt-2 text-white">
            Paxo Wealth is your gateway to financial growth, combining smart
            technology with asset-backed security.{" "}
          </h1>
        </div>
        <div
          className="flex w-[110px] rounded-full p-1 mt-[63px] justify-center items-center text-[12px]  bg-customYellow  text-black"
          onClick={handleLearnMore}
        >
          <h1>Learn More</h1> <RxArrowTopRight />
        </div>
      </GlowingStarsBackgroundCard>
    </div>
  );
}

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-4 w-4 text-white stroke-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  );
};
