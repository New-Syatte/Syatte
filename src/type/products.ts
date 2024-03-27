export type Product = {
  _id: string;
  productName: string;
  price: number;
  discount: number;
  mainImage: ProductImages;
  description: string;
  images: ProductImages[];
  category: string;
  detailCategory: string;
  detailImage: string;
};

export type ProductForDetail = Omit<Product, "mainImage">;
export type ProductForList = Pick<
  Product,
  "_id" | "productName" | "price" | "mainImage"
>;

type ProductImages = {
  imageUrl: string;
};
