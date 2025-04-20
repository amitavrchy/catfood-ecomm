// pages/return-refund.js
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function ReturnRefundPolicy() {
  return (
    <>
      <Navbar />
      <Head>
        <title>Return & Refund Policy | Lixci</title>
        <meta
          name="description"
          content="Read Lixci's return and refund policy. Learn about eligibility, refund process, and how to initiate a return."
        />
      </Head>

      <div className="mx-4 md:mx-20 py-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
            🔁 রিটার্ন ও রিফান্ড নীতিমালা
          </h1>

          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">রিটার্ন গ্রহণের শর্তাবলি</h2>
            <p className="text-gray-700">
              আমরা ডেলিভারির ৭ দিনের মধ্যে রিটার্ন গ্রহণ করি, যদি পণ্যটি অব্যবহৃত থাকে এবং মূল প্যাকেজিংয়ে থাকে।
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">রিটার্ন ও রিফান্ড সম্পর্কিত নীতিমালা</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>রিফান্ড মূল পেমেন্ট মাধ্যমেই প্রদান করা হবে।</li>
              <li>যোগ্য পণ্যের ক্ষেত্রে এক্সচেঞ্জ (বদল) এর সুযোগ রয়েছে।</li>
              <li>বর্তমানে আমরা কোনো ধরনের স্টোর ক্রেডিট অফার করি না।</li>
              <li>রিটার্ন শিপিং খরচ ক্রেতাকেই বহন করতে হবে।</li>
              <li>ডিজিটাল পণ্যসমূহ ফেরতযোগ্য নয়।</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">রিটার্ন করার প্রক্রিয়া</h2>
            <p className="text-gray-700">
              রিটার্ন করতে চাইলে, অনুগ্রহ করে আপনার অর্ডার বিবরণসহ আমাদের সাপোর্ট টিমের সঙ্গে যোগাযোগ করুন।
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
