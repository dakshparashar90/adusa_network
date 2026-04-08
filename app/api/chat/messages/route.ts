import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const proposalId = searchParams.get("proposalId");

  if (!proposalId) {
    return NextResponse.json([], { status: 400 });
  }

  const messages = await prisma.message.findMany({
    where: { proposalId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}