import {prisma} from "@/lib/prisma";
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs";

export  async function POST(req:Request){
    const body=await req.json();
    const{name, email, password,role}=body;

    const existingUser=await prisma.user.findUnique({
        where:{email},
    });

    if(existingUser){
        return NextResponse.json({error:"User Already exitis"},{status:400})
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
            role,

        }
    })

    return NextResponse.json(user);

}