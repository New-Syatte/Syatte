import React from "react";

interface ITooltipProps {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  color?: string;
  bgColor?: string;
  direction?: "top" | "right" | "bottom" | "left";
  message: string;
  [x: string]: any;
}

const Tooltip = ({
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
  color = "",
  bgColor = "",
  orientation = "top",
  message,
  ...restProps
}: ITooltipProps) => {
  const style = {
    top,
    right,
    bottom,
    left,
    color,
    backgroundColor: bgColor,
  };

  let direction = "";
  switch (orientation) {
    case "top":
      direction = "before:top-[-10px] before:border-t-[transparent]";
      break;
    case "right":
      direction = "before:right-[-10px] before:border-r-[transparent]";
      break;
    case "bottom":
      direction = "before:bottom-[-10px] before:border-b-[transparent]";
      break;
    case "left":
      direction = "before:left-[-10px] before:border-l-[transparent]";
      break;
    default:
      break;
  }

  return (
    <span
      role="tooltip"
      style={style}
      className={`absolute min-w-[225px] py-[0.5em] px-[0.75em] text-[10px] rounded-[2px] bg-[#f4f4f4] text-[#555555] before:content-[""] before:absolute before:border-[5px] before:border-[#f4f4f4] h-full ${direction}`}
      {...restProps}
    >
      {message}
    </span>
  );
};

export default Tooltip;
