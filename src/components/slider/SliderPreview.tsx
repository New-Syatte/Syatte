"use client";
import { useDispatch } from "react-redux";
import { setCurrentSlide } from "@/redux/slice/sliderSlice";
import Image, { StaticImageData } from "next/image";

interface SliderPreviewProps {
  id: string;
  imgUrl: StaticImageData;
  index: number;
}

const SliderPreview = ({ id, imgUrl, index }: SliderPreviewProps) => {
  const dispatch = useDispatch();
  return (
    <Image
      src={imgUrl}
      width={97}
      height={68}
      alt="introSub"
      onClick={() => dispatch(setCurrentSlide({ id, index }))}
      className="cursor-pointer"
    />
  );
};

export default SliderPreview;