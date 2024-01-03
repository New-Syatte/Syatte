"use client";
import classNames from "classnames";
import styles from "./Button.module.scss";

interface IButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  secondary?: boolean;
  style?: string;
  [x: string]: any;
}

const Button = ({
  type = "button",
  secondary = false,
  style = "",
  ...restProps
}: IButtonProps) => {
  const composeClasses = classNames(
    style,
    styles.button,
    secondary ? styles.secondary : styles.primary,
  );
  return <button className={composeClasses} type={type} {...restProps} />;
};

export default Button;
