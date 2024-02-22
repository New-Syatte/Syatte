"use client";

import React from "react";
import YouTube from "react-youtube";

interface Props {
  urlId: string;
}

const YouTubeVideo = (urlId:Props) => {
  const data = urlId.urlId
  const opts = {
    playerVars: {
      // width를 100%로 설정하여 화면 크기를 100%로 만듭니다.
      width: "100%",
    },
  };

  const onReady = (event: any) => {
    console.log("동영상 플레이어가 준비되었습니다.");
  };

  return (
    <div>
      <YouTube videoId={data} opts={opts} onReady={onReady} className="flex w-full"/>
    </div>
  );
};

export default YouTubeVideo;
