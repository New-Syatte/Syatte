import { client, urlForDetailImage } from "@/services/sanity/sanity";
import { Product } from "@/type/products";

export function getProducts() {
  try {
    const products: Promise<Product[]> = client.fetch(
      '*[_type == "product"] {..., mainImage {"imageUrl": asset->url}}',
    );
    return products;
  } catch (error: any) {
    console.error(`전체 제품 불러오기 실패: ${error.message}`);
  }
}

export async function getDetailProduct(id: string) {
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
