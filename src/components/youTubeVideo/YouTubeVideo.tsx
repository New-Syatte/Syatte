"use client";

import React from "react";
import YouTube from "react-youtube";

interface Props {
  urlId: string;
}

const YouTubeVideo = (urlId: Props) => {
  const data = urlId.urlId;
  const opts = {
    playerVars: {
      // width를 100%로 설정하여 화면 크기를 100%로 만듭니다.
      width: "100%",
    },
  };

  return (
    <div>
      <YouTube videoId={data} opts={opts} className="flex w-full sm:h-[190px]" />
    </div>
  );
};

export default YouTubeVideo;
