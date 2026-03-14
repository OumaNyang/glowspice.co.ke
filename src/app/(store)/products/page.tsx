import type { Metadata } from "next";
import { ProductsClient } from "./ProductsClient";

export const metadata: Metadata = {
  title: "All Products",
  description: "Shop our full range of premium spices, herbs, blends, and natural additives.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
