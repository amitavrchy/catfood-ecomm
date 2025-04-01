import { connectMongoDB } from "@/lib/mongodb";
import { Readable } from "stream";
import { GridFSBucket, ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const db = await connectMongoDB();
    const productsCollection = db.collection("products");
    const bucket = new GridFSBucket(db, { bucketName: "productImages" });

    const formData = await req.formData();

    const name = formData.get("name");
    const regularPrice = formData.get("regularPrice");
    const salePrice = formData.get("salePrice");
    const category = formData.get("category");
    const tags = formData.get("tags");
    const description = formData.get("description");
    const image = formData.get("image"); // File object
    const variations = formData.get("variations");

    if (!name || !regularPrice || !category || !description) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    let imageId = null;

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      const uploadStream = bucket.openUploadStream(image.name, {
        contentType: image.type,
      });

      stream.pipe(uploadStream);

      await new Promise((resolve, reject) => {
        uploadStream.on("finish", () => {
          imageId = uploadStream.id;
          resolve();
        });
        uploadStream.on("error", reject);
      });
    }

    // Save product with image reference
    const productData = {
      name,
      regularPrice,
      salePrice,
      category,
      description,
      tags,
      variations,
      imageId,
    };

    const result = await productsCollection.insertOne(productData);

    return Response.json(
      { message: "Product added successfully!", productId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving product:", error);
    return Response.json({ error: "Failed to save product" }, { status: 500 });
  }
}

// Get product image by ID
export async function GET(req) {
  try {
    const db = await connectMongoDB();
    const bucket = new GridFSBucket(db, { bucketName: "productImages" });

    const url = new URL(req.url);
    const imageId = url.searchParams.get("imageId");

    // If imageId is provided, return the image
    if (imageId) {
      const stream = bucket.openDownloadStream(new ObjectId(imageId));
      return new Response(stream, { status: 200, headers: { "Content-Type": "image/png" } });
    }

    // Otherwise, return all products with individual image URLs
    const productsCollection = db.collection("products");
    const products = await productsCollection.find().toArray();

    const productsWithImages = products.map((product) => ({
      ...product,
      imageUrl: product.imageId ? `/api/products?imageId=${product.imageId}` : null,
    }));

    return Response.json({ products: productsWithImages }, { status: 200 });
  } catch (error) {
    console.error("❌ Error in GET:", error);
    return Response.json({ error: "Failed to process request" }, { status: 500 });
  }
}
