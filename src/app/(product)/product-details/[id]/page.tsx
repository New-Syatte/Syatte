import ProductContent from "./ProductContent";
import { ProductForDetail, ProductForCategory } from "@/model/products";
import Card from "@/components/card/Card";
import {
  getDetailProduct,
  getProductsByCategory,
} from "@/services/sanity/products";
import RouteComplete from "@/utils/RouteComplete";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product: ProductForDetail = await getDetailProduct(id);
  const {
    productName,
    price,
    description,
    feature,
    images,
    youtubeUrls,
    recommends,
    category,
    detailCategory,
  } = product;

  const categoryProducts: ProductForCategory[] = detailCategory
    ? await getProductsByCategory(detailCategory, true)
    : await getProductsByCategory(category);

  return (
    <RouteComplete>
      <section className="w-full mx-auto mb-[200px] flex flex-col justify-around items-center">
        <header className="w-full h-[218px] mb-20 flex flex-col justify-center items-center bg-bgGray">
          <div className="w-[1280px] flex justify-center items-center gap-[73px]">
            {categoryProducts &&
              categoryProducts.map(product => (
                <div key={product._id}>
                  <Card
                    title={product.productName}
                    width={120}
                    height={120}
                    src={product.mainImage.imageUrl}
                    linkTo={`/product-details/${product._id}`}
                    titleSize="sm"
                  />
                </div>
              ))}
          </div>
        </header>
        <div>
          <ProductContent
            _id={id}
            productName={productName}
            price={price}
            description={description}
            feature={feature}
            images={images}
            youtubeUrls={youtubeUrls}
          />
        </div>
        <footer>
          <div>
            {recommends && (
              <div className="w-[1280px]">
                <h2 className="text-[40px] text-black font-bold mb-5">
                  Recommend
                </h2>
                <div className="flex gap-5">
                  {recommends.map((recommend, index) => (
                    <Card
                      key={index}
                      title={recommend.productName}
                      width={260}
                      height={260}
                      src={recommend.mainImage.imageUrl}
                      linkTo={`/product-details/${recommend._id}`}
                      titleSize={"base"}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </footer>
      </section>
    </RouteComplete>
  );
}
