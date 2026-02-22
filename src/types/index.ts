export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  categoryLabel: string;
  description: string;
  weight?: string;
  rating: number;
  reviews: number;
  vendor: string;
  badge?: "hot" | "new" | "sale" | "out";
  inStock: boolean;
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
  itemCount: number;
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
