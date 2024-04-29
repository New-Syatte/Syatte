import Card from "@/components/card/Card";
import URLS from "@/constants/urls";
import { ProductForList } from "@/type/products";

interface Props {
  products: ProductForList[];
}

const ProductCards = ({ products }: Props) => {
  console.log(products);
  return (
    <div className="grid grid-cols-4 gap-x-6 gap-y-24 px-4 w-full">
      {products.map((product: any) => (
        <Card
          key={product._id}
          title={product.productName}
          src={product.mainImage.imageUrl}
          linkTo={`${URLS.PRODUCT_DETAILS}/${product._id}`}
          width={312}
          height={312}
          product={product}
          bgColor={product.category === "midasMetal" ? "[#f4f4f4]" : "white"}
        />
      ))}
    </div>
  );
};

export default ProductCards;
