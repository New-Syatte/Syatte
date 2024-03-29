"use client";

interface IButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  styleType?: "primary" | "blank";
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
      btnType = `w-[166px] h-[50px] bg-colorBlack text-white ${
        disabled ? "bg-gray-600 text-gray-300" : ""
      }`;
      break;
    case "blank":
      btnType = style;
      break;
    default:
      throw new Error("지원하는 버튼 타입이 존재하지 않습니다.");
  }
  return (
    <button
      className={`cursor-pointer box-border inline-flex justify-center items-center ${
        disabled ? "cursor-not-allowed" : ""
      } ${btnType}`}
      type={type}
      disabled={disabled}
      {...restProps}
    />
  );
};

export default Button;
