import React from "react";

const HorizontalLine = ({ mouseX }) => {
  const glowWidth = 200; // Width of the glow effect
  const glowPosition = mouseX ? mouseX - glowWidth / 2 : 0;

  return (
    <svg
      width="1100"
      height="2"
      viewBox="0 0 1700 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-200 ease-in-out text-customBlue"
    >
      {/* Base line with sharper gradient at the edges */}
      <rect
        width="1700"
        height="2"
        fill="#006FFF"
        shapeRendering="crispEdges"
      />

      {/* Moving glow effect */}
      {mouseX && (
        <rect
          width="1700"
          height="2"
          fill="url(#glowGradient)"
          opacity="0.8"
          shapeRendering="crispEdges"
        />
      )}

      <defs>
        {/* Smooth gradient for the base line with sharp needle-like ends */}
        <linearGradient
          id="baseGradient"
          x1="0"
          y1="0.5"
          x2="1350"
          y2="0.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#101010" offset="0" />
          <stop offset="0.02" stopColor="#006FFF" />
          <stop offset="0.98" stopColor="#006FFF" />
          <stop offset="1" stopColor="#101010" />
        </linearGradient>

        {/* Moving gradient for the glow effect */}
        <linearGradient
          id="glowGradient"
          x1={glowPosition}
          y1="0.5"
          x2={glowPosition + glowWidth}
          y2="0.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#101010" />
          <stop offset="0.5" stopColor="#006FFF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#101010" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default HorizontalLine;
