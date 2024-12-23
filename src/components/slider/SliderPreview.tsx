"use client";
import { useDispatch } from "react-redux";
import { setCurrentSlide } from "@/redux/slice/sliderSlice";
import Image, { StaticImageData } from "next/image";

interface Props {
  id: string;
  imgUrl: string | StaticImageData;
  index: number;
}

const SliderPreview = ({ id, imgUrl, index }: Props) => {
  const dispatch = useDispatch();
  return (
    <Image
      src={imgUrl}
      alt="introSub"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      onClick={() => dispatch(setCurrentSlide({ id, index }))}
      className="cursor-pointer"
    />
  );
};

export default SliderPreview;
