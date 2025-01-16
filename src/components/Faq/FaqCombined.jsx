import React, { useEffect, useState } from "react";
import FAQ from "./FAQ";
import Explore from "./Explore";
import "./Faq.css";

function FaqCombined() {
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
      <FAQ />
      <Explore />
    </div>
  );
}

export default FaqCombined;
