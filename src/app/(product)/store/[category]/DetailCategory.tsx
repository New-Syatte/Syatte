import Heading from "@/components/heading/Heading";
import ProductCards from "./ProductCards";
import { ProductForList, CategoryForConstant } from "@/model/products";
interface DetailCategoryProps {
  products: ProductForList[];
  detailCategory: CategoryForConstant[];
  isAll?: boolean;
}

const DetailCategory = ({
  products,
  detailCategory,
  isAll = false,
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
                isAll
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
