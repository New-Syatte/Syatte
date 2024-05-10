"use client";

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
  disabled = false,
  ...restProps
}: IButtonProps) => {
  let btnType = "";
  switch (styleType) {
    case "primary":
      btnType = `w-full h-full text-white rounded-md ${
        disabled ? "bg-lightGray text-white" : "bg-primaryBlue"
      } ${style}`;
      break;
    case "secondary":
      btnType = `w-full h-full bg-white text-primaryBlue border border-primaryBlue rounded-md ${
        disabled ? "bg-gray-200 text-gray-400 border-none" : ""
      } ${style}`;
      break;
    case "blank":
      btnType = style;
      break;
    default:
      throw new Error("지원하는 버튼 타입이 존재하지 않습니다.");
  }
  return (
    <button
      className={`box-border inline-flex justify-center items-center ${
        disabled ? "cursor-default" : "cursor-pointer"
      } ${btnType}`}
      type={type}
      disabled={disabled}
      {...restProps}
    />
  );
};

export default Button;
