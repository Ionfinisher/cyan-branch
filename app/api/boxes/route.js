import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { getBoxes } from "@/prisma/queries";

// GET /api/v1/boxes - Get all boxes for the authenticated user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const boxes = await getBoxes(session.user.id);
    return NextResponse.json(boxes);
  }
  catch (error) {
    console.error("Error fetching boxes:", error);
    return NextResponse.json({ error: "Failed to fetch boxes" }, { status: 500 });
  }
}
