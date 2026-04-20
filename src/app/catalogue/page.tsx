import type { Metadata } from "next";
import CatalogueClient from "./CatalogueClient";

export const metadata: Metadata = {
  title: "Catalogue — Vyapaar Global",
  description:
    "Browse our complete B2B range of premium Indian staples, spices, and ready mixes. Export-grade, direct-sourced, shipped in pallet configurations built for UK retailers.",
  keywords: [
    "Indian food wholesale UK",
    "bulk spices UK",
    "wholesale lentils",
    "MTR UK distributor",
    "Tata Sampann wholesale",
    "UK retail agri-commerce",
    "B2B food supply",
  ],
  openGraph: {
    title: "Catalogue — Vyapaar Global",
    description:
      "The complete B2B range of premium Indian staples, spices, and ready mixes for UK retailers.",
    type: "website",
    siteName: "Vyapaar Global",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Vyapaar Global — Agri-Commerce Catalogue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalogue — Vyapaar Global",
    description:
      "The complete B2B range of premium Indian staples, spices, and ready mixes for UK retailers.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "/catalogue",
  },
};

export default function CataloguePage() {
  return <CatalogueClient />;
}
