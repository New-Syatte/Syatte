"use client";

import YouTubeVideo from "@/components/youTubeVideo/YouTubeVideo";

interface VideoSectionProps {
  videoId: string;
}

export default function VideoSection({ videoId }: VideoSectionProps) {
  return (
    <div className="flex w-2/3 justify-center items-center my-auto z-10">
      <div className="w-2/3">
        <YouTubeVideo urlId={videoId} />
      </div>
    </div>
  );
}
