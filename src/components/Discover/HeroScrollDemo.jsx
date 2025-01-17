import React, { useRef, useState, useEffect } from "react";
import { ContainerScroll } from "./ContainerScroll";
import Image from "/discover.jpg";
import Video from "/Paxo_Wealth_Explainer.mp4";
import AboutUsAnimation from "./AboutUsAnimation";
import { FaPlay, FaPause } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";
import { BackgroundBeamsDemo } from "../Explore/BackgroundBeamsDemo";

export function HeroScrollDemo() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex md:mt-0 -mt-10 flex-col bg-white text-black md:-mb-64 -mb-48">
      <ContainerScroll
        titleComponent={
          <div className="mb-10">
            <div className="md:flex md:mt-0 mt-40">
              <AboutUsAnimation />
              <div className="md:ml-20">
                <h1 className="text-[45px] mt-10 md:mt-0 font-meuthanies">
                  Discover How Paxo Wealth <br />
                  <span>Simplifies Smart Earnings</span>
                </h1>
                <h2 className="text-[13px] ml-2 font-sf-pro md:text-left text-black opacity-50">
                  Paxo Wealth is your gateway to financial growth, combining
                  smart technology with asset-backed{" "}
                  <br className="hidden md:block" /> security. Our platform
                  ensures guaranteed returns, steady income, and exclusive
                  deals—eliminating <br className="hidden md:block" />
                  risks and complexity for you.
                </h2>
              </div>
            </div>
          </div>
        }
      >
        <div className="relative justify-center items-center flex group">
          {/* Video Element */}
          <video
            src={Video}
            alt="hero"
            ref={videoRef}
            className="w-auto md:h-[500px] h-auto rounded-xl object-cover"
            loop
            playsInline
          />

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="absolute inset-0 m-auto bg-black text-white rounded-full p-4 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ width: "60px", height: "60px" }}
          >
            {isPlaying ? <FaPause size={24} /> : <CiPlay1 size={24} />}
          </button>
        </div>
      </ContainerScroll>
    </div>
  );
}
