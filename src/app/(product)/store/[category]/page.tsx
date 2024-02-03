import ProductCards from "./ProductCards";
import { categorys, detailCategorys } from "@/constants/categorys";
import DetailCategory from "./DetailCategory";
import BreadCrumbs from "@/components/breadCrumbs/BreadCrumbs";
import { getProducts, getProductsByCategory } from "@/services/sanity/products";

export default async function Products({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  console.log(category);
  const products =
    category === "all"
      ? await getProducts()
      : await getProductsByCategory(category);

  if (!products) return <div>loading...</div>;
  if (products.length === 0)
    return (
      <div className="flex justify-center items-center text-lg w-[300px] bg-bgGray">
        제품이 없습니다!
      </div>
    );
  if (category === "all") {
    return (
      <>
        <BreadCrumbs root="MENU" category={category.toUpperCase()} />
        <DetailCategory
          products={products}
          detailCategory={categorys}
          isAll={true}
        />
      </>
    );
  }
  if (category === "modernMasters") {
    return (
      <>
        <BreadCrumbs root="MENU" category={category.toUpperCase()} />
        <DetailCategory products={products} detailCategory={detailCategorys} />
      </>
    );
  }
  if (category === "midasMetal") {
    return (
      <>
        <BreadCrumbs root="MENU" category={category.toUpperCase()} />
        <DetailCategory products={products} detailCategory={detailCategorys} />
      </>
    );
  } else
    return (
      <>
        <BreadCrumbs root="MENU" category={category.toUpperCase()} />
        <ProductCards products={products} />
      </>
    );
}
