import React, { useEffect } from "react";
import Unlock from "./Unlock";
import WhyChoose from "./WhyChoose";
import FaqNew from "./FaqNew";
import GrowthJourney from "./GrowthJourney";
import HowItWork from "./HowItWorks";
import GrowthExamples from "./GrowthExamples";
import BoostIncomeHome from "./BoostIncomeHome";
import ScrollingStrip from "./ScrollingStrip";

function BoostIncomePage() {
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
      {/* <BoostIncomeHome />
      <ScrollingStrip />
      <Unlock /> */}
      {/* <div id="highlighted">
        <Highlighted />
      </div> */}
      <div id="HowItWork">
        <HowItWork />
      </div>
      {/* <GrowthExamples />
      <WhyChoose />
      <FaqNew />
      <GrowthJourney /> */}
    </div>
  );
}

export default BoostIncomePage;
