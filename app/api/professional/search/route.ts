import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(req:Request){
    const {searchParams}=new URL(req.url);
    const domain=searchParams.get("domain");

    const professional=await prisma.professional.findMany({
        // where:{
        //     domain:{
        //         contains:domain||"",
        //         mode:"insensitive"
        //     }
        // }
        where: domain
            ? {
                domain: {
                    contains: domain,
                    mode: "insensitive",
                },
                
                }
            : {},
              include:{
                user:{
                    select:{
                        name:true,
                    }
                },
            }
           
    })

   return NextResponse.json(professional);  
}