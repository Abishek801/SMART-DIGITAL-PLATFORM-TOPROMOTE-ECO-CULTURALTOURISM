import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !(session as any).accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { search } = new URL(request.url);
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login-history${search}`, {
      headers: { Authorization: `Bearer ${(session as any).accessToken}` },
    });
    
    if (!res.ok) throw new Error(`Backend returned ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch login history" }, { status: 500 });
  }
}
