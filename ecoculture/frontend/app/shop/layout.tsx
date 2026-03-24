import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artisan Eco Shop — EcoCulture",
  description: "Shop sustainable, handcrafted products directly from Indian artisans. Every purchase supports fair trade, regenerative agriculture, and indigenous crafting techniques.",
  openGraph: {
    title: "Artisan Eco Shop — EcoCulture",
    description: "Handcrafted, fair-trade, sustainable goods from India's finest artisans.",
    type: "website",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
