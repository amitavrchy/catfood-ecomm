import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
    try {
        const db = await connectMongoDB();
        const categoryCollection = db.collection("category");

        const { name } = await req.json(); // <-- Ensure JSON parsing

        if (!name) {
            return new Response(JSON.stringify({ error: "Category name is required" }), { status: 400 });
        }

        const categoryData = { name };
        const result = await categoryCollection.insertOne(categoryData);

        return new Response(JSON.stringify({ message: "Category added successfully!", categoryId: result.insertedId }), { status: 201 });
    } catch (error) {
        console.error("Error saving category:", error);
        return new Response(JSON.stringify({ error: "Failed to save category" }), { status: 500 });
    }
}

export async function GET(req) {
    try {
        const db = await connectMongoDB();
        const categoryCollection = db.collection("category");

        // Retrieve all categories
        const categories = await categoryCollection.find().toArray();

        return new Response(JSON.stringify({ categories }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch categories" }), { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const db = await connectMongoDB();
        const categoryCollection = db.collection("category");

        const { id, name } = await req.json();

        if (!id || !name) {
            return new Response(JSON.stringify({ error: "Category ID and name are required" }), { status: 400 });
        }

        await categoryCollection.updateOne({ _id: new ObjectId(id) }, { $set: { name } });

        return new Response(JSON.stringify({ message: "Category updated successfully!" }), { status: 200 });
    } catch (error) {
        console.error("Error updating category:", error);
        return new Response(JSON.stringify({ error: "Failed to update category" }), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const db = await connectMongoDB();
        const categoryCollection = db.collection("category");

        const { id } = await req.json();

        if (!id) {
            return new Response(JSON.stringify({ error: "Category ID is required" }), { status: 400 });
        }

        await categoryCollection.deleteOne({ _id: new ObjectId(id) });

        return new Response(JSON.stringify({ message: "Category deleted successfully!" }), { status: 200 });
    } catch (error) {
        console.error("Error deleting category:", error);
        return new Response(JSON.stringify({ error: "Failed to delete category" }), { status: 500 });
    }
}
