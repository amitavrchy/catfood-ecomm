import Link from "next/link";

export default async function ProductsPage() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/dashboard/products/new" className="px-4 py-2 bg-blue-600 text-white rounded">Add Product</Link>
      </div>
    </div>
  );
}
