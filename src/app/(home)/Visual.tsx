"use client";
import Image from "next/image";
import main_visual1 from "@/assets/main/main-visual1.png";

const Visual = () => {
  return (
    <div className="w-full h-screen text-white">
      <Image src={main_visual1} fill alt="Main_Image" className="relative" />
      <div className="flex flex-col absolute top-[140px] left-[80px] text-left">
        <p className="text-3xl text-black">DRYWALL TOOLS</p>
        <p className="text-9xl font-black text-black">
          Columbia
          <br /> Tools
        </p>
      </div>
    </div>
  );
};

export default Visual;
