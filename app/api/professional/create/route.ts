import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function POST(req:Request){
 const session = await getServerSession(authOptions);

   if (!session) {
   
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
    const body=await req.json();
    const userId=session.user.id; 
    
    const {domain,experience,bio,location}=body;

    const existing = await prisma.professional.findUnique({
        where: { userId }
      });

      if (existing) {
        return NextResponse.json({ error: "Profile already exists" }, { status: 400 });
      }
        try {
        const profile = await prisma.professional.create({
            data: { userId, domain, experience, bio, location }
        });

        return NextResponse.json({ msg: "success", profile });

        } catch (error) {
             console.log(error);
        return NextResponse.json({ msg: "error" }, { status: 500 });
        }
}