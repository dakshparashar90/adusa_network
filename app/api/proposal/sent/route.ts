import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){
        const session= await getServerSession(authOptions);

        if(!session){
            return NextResponse.json({error:"Unauthorized"},{status:401});

        }

        const proposals=await prisma.proposal.findMany({
            where:{
                senderId:session.user.id,
            },
            include:{
                professional:true,
            }
        })
         return NextResponse.json(proposals);
}