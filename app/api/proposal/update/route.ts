
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function POST(req:Request){
    const session=await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({error:"Unauthorized"},{status:401});
    }

    const body =await req.json();
    const{proposalId,status}=body;

    const proposal=await prisma.proposal.findUnique({
        where:{id:proposalId},
        include:{professional: true},
    });

    if(proposal?.professional.userId!== session.user.id){
        return NextResponse.json({error:"Not allowed"},{status:403});
    }

   const updated = await prisma.proposal.update({
    where: { id: proposalId },
    data: { status }, // accepted / rejected
  });

  return NextResponse.json(updated);
}