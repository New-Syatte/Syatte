import { getProducts } from "@/services/sanity/products";
import logo from "public/brand/modernmasters-img/modernmasters-logo.png";
import PaintSlider from "./components/PaintSlider";
import StoreSection from "./components/StoreSection";
import VideoSection from "./components/VideoSection";
import BrandLayout from "@/components/brandPage/BrandLayout";

const TITLE_BANNER_TEXT = `Modern Masters는 고급 특수 페인트를 제조하는 세계 최고의 회사입니다. 제품은 미국을 비롯한 다양한 국가의 4,000개 이상의 소매점에서 판매며, 회사의 제품 라인에는 건축가, 디자이너, 계약자, 그리고 장식 화가를 위해 특별히 제작된 다양한 제품이 포함되어 있습니다. Metallic Paint Collection, Metal Effects, 건축 텍스처, 테마 페인트, 블랙라이트 페인트, 유약, 광택제, 그리고 Crackles 등이 그 중에 속합니다. Modern Masters의 제품은 전 세계적으로 유명한 장소에서 사용되고 있습니다.`;
const MODERN_MASTERS_INFO_TEXT_1 = `Modern Masters는 1960년대 초에 캘리포니아의 San Fernando Valley에서 시작된 회사로, 처음에는 Custom Paint & Chemical로 알려져 있었습니다. 주로 가구, 장식용 액세서리, 주거용 조명, 그리고 벽 장식용 코팅 제품을 생산했습니다. 회사는 최고 품질의 코팅을 제공하고 "지불한 만큼 얻는다"는 모토를 따르며 성장했습니다.`;
const MODERN_MASTERS_INFO_TEXT_2 = `1989년, 가구 산업의 변화에 대응하기 위해 Modern Masters는 초점을 바꾸어 고급 예술가 재료 시장으로 진출했습니다. 이때 회사는 Modern Masters Artist Acrylics라는 고급 아���릴 페인트를 선보였고, 이는 투명 용기에 담겨 다양한 색상을 소비자에게 제공했습니다.`;
const MODERN_MASTERS_INFO_TEXT_3 = `1996년에는 회사의 이름이 CPC Modern Masters Inc.로 변경되었고, 2000년 8월에는 오하이오주 메디나에 있는 RPM Inc.라는 상장 지주 회사에 매각되었습니다. 그 후, 2017년에는 Rust-Oleum 브랜드 제품군에 합류하여 지속적인 성장을 이어가고 있습니다.`;
const MODERN_MASTERS_ARTWORK_TEXT = `모던마스터즈 페인트로 창조된 다채로운 작품들을 확인하세요. 고유한 텍스처와 색상으로 표현된 예술적인 아트워크를 확인할 수 있습니다.`;

export default async function ModernMasters() {
  const products = await getProducts();

  return (
    <BrandLayout
      logo={logo}
      brandName="Modern Masters"
      countryName="미국"
      titleBannerText={TITLE_BANNER_TEXT}
      infoTexts={[
        MODERN_MASTERS_INFO_TEXT_1,
        MODERN_MASTERS_INFO_TEXT_2,
        MODERN_MASTERS_INFO_TEXT_3,
      ]}
      videoId="qj5TKQbbRYg"
      artworkText={MODERN_MASTERS_ARTWORK_TEXT}
      VideoSection={VideoSection}
      PaintSlider={PaintSlider}
      StoreSection={StoreSection}
      products={products}
    />
  );
}
