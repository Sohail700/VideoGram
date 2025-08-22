import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectedToDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const {email, password} = await request.json();

    if(!email && !password){
      return NextResponse.json(
        {error: "Email and password are required"},
        {status: 400}
      )
    }
    await connectedToDatabase();

    const existingUser =  await User.findOne({email});
    if(existingUser){
      return NextResponse.json(
        {error: "User is already registered"},
        {status: 401}
      )
    }

    User.create({
      email,
      password
    })

    return NextResponse.json(
        {error: "User is registered successfully"},
        {status: 200}
    );
  } catch (error) {
    console.error("Registration error",error);
    return NextResponse.json(
        {error: "User is not registered successfully"},
        {status: 400}
    );
  }
}