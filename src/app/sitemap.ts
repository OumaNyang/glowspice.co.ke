import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://glowspice.shop";

  // Static core routes
  const staticRoutes = [
    "",
    "/products",
    "/products/featured",
    "/about",
    "/recipes",
    "/learn/guide",
    "/learn/sourcing",
    "/learn/health",
    "/contact",
    "/terms",
    "/privacy",
    "/refund",
    "/shipping"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic Category routes
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/products/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic Product routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.createdAt || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
