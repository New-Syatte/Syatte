import Card from "@/components/card/Card";
import { ProductForList } from "@/model/products";

interface Props {
  products: ProductForList[];
}

const ProductCards = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-24 px-4">
      {products.map((product: any) => (
        <Card
          key={product._id}
          title={product.productName}
          src={product.mainImage.imageUrl}
          linkTo={`/product-details/${product._id}`}
          width={300}
          height={300}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductCards;
