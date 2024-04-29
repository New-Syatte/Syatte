import { categorys } from "@/constants/categorys";
import ProductsByCategory from "./ProductsByCategory";
import { getProducts } from "@/services/sanity/products";
import BrandSlider from "./BrandsSlider";
import Heading from "@/components/heading/Heading";
import ProductBanner from "./ProductBanner";
import CategoryToSearchLink from "./CategoryToSearchLink";
import Loader from "@/components/loader/Loader";
import URLS from "@/constants/urls";

export default async function Products({}) {
  const products = await getProducts();
  const categoryValues = categorys.map(category => category.value);

  if (!products) return <Loader />;
  if (products.length === 0)
    return (
      <div className="flex justify-center items-center text-lg w-[300px] bg-bgGray">
        제품이 없습니다!
      </div>
    );

  return (
    <>
      <section className="w-full flex justify-center items-center gap-5 mb-28">
        <BrandSlider />
      </section>
      <section className="flex flex-col gap-[73px]">
        {categoryValues.map((category: string, index: number) => (
          <div key={index}>
            <div className="flex justify-between items-end mb-12">
              <Heading title={categorys[index].title} fontSize="[40px]" />
              <CategoryToSearchLink
                to={URLS.PRODUCT_STORE_SEARCH} // 추후 수정 (Issue #20)
                searchQuery={categorys[index].value}
                className="mb-4 text-center text-black text-lg font-bold"
              >
                {"상품 더보기 >"}
              </CategoryToSearchLink>
            </div>
            <ProductsByCategory
              key={category}
              products={products}
              category={category}
            />
            {index === 0 && <ProductBanner />}
          </div>
        ))}
      </section>
    </>
  );
}
