import ProductSummary from "./ProductSummary";
import { ProductForDetail } from "@/model/products";
import { getDetailProduct } from "@/services/sanity/products";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product: ProductForDetail = await getDetailProduct(id);
  const { productName, price, description, feature, images, discount } =
    product;

  console.log(product);
  return (
    <>
      <section className="w-full mx-auto mb-[200px] flex justify-center items-center px-60 py-20">
        <ProductSummary
          _id={id}
          productName={productName}
          price={price}
          description={description}
          feature={feature}
          images={images}
          discount={discount}
        />
        <section className="w-full"></section>
      </section>
    </>
  );
}
