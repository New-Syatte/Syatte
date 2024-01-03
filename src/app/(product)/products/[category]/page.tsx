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
          bigCategory="all"
        />
      </>
    );
  }
  if (category === "maintenanceKits") {
    return (
      <>
        <BreadCrumbs root="MENU" category={category.toUpperCase()} />
        <DetailCategory
          products={products}
          detailCategory={detailCategorys}
          bigCategory="maintenanceKits"
        />
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
