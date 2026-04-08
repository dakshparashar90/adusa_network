import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { skillId } = await req.json();

    const updated = await prisma.skill.update({
      where: { id: skillId },
      data: {
        endorsements: { increment: 1 } // Automatic +1 in DB
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to endorse" }, { status: 500 });
  }
}