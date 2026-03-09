import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    try {
      const prisma = (await import("../../../../lib/db")).default;
      const itineraries = await prisma.itinerary.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      const purchases = await prisma.purchase.findMany({
        where: { userId },
        include: { product: true },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ itineraries, purchases });
    } catch (dbErr) {
      console.warn(
        "DB not available for dashboard, returning empty data:",
        dbErr.message,
      );
      return NextResponse.json({ itineraries: [], purchases: [] });
    }
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ itineraries: [], purchases: [] });
  }
}
