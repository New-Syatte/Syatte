import ProductCards from "./ProductCards";
import { ProductForList } from "@/type/products";
interface DetailCategoryProps {
  products: ProductForList[];
  category: string;
}

const ProductsByCategory = ({ products, category }: DetailCategoryProps) => {
  const filteredProducts = products
    .filter((product: any) => {
      if (category === "all") return true;
      return product.category === category;
    })
    .slice(0, 7);
  return (
    <>
      <ProductCards products={filteredProducts} />
    </>
  );
};

export default ProductsByCategory;
