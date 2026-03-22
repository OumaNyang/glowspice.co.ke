// ─── Product ────────────────────────────────────────────────────────────────

export interface ProductVariation {
  id: string;
  name: string; // e.g. "Size", "Color"
  value?: string; // e.g. "50g", "100g", "200g"
  price: number;
  stock: number;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category?: Category;
  categoryId?: string; // Legacy tie
  mainCategoryId?: string; // New 2-tier tracking
  subCategoryId?: string;  // New 2-tier tracking
  tags: string[];
  images: ProductImage[];
  stock: number;
  unit: string; // fallback if no variations (e.g. "100g", "250g", "1kg")
  sku?: string;
  barcode?: string;
  variations?: ProductVariation[];
  origin?: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isPublished?: boolean;
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
  parentId?: string | null;
  level?: "main" | "sub";
  tags?: string[];
  isPublished?: boolean;
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
  customer: CustomerUser;
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

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: string;
  phone?: string;
  avatar?: string;
  role: "customer";
  isBlocked: boolean;
  createdAt: string;
  orderCount?: number;
  totalSpent?: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: string;
  avatar?: string;
  role: "SUPER_ADMIN" | "ADMIN";
  isBlocked: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
}

export type AuthUser = CustomerUser | AdminUser;

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
  maxPrice: number;
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
