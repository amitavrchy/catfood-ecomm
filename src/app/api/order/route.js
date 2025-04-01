import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req) {
    try {
        const body = await req.json();
        const db = await connectMongoDB();
        const ordersCollection = db.collection("orders");
        
        const result = await ordersCollection.insertOne(body);
        return NextResponse.json({ message: "Order placed successfully", orderId: result.insertedId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const db = await connectMongoDB();
        const ordersCollection = db.collection("orders");
        
        const orders = await ordersCollection.find().toArray();
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
