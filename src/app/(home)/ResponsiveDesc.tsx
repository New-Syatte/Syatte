"use client";
import { Mobile } from "@/hooks/useMediaQuery";

const NoTrimDesc = ({ desc }: { desc: string }) => {
  const isMobile = Mobile();
  if (!isMobile)
    return (
      <>
        {desc.split(".").map((sentence, index) => (
          <span key={index}>
            {sentence.trim()}
            {index < desc.split(".").length - 1 && "."}
            <br />
          </span>
        ))}
      </>
    );
  if (isMobile) return <div className="text-center">{desc}</div>;
  return <></>;
};

export default NoTrimDesc;
