"use client";

import React from "react";
import YouTube from "react-youtube";

interface Props {
  urlId: string;
}

const YouTubeVideo = (urlId: Props) => {
  const data = urlId.urlId;

  return (
    <YouTube
      videoId={data}
      className="aspect-video"
      iframeClassName="w-full h-full rounded-lg"
    />
  );
};

export default YouTubeVideo;
