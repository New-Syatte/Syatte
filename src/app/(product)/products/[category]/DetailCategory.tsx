import Heading from "@/components/heading/Heading";
import ProductCards from "./ProductCards";
import { ProductForList, CategoryForConstant } from "@/model/products";
interface DetailCategoryProps {
  products: ProductForList[];
  detailCategory: CategoryForConstant[];
  bigCategory: "all" | "maintenanceKits";
}

const DetailCategory = ({
  products,
  detailCategory,
  bigCategory,
}: DetailCategoryProps) => {
  const categoryValues = detailCategory.map(
    (category: CategoryForConstant) => category.value,
  );
  return (
    <>
      {categoryValues.map((category: string, index: number) => {
        return (
          <div key={category}>
            <Heading title={detailCategory[index].title} fontSize="lg" />
            <ProductCards
              products={products.filter((product: any) =>
                bigCategory === "all"
                  ? product.category === category
                  : product.detailCategory === category,
              )}
            />
          </div>
        );
      })}
    </>
  );
};

export default DetailCategory;
