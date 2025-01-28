import { getProducts } from "@/services/sanity/products";
import logo from "public/brand/midasmetall-img/midasmetall-logo.png";
import PaintSlider from "./components/PaintSlider";
import StoreSection from "./components/StoreSection";
import VideoSection from "./components/VideoSection";
import ProductFeatures from "./components/ProductFeatures";
import BrandLayout from "@/components/brandPage/BrandLayout";
import Loader from "@/components/loader/Loader";

const TITLE_BANNER_TEXT = `MIDAS METALLl은 10년 이상의 경험을 쌓은 팀으로 구성되어, 고객을 위한 우수한 금속 마감 솔루션을 제공하고 있습니다. 금속 선택부터 혼합물 준비, 그리고 표면 마감까지의 모든 단계에서 자체 개발한 MIDAS METALLl 제품을 제공합니다. 숙련된 기술자와 기획자로 이루어져 있어 다양한 금속 솔루션을 고객의 요구에 맞게 개발하고 있습니다. 금, 은, 구리 등 다양한 금속 소재를 사용하여 어떠한 형태의 마감이 가능합니다.`;
const MIDASMETALL_INFO_TEXT_1 = `마이다스 메탈은 고급 금속 마감 솔루션 분야에서 선도적인 기업으로 손꼽힙니다. IF Material Award 2007에서 수상한 금상과 IF 제품 디자인 어워드 2007에서의 주목을 통해 기술적 우수성과 디자인적 창의성을 입증하였습니다.`;
const MIDASMETALL_INFO_TEXT_2 = `뿐만 아니라, Thuringia Newspaper Group의 Founder's Prize Market Gap 2008을 획득하여 시장에서의 차별성과 혁신성을 인정받았으며, 2009년에는 건축 및 건설 부문 AIT 혁신상을 수상하여 업계에서의 혁신을 증명했습니다.`;
const MIDASMETALL_INFO_TEXT_3 = `이어진 2010년에는 튀링겐 창립자상에서 성공적인 젊은 기업 부문에서 3위를 차지하여 지속적인 성장과 혁신적인 업적을 선보이고 있습니다. 마이다스 메탈은 훌륭한 품질과 혁신적인 디자인을 바탕으로 꾸준한 성공을 이루어내고 있습니다.`;
const MIDASMETALL_ARTWORK_TEXT = `마이다스 메탈 페인트로 창조된 다채로운 작품들을 확인하세요. 고유한 텍스처와 색상으로 표현된 예술적인 아트워크를 확인할 수 있습니다.`;

export default async function MidasMetall() {
  const products = await getProducts();

  if (!products) {
    return <Loader />;
  }

  return (
    <BrandLayout
      logo={logo}
      brandName="Midas Metall"
      countryName="독일"
      titleBannerText={TITLE_BANNER_TEXT}
      infoTexts={[
        MIDASMETALL_INFO_TEXT_1,
        MIDASMETALL_INFO_TEXT_2,
        MIDASMETALL_INFO_TEXT_3,
      ]}
      videoId="03mGS92FB50"
      artworkText={MIDASMETALL_ARTWORK_TEXT}
      VideoSection={VideoSection}
      PaintSlider={PaintSlider}
      StoreSection={StoreSection}
      products={products}
    >
      <ProductFeatures />
    </BrandLayout>
  );
}
