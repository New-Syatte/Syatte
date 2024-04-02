import Image from "next/image";
import { getImageWithPlaceholder } from "@/app/actions";

interface SlideImageProps {
  data: any;
  index: number;
  width?: number;
  height?: number;
  fill?: boolean;
}
const SlideImage = async ({
  data,
  index,
  width,
  height,
  fill,
}: SlideImageProps) => {
  const { img, base64 } = await getImageWithPlaceholder(data.url);
  return (
    <Image
      key={index}
      className="h-full object-cover"
      src={img.url}
      alt={`SlideImage${index}`}
      width={width}
      height={height}
      fill={fill}
      placeholder="blur"
      blurDataURL={base64}
    />
  );
};

export default SlideImage;
