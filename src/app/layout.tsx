import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title:
    "Vyapaar Global — Agri-Commerce Reimagined | B2B Supply to UK Retailers",
  description:
    "Importing premium food products with B2B direct supply to UK retailers. Smart sourcing, smart logistics, smart living. From farm to home.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-surface-50 text-navy-dark">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
