import React, { useRef, useState } from "react";
import Image from "/discover.jpg";
import Video from "/Paxo_Wealth_Explainer.mp4";
import { FaPlay, FaPause } from "react-icons/fa";
import { ContainerScroll } from "./Discover/ContainerScroll";
import AboutUsAnimation from "./Discover/AboutUsAnimation";
function Vid() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      console.log("clicked");

      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <div className="flex md:mt-0 -mt-10 flex-col bg-white text-black md:-mb-72 -mb-48">
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
            className="absolute z-20 bg-black/70 text-white rounded-full p-3 md:opacity-0 md:group-hover:opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-300"
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
        </div>
      </ContainerScroll>
    </div>
    </div>
  );
}

export default Vid;
