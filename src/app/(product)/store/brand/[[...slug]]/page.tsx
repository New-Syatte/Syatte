import { getProducts } from "@/services/sanity/products";
import { Product } from "@/type/products";
import ProductCards from "../../ProductCards";
import { categorys, subCategorys } from "@/constants/categorys";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function BrandPage({ params }: PageProps) {
  const [products, resolvedParams] = await Promise.all([getProducts(), params]);
  const depth = resolvedParams.slug ? resolvedParams.slug.length : 0;
  if (!products) {
    return <div>제품이 없습니다.</div>;
  }
  const getFilteredProducts = () => {
    const groupBy = <T, K extends keyof any>(arr: T[], key: (item: T) => K) =>
      arr.reduce((groups, item) => {
        const k = key(item);
        (groups[k] = groups[k] || []).push(item);
        return groups;
      }, {} as Record<K, T[]>);

    switch (depth) {
      case 0:
        // 모든 제품을 mainCategory별로 그룹화
        return groupBy(products, (product: Product) => product.mainCategory);
      case 1:
        // mainCategory에 해당하는 제품을 subCategory별로 그룹화
        const mainCategoryProducts = products.filter(
          product => product.mainCategory === resolvedParams.slug![0],
        );
        return groupBy(
          mainCategoryProducts,
          (product: Product) => product.subCategory,
        );
      case 2:
        // subCategory에 해당하는 제품만 필터링
        return products.filter(
          product =>
            product.mainCategory === resolvedParams.slug![0] &&
            product.subCategory === resolvedParams.slug![1],
        );
      default:
        return [];
    }
  };

  const filteredProducts = getFilteredProducts();

  const getTitle = () => {
    switch (depth) {
      case 0:
        return "브랜드별 제품";
      case 1: {
        const category = categorys.find(
          cat => cat.value === resolvedParams.slug![0],
        );
        return category ? `${category.title}` : "";
      }
      case 2: {
        const mainCategory = categorys.find(
          cat => cat.value === resolvedParams.slug![0],
        );
        const subCategory = subCategorys
          .find(cat => cat.mainCategory.value === mainCategory?.value)
          ?.subCategory.find(sub => sub.value === resolvedParams.slug![1]);
        return subCategory ? `${subCategory.title}` : "";
      }
      default:
        return "";
    }
  };

  const getSecondCategory = (category: string) => {
    switch (depth) {
      case 0: {
        const find = categorys.find(cat => cat.value === category);
        return find ? find.title : category;
      }
      case 1: {
        const mainCategory = categorys.find(
          cat => cat.value === resolvedParams.slug![0],
        );
        const subCategoryGroup = subCategorys.find(
          cat => cat.mainCategory.value === mainCategory?.value,
        );
        const find = subCategoryGroup?.subCategory.find(
          sub => sub.value === category,
        );
        return find ? find.title : category;
      }
      default:
        return category;
    }
  };

  return (
    <main className="w-full mt-8 sm:mt-0 mx-auto mb-[200px] flex flex-col justify-around items-center overflow-x-hidden">
      <h1 className="text-3xl font-bold text-center my-10">{getTitle()}</h1>
      {depth < 2 ? (
        Object.entries(filteredProducts).map(([category, products]) => (
          <section key={category} className="mb-20">
            <h2 className="text-2xl font-bold mb-8">
              {getSecondCategory(category)}
            </h2>
            <ProductCards products={products as Product[]} />
          </section>
        ))
      ) : (
        <ProductCards products={filteredProducts as Product[]} />
      )}
    </main>
  );
}
