import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eco Destinations — EcoCulture",
  description: "Discover the world's finest eco-sanctuaries and sustainable travel destinations across India and beyond. Filter by difficulty, category, and eco score.",
  openGraph: {
    title: "Eco Destinations — EcoCulture",
    description: "Curated collection of eco-sanctuaries and sustainable travel destinations.",
    type: "website",
  },
};

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
