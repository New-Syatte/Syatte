export type Product = {
  _id: string;
  productName: string;
  price: number;
  mainImage: ProductImages;
  description: string;
  feature: string[];
  images: ProductImages[];
  category: string;
  detailCategory: string;
  youtubeUrls: string[];
  recommends: Recommends[];
};

export type ProductForDetail = Omit<Product, "mainImage">;
export type ProductForList = Pick<
  Product,
  "_id" | "productName" | "price" | "mainImage"
>;

type ProductImages = {
  imageUrl: string;
};

type Recommends = {
  productName: string;
  mainImage: ProductImages;
  _id: string;
};

export type ProductForCategory = Pick<
  Product,
  "_id" | "productName" | "price" | "mainImage" | "detailCategory" | "category"
>;

// ----------------for Constants ----------------

export type CategoryForConstant = {
  title: string;
  value: string;
};

export type Categorys = CategoryForConstant[];
