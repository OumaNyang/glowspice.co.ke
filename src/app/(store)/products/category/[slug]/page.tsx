import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/lib/data";
import { ProductsClient } from "@/app/(store)/products/ProductsClient";

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} | GlowSpice`,
    description: `Shop our premium selection of ${category.name.toLowerCase()}.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  return <ProductsClient initialCategorySlug={slug} />;
}
