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
    <main className="w-full mt-8 sm:mt-0 mx-auto mb-[200px] flex flex-col justify-around items-center overflow-x-hidden">
      <header className="w-full h-52 sm:mt-16 sm:mb-12 mb-[70px] flex justify-center items-center gap-44 relative">
        <div className="flex justify-center items-center flex-col text-center text-black">
          <h3 className="text-center sm:text-base text-2xl font-normal font-garamond">
            STORE
          </h3>
          <h1 className="sm:text-3xl text-[70px] sm:font-black font-bold font-helvetica">
            공식 스토어
          </h1>
        </div>
      </header>
      <section className="flex flex-col justify-center items-center w-full">
        <section className="sm:w-[86%] w-full flex justify-center items-center gap-5 sm:mb-24 mb-28">
          <BrandSlider />
        </section>
        <section className="flex sm:w-full flex-col gap-[73px] justify-center items-center">
          {categoryValues.map((category: string, index: number) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center sm:w-[90%]"
            >
              <div className="flex w-full justify-between sm:flex-col sm:items-center items-end mb-12 sm:font-GmarketSans">
                <div className="text-[40px] font-bold sm:pb-5">
                  {categorys[index].title}
                </div>
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
      </section>
    </main>
  );
}
