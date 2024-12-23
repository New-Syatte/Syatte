import ProductSummary from "./ProductSummary";
import { getDetailProduct } from "@/services/sanity/products";
import ProductInfoNav from "./ProductInfoNav";
import { notFound } from "next/navigation";
import { Product } from "@/type/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) {
    notFound();
  }

  const product: Product = await getDetailProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <section className="w-full mx-auto mb-[200px] flex sm:flex-col justify-center sm:items-center items-start sm:px-0 px-60 py-20 gap-28 overflow-x-hidden">
      <ProductSummary product={product} />
      <article className="w-full">
        <ProductInfoNav detailImage={product.detailImage} />
      </article>
    </section>
  );
}
