import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 1. URL se search parameters nikaalo (e.g. ?id=clv123...)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // 2. Validation: Agar ID nahi mili toh error bhej do
    if (!id) {
      return NextResponse.json(
        { error: "Professional ID is required" }, 
        { status: 400 }
      );
    }

    // 3. Database Query: Professional table mein ID dhundo
    // Saath mein 'user' table ko bhi join karo taaki Name aur Email mil sake
   const professionalProfile = await prisma.professional.findFirst({
      where: {
        OR: [
          { id: id },       // Agar ye Professional ID hai (Search page se aayi)
          { userId: id }    // Agar ye User ID hai (Navbar se aayi)
        ]
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            createdAt: true
          }
        },
        skills: {
          orderBy: { endorsements: 'desc' }, // Top skills pehle
          take: 6 // Max 6 skills dikhayenge
        }
      }
    });

    // 4. Agar expert nahi mila
    if (!professionalProfile) {
      return NextResponse.json(
        { error: "Expert not found" }, 
        { status: 404 }
      );
    }

    // 5. Data Success!
    return NextResponse.json(professionalProfile);

  } catch (error) {
    console.error("PROFILE_DASH_ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}


// import {prisma} from "@/lib/prisma";
// import {getServerSession} from "next-auth/next";
// import { authOptions } from "../../auth/[...nextauth]/route";
// import { NextResponse } from "next/server";


// export async function POST(req:Request){
//     const session=await getServerSession(authOptions);
//     const {searchParams}=new URL(req.url);
//     const id=searchParams.get("id");
//     if(!session){
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     if(!id){
//          return NextResponse.json({ error: "Professional Id is required" }, { status: 400 });
//     }

//     const professionalProfile=await prisma.professional.findUnique({
//         where:{
//             id:id,
//         },
//         include:{
//             user:{
//                 select: {
//                     name: true,
//                     email: true,
//                     role: true,
//                     createdAt: true,
//                 }
//             },
//             proposals: {
//                 where: { status: "accepted" },
//                 take: 5,
//             }
//         },
//     })

//     if(!professionalProfile){
//         return NextResponse.json({error:"expert not found"} ,{status:404});
//     }

//     return NextResponse.json(professionalProfile);
   
    
// }