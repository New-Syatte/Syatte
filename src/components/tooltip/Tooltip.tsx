import React from "react";
import styles from "./Tooltip.module.scss";
import classNames from "classnames";

interface ITooltipProps {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  color?: string;
  bgColor?: string;
  orientation?: "top" | "right" | "bottom" | "left";
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

  const setOrientationClass = (type: string) => {
    switch (type) {
      case "top":
        return styles.orientationTop;
      case "right":
        return styles.orientationRight;
      case "bottom":
        return styles.orientationBottom;
      case "left":
        return styles.orientationLeft;
      default:
        break;
    }
  };

  return (
    <span
      role="tooltip"
      style={style}
      className={classNames(styles.tooltip, setOrientationClass(orientation))}
      {...restProps}
    >
      {message}
    </span>
  );
};

export default Tooltip;
