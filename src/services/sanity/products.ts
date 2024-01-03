import { client } from "@/services/sanity/sanity";

export function getProducts() {
  try {
    const products = client.fetch(
      '*[_type == "product"] {_id, productName, category, price, mainImage {"imageUrl": asset->url}}',
    );
    return products;
  } catch (error: any) {
    console.error(`전체 제품 불러오기 실패: ${error.message}`);
  }
}

export function getDetailProduct(id: string) {
  try {
    const product = client.fetch(
      `*[_type == "product" && _id == $id][0] {
        _id,
        productName,
        category,
        price,
        detailCategory,
        "images": images[] { 
          "imageUrl": asset->url
        },
        description,
        feature,
        youtubeUrls,
        recommends[]->{productName, "mainImage": mainImage {"imageUrl": asset->url}, _id}
      }`,
      { id },
    );
    return product;
  } catch (error: any) {
    console.error(`상세 제품 불러오기 실패: ${error.message}`);
  }
}

export function getProductsByCategory(
  category: string,
  isDetail: boolean = false,
) {
  try {
    let param = isDetail ? "detailCategory" : "category";
    const query = `*[_type == "product" && ${param} == $category] {_id, productName, category, price, mainImage {"imageUrl": asset->url}, detailCategory}`;
    const products = client.fetch(query, { category });
    return products;
  } catch (error: any) {
    console.error(`카테고리별 제품 불러오기 실패: ${error.message}`);
  }
}
