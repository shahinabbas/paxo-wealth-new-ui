// src/components/HomePage/HomePage.js
import React from "react";
import FaqCombined from "../Faq/FaqCombined";
import Properties from "../Properties/Properties";
import Home from "../Home/Home";
import Features from "../Features/Features";
import { HeroScrollDemo } from "../Discover/HeroScrollDemo";
import EarningsSteps from "../EarningsSteps/EarningsSteps";
import Earnings from "../Earnings/Earnings";
import Premium from "../Premium/Premium";
import Explore from "../Explore/Explore";
import DirectSave from "../Home/DirectSave";
import RentRise from "../Home/RentRise";
import BoostIncome from "../Home/BoostIncome";
import Introduction from "../Home/Introduction";
import Combined from "../Home/Combined";
import MatterBox from "./MatterBox";

const HomePage = () => {
  return (
    <div>
      <Home />
      <Features />
      <HeroScrollDemo />
      <Explore />
      <EarningsSteps />
      {/* <Earnings /> */}
      <MatterBox/>
      <Premium />
      <Properties />
      <FaqCombined />
    </div>
  );
};

export default HomePage;
