import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { professionalId, message } = body;

    const professional = await prisma.professional.findUnique({
        where: { id: professionalId }
        });

            if (!professional) {
            return NextResponse.json({ error: "Professional not found" }, { status: 404 });
            }

    const proposal = await prisma.proposal.create({
      data: {
        senderId: session.user.id as string,
        professionalId,
        message: message,
      },
    });

    return NextResponse.json(proposal);

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}