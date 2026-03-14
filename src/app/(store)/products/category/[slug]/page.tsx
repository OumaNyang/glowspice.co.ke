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
    title: category.name,
    description: `Browse our premium selection of ${category.name.toLowerCase()}. Hand-sourced, authentic flavours delivered in Kenya.`,
    openGraph: {
      title: `${category.name} | GlowSpice Kenya`,
      description: `Explore the finest ${category.name.toLowerCase()} at GlowSpice.`,
      url: `https://glowspice.co.ke/products/category/${slug}`,
      images: [
        {
          url: category.image,
          width: 800,
          height: 600,
          alt: category.name,
        },
      ],
    },
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
