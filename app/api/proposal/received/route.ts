import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const proposals = await prisma.proposal.findMany({
    where: {
      professional: {
        userId: session.user.id,
      },
    },
  });

  return NextResponse.json(proposals);
}