import React from "react";

function PropertiesHome() {
  return (
    <div
      className="h-[400px] md:h-[500px] bg-customBlue flex items-center justify-center"
      style={{
        backgroundImage: "url(/explore1.png)",
        backgroundSize: "100% 80%", // Adjusts the image height to 60% of its original size
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center">
        <h1 className="font-meuthanies text-white text-4xl md:text-5xl xl:text-7xl">
          Instant Growth, Secure <br />
          and Hassle-Free
        </h1>
      </div>
    </div>
  );
}

export default PropertiesHome;
