import React from "react";
import bgVideo from "../../assets/venttup2 (1).mp4";

const BgVideo = () => {
  return (
    <video
      autoPlay
      loop
      muted
      className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
    >
      <source src={bgVideo} type="video/mp4" />
    </video>
  );
};

export default BgVideo;
