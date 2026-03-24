import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Eco Travel Planner — EcoCulture",
  description: "Chat with our AI Eco-Concierge to generate a personalized, carbon-neutral itinerary for your next sustainable journey.",
  openGraph: {
    title: "AI Eco Travel Planner — EcoCulture",
    description: "Generate your perfect carbon-neutral travel itinerary with AI.",
    type: "website",
  },
};

export default function PlannerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
