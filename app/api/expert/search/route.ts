import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server"
export async function GET(req:Request){
    try{

        const {searchParams}=new URL(req.url);
        const domain =searchParams.get("q");
        
        if(!domain)return NextResponse.json([]);
        
        const info = await prisma.professional.findMany({
            where:{
                OR:[
                    {domain:{   contains:domain,mode:"insensitive"}},
                    {user:{name:{contains:domain,mode:"insensitive"}}}  
                ]
            },
            include:{
                user:{
                    select:{name:true},
                }
            },
            take:8,
        })
        
        return NextResponse.json(info);
    }catch(err){
        return NextResponse.json({error:err,status:500});
    }



}