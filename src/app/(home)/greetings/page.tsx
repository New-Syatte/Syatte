import GreetingClient from "./GreetingClient";

import topLeft from "@/assets/greetings/topLeft.svg";
import bottomRight from "@/assets/greetings/bottomRight.svg";

import Image from "next/image";

const About = () => {
  return (
    <div className="relative w-full">
      <Image
        src={topLeft}
        alt="triangle"
        width={756}
        height={656}
        className="absolute top-0 left-0 z-0"
      />
      <div
        className="absolute top-0 left-0 z-20 w-full h-full bg-cover"
        style={{ backgroundImage: `url(${topLeft})` }}
      />
      <div className="absolute -top-10 left-40 z-10 font-crimson text-[221px] tracking-[44px] text-white font-light opacity-70">
        SYATT
      </div>
      <GreetingClient />
      <Image
        src={bottomRight}
        alt="triangle"
        width={756}
        height={656}
        className="absolute bottom-0 right-0 z-0"
      />
      <div
        className="absolute bottom-0 right-0 z-20 w-full h-full bg-cover"
        style={{ backgroundImage: `url(${bottomRight})` }}
      />
      <div className="absolute -bottom-10 right-40 z-10 font-crimson text-[221px] tracking-[44px] text-white font-light opacity-70">
        SYATT
      </div>
    </div>
  );
};

export default About;
