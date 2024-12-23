// export type Product = {
//   _id: string;
//   productName: string;
//   price: number;
//   discount: number;
//   mainImage: ProductImage;
//   description: string;
//   images: ProductImage[];
//   category: string;
//   detailCategory: string;
//   detailImage: string;
// };

export interface Product {
  _id: string;
  productName: string;
  mainImage: ProductImage;
  images: ProductImage[];
  detailImage: string;
  description: string;
  mainCategory: "midasMetal" | "modernMasters";
  subCategory: string;
  options: ProductOption[];
  slug?: string;
  tags?: string[];
  isNewProduct?: boolean;
  isBestSeller?: boolean;
}
export type ProductForList = Pick<
  Product,
  "_id" | "productName" | "options" | "mainImage"
>;

type ProductImage = {
  imageUrl: string;
};

export type ProductOption = {
  color: {
    colorName: string;
    colorCode: string;
  };
  sizes: {
    size: string;
    price: number;
    discount: number;
    stock: number;
  }[];
};
