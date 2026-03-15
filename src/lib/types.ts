// ─── Product ────────────────────────────────────────────────────────────────

export interface ProductVariation {
  id: string;
  name: string; // e.g. "50g", "100g", "200g"
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: Category;
  categoryId: string;
  tags: string[];
  images: ProductImage[];
  stock: number;
  unit: string; // fallback if no variations (e.g. "100g", "250g", "1kg")
  variations?: ProductVariation[];
  origin?: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  createdAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

// ─── Category ───────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  color: string;
  productCount?: number;
}

// ─── Cart ───────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string; // A unique identifier, typically `${product.id}` or `${product.id}-${variation.id}`
  product: Product;
  variation?: ProductVariation;
  quantity: number;
}

// ─── Review ─────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  verified: boolean;
}

// ─── Order ──────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer: User;
  items: OrderItem[];
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── User ────────────────────────────────────────────────────────────────────

export type UserRole = "customer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  orderCount?: number;
  totalSpent?: number;
}

// ─── Admin Stats ─────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
  recentOrders: Order[];
}

// ─── Filters ─────────────────────────────────────────────────────────────────

export interface ProductFilters {
  search: string;
  categoryId: string;
  minPrice: number;
  inStock: boolean;
  sortBy: "newest" | "price_asc" | "price_desc" | "popular" | "rating";
}

// ─── Banner ──────────────────────────────────────────────────────────────────

export interface Banner {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  link?: string;
  isActive: boolean;
}
