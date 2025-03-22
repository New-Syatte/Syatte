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
  if (isMobile) return <span className="text-center block">{desc}</span>;
  return <></>;
};

export default NoTrimDesc;
