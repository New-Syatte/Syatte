import Card from "@/components/card/Card";
import { ProductForList } from "@/model/products";

interface Props {
  products: ProductForList[];
}

const ProductCards = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-x-6 gap-y-24 px-4 w-full">
      {products.map((product: any) => (
        <Card
          key={product._id}
          title={product.productName}
          src={product.mainImage.imageUrl}
          linkTo={`/product-details/${product._id}`}
          width={312}
          height={312}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductCards;
