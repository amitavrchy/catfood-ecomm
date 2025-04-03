import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.username || !body.email || !body.password) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    const db = await connectMongoDB();
    const existingUser = await db.collection("users").findOne({ email: body.email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = {
      username: body.username,
      email: body.email,
      password: hashedPassword,
      userType: body.userType,
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(user);
    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong", error: error.message }), { status: 500 });
  }
}
