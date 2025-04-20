import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function ShippingPolicy() {
  return (
    <>
      <Navbar />
      <Head>
        <title>🚚 শিপিং নীতিমালা</title>
        <meta
          name="description"
          content="Learn about our shipping process, delivery times, fees, and pre-order options at Lixci."
        />
      </Head>

      <div className="mx-4 md:mx-20 py-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
            🚚 শিপিং নীতিমালা
          </h1>

          {/* Card 1: Shipping Partners */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">আমাদের কুরিয়ার পার্টনার</h2>
            <p className="text-gray-700">
              আমরা বাংলাদেশের সর্বত্র পণ্য পাঠাই বিশ্বস্ত কুরিয়ার পার্টনার যেমন SteadFast, RedEx, Pathao এবং অন্যান্যদের মাধ্যমে।
            </p>
          </div>

          {/* Card 2: Shipping Details */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">শিপিং বিবরণ</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>ডেলিভারির সময়:</strong> ২-৩ কর্মদিবস
              </li>
              <li>
                <strong>শিপিং চার্জ:</strong> চেকআউটের সময় প্রযোজ্য (বর্তমানে কোনো ফ্রি শিপিং নেই, তবে বিশেষ প্রমোশনের সময় ব্যতিক্রম হতে পারে)
              </li>
              <li>
                <strong>ট্র্যাকিং:</strong> সব অর্ডারের জন্য ট্র্যাকিং সুবিধা রয়েছে
              </li>
              <li>
                <strong>প্রি-অর্ডার:</strong> স্টকে না থাকা পণ্যের জন্য প্রি-অর্ডার গ্রহণযোগ্য
              </li>
            </ul>
          </div>

          {/* Card 3: Our Commitment */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">আমাদের প্রতিশ্রুতি</h2>
            <p className="text-gray-700">
              আমরা আপনার কেনাকাটা সঠিক সময়ে ও নিরাপদে পৌঁছাতে সর্বোচ্চ চেষ্টা করি।
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
