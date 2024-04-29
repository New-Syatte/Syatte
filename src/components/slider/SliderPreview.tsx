"use client";
import { useDispatch } from "react-redux";
import { setCurrentSlide } from "@/redux/slice/sliderSlice";
import Image, { StaticImageData } from "next/image";
import { Mobile } from "@/hooks/useMediaQuery";

interface SliderPreviewProps {
  id: string;
  imgUrl: StaticImageData;
  index: number;
}

const SliderPreview = ({ id, imgUrl, index }: SliderPreviewProps) => {
  const dispatch = useDispatch();
  const isMobile = Mobile();
  return (
    <Image
      src={imgUrl}
      width={isMobile ? 62 : 97}
      height={isMobile ? 43 : 68}
      alt="introSub"
      onClick={() => dispatch(setCurrentSlide({ id, index }))}
      className="cursor-pointer"
    />
  );
};

export default SliderPreview;
