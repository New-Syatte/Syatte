"use client";
import classNames from "classnames";
import styles from "./Button.module.scss";

interface IButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  styleType?: "primary" | "secondary" | "blank";
  style?: string;
  [x: string]: any;
}

const Button = ({
  type = "button",
  styleType = "primary",
  style = "",
  ...restProps
}: IButtonProps) => {
  let btnType = "";
  switch (styleType) {
    case "primary":
      btnType = styles.primary;
      break;
    case "secondary":
      btnType = styles.secondary;
      break;
    case "blank":
      btnType = styles.blank;
      break;
    default:
      throw new Error("지원하는 버튼 타입이 존재하지 않습니다.");
  }
  const composeClasses = classNames(style, styles.button, btnType);
  return <button className={composeClasses} type={type} {...restProps} />;
};

export default Button;
