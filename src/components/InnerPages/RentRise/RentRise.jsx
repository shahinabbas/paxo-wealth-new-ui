import React, { useEffect } from "react";
import RentRiseHome from "./RentRiseHome";
import ScrollingStrip from "../BoostIncome/ScrollingStrip";
import Banner from "./Banner";
import WhyChooseRise from "./WhyChooseRise";
import HowItWorksRise from "./HowItWorksRise";
import Faqrise from "./FaqRise";
import Rental from "./Rental";
import RentRiseGraph from "./RentRiseGraph";

function RentRise() {
  useEffect(() => {
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, []);
  return (
    <div>
      <RentRiseHome />
      <ScrollingStrip/>
      <Banner/>
      <WhyChooseRise/>
      <HowItWorksRise/>
      {/* <RentRiseGraph/> */}
      <Faqrise/>
      <Rental/>
    </div>
  );
}

export default RentRise;
