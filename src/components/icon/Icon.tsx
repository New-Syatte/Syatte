import arrowLeft from "./images/chevron-left.svg";
import arrowRight from "./images/chevron-right.svg";
import Image from "next/image";
//추후 이미지 수정 필요

interface IIconProps {
  type: string;
  alt?: string;
  [x: string]: any;
}

const Icon = ({ type, alt = "", ...restProps }: IIconProps) => {
  let src = "";
  switch (type) {
    case "left":
      src = arrowLeft;
      break;
    case "right":
      src = arrowRight;
      break;
    default:
      throw new Error("지원하는 아이콘 타입이 존재하지 않습니다.");
  }
  return <Image src={src} alt={alt} {...restProps}></Image>;
};

export default Icon;
