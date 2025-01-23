"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { BackgroundBeamsDemo } from "../Explore/BackgroundBeamsDemo";

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // This helps trigger the scroll effect earlier
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9, 1] : [1.05, 1, 0.9]; // Adjusted the third value to make the scale end slower
  };

  // Adjusting the range to make the effect last longer
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], scaleDimensions()); // Slow down scale transition
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, 0]); // Slow down rotation transition
  const translate = useTransform(scrollYProgress, [0, 0.5, 1], [0, -50, -100]); // Slow down translation

  return (
    <div
      className="h-[60rem] mb-10  flex items-center justify-center relative md:p-20 overflow-hidden"
      ref={containerRef}
    >
      {/* Background Component */}
      <div className="absolute hidden md:block inset-0 z-0">
        <BackgroundBeamsDemo />
      </div>

      {/* Foreground Content */}
      <div
        className="py-10 md:py-40 relative z-10"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        // boxShadow:
        //   "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-5 mx-auto h-[12rem] md:h-[30rem] rounded-[30px] "
    >
      <div className=" h-full overflow-hidden rounded-2xl md:rounded-2xl  ">
        {children}
      </div>
    </motion.div>
  );
};
