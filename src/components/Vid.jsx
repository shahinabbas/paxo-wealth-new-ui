import React, { useRef, useState } from "react";
import Image from "/discover.jpg";
import Video from "/Paxo_Wealth_Explainer.mp4";
import { FaPlay, FaPause } from "react-icons/fa";
import { ContainerScroll } from "./Discover/ContainerScroll";
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
      <ContainerScroll>
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
            className="absolute z-10 bg-black/70 text-white rounded-full p-3 md:opacity-0 md:group-hover:opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-300"
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
        </div>
      </ContainerScroll>
    </div>
  );
}

export default Vid;
