import Card from "@/components/card/Card";
import URLS from "@/constants/urls";
import { ProductForList } from "@/type/products";

interface Props {
  products: ProductForList[];
}

const ProductCards = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-7 gap-x-6 gap-y-24 sm:px-0 px-4 sm:w-full sm:max-w-[400px] items-center justify-center">
      {products.map((product: any) => (
        <Card
          key={product._id}
          title={product.productName}
          src={product.mainImage.imageUrl}
          linkTo={`${URLS.PRODUCT_DETAILS}/${product._id}`}
          product={product}
          bgColor={product.category === "midasMetal" ? "[#f4f4f4]" : "white"}
        />
      ))}
    </div>
  );
};

export default ProductCards;
