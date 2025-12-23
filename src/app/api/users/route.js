import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("care-xyz-db");
    const existingUser = await db.collection("users").findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists in DB" }, { status: 200 });
    }
    const newUser = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      nid: body.nid,
      role: "user",
      createdAt: new Date(),
    };
    const result = await db.collection("users").insertOne(newUser);
    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}