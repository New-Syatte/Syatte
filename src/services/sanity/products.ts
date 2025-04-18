import { client, urlForDetailImage } from "@/services/sanity";
import { Product } from "@/type/products";

export async function getProducts(): Promise<Product[] | undefined> {
  try {
    const products = await client.fetch(
      '*[_type == "product"] {..., mainImage {"imageUrl": asset->url}}',
      {},
      {
        cache: "force-cache",
        next: {
          revalidate: 3600,
        },
      },
    );
    return products as unknown as Product[];
  } catch (error: any) {
    console.error(`전체 제품 불러오기 실패: ${error.message}`);
    return undefined;
  }
}

export function getDetailProduct(id: string) {
  try {
    const product = client
      .fetch(
        `*[_type == "product" && _id == $id][0] {
        _id,
        productName,
        mainCategory,
        subCategory,
        "images": images[] { 
          "imageUrl": asset->url
        },
        "detailImage": detailImage.asset,
        description,
        options,
        tags,
        isNewProduct,
        isBestSeller,
      }`,
        { id },
        {
          cache: "force-cache",
          next: {
            revalidate: 3600,
          },
        },
      )
      .then(product => {
        return {
          ...product,
          detailImage: urlForDetailImage(product.detailImage),
        };
      });
    return product;
  } catch (error: any) {
    console.error(`상세 제품 불러오기 실패: ${error.message}`);
  }
}
