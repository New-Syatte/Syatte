"use client";
import { useState } from "react";
import Icon from "../icon/Icon";

interface VideoPlayerProps {
  videoUrls: string[];
  width: number;
  height: number;
  [key: string]: any;
}

const VideoPlayer = ({
  videoUrls,
  width,
  height,
  ...restProps
}: VideoPlayerProps) => {
  const [index, setIndex] = useState(0);
  const nextVideo = () => {
    if (index === videoUrls.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const prevVideo = () => {
    if (index === 0) {
      setIndex(videoUrls.length - 1);
    } else {
      setIndex(index - 1);
    }
  };
  return (
    <div className="relative w-screen flex justify-center items-center bg-colorBlack">
      <button
        onClick={prevVideo}
        className="absolute left-0 text-6xl text-colorWhite opacity-60 ml-8"
      >
        <Icon type="left" className="w-16 h-16" />
      </button>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoUrls[index]}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
      <button
        onClick={nextVideo}
        className="absolute right-0 text-6xl text-colorWhite opacity-60 mr-8"
      >
        <Icon type="right" className="w-16 h-16" />
      </button>
    </div>
  );
};

export default VideoPlayer;
