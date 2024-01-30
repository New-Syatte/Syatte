"use client";

import React from "react";
import YouTube from "react-youtube";

interface Props {
  urlId: string;
}

const YouTubeVideo = (urlId:Props) => {
  const data = urlId.urlId
  const opts = {
    height: "360",
    width: "650",
  };

  const onReady = (event: any) => {
    console.log("동영상 플레이어가 준비되었습니다.");
  };

  return (
    <div>
      <YouTube videoId={data} opts={opts} onReady={onReady} className="flex"/>
    </div>
  );
};

export default YouTubeVideo;
