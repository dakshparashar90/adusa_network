import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pusher } from "@/lib/pusher";

export async function POST(req:Request){
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {proposalId,content,type} = await req.json();

    const proposal= await prisma.proposal.findUnique({
        where:{id:proposalId},
        include:{
            professional:true,
        }
    })

    if(!proposal || proposal.status!=="accepted"){
        return NextResponse.json({ error: "Chat not allowed" }, { status: 403 });
    }

    let receiverId;

    if(session.user.id === proposal.senderId){
        receiverId=proposal.professional.userId;
    }else{
        receiverId=proposal.senderId;
    }

    const mess=await prisma.message.create({

        data:{
            senderId:session.user.id,
              proposalId,
              content,
              type,
              receiverId,
        }
    });

    await pusher.trigger(`chat-${proposalId}`, "new-message", mess);
    return NextResponse.json(mess);
}