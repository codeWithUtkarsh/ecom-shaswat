export interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  discount?: number;
  image: string;
  category: string;
  category_label: string;
  description: string;
  weight?: string;
  rating: number;
  reviews: number;
  vendor: string;
  badge?: "hot" | "new" | "sale" | "out";
  in_stock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  icon: string;
  item_count: number;
  subcategories?: string[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
}

export interface PromoBanner {
  id: string;
  label: string;
  value: string;
  description: string;
  bgColor: string;
  textColor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
