import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma"; 
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    // Aapke schema ke hisaab se: professional table ke through check karna hoga
    const acceptedProposals = await prisma.proposal.findMany({
      where: {
        status: "accepted",
        OR: [
          { senderId: userId },
          // Professional side check karne ke liye professional table ka userId match karna hoga
          { professional: { userId: userId } }, 
        ],
      },
      orderBy: {
        createdAt: "desc", // Kyunki aapke schema mein updatedAt nahi hai
      },
      include: {
        sender: { select: { name: true } },
        professional: { 
          include: { 
            user: { select: { name: true } } 
          } 
        },
      },
    });

    return NextResponse.json(acceptedProposals);
  } catch (error) {
    console.error("[ACCEPTED_PROPOSALS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}