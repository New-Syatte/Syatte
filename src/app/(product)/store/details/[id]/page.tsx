import ProductSummary from "./ProductSummary";
import { ProductForDetail } from "@/type/products";
import { getDetailProduct } from "@/services/sanity/products";
import ProductInfoNav from "./ProductInfoNav";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product: ProductForDetail = await getDetailProduct(id);
  const { productName, price, description, images, discount, detailImage } =
    product;
  return (
    <section className="w-full mx-auto mb-[200px] flex sm:flex-col justify-center sm:items-center items-start sm:px-0 px-60 py-20 gap-28 overflow-x-hidden">
      <ProductSummary
        _id={id}
        productName={productName}
        price={price}
        description={description}
        images={images}
        discount={discount}
      />
      <section className="w-full">
        <ProductInfoNav detailImage={detailImage} />
      </section>
    </section>
  );
}
