import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <Head>
        <title>📜 শর্তাবলি | Lixci</title>
        <meta
          name="description"
          content="Lixci.com ব্যবহারের শর্তাবলি পড়ুন। অর্ডার, পণ্যের ধরন এবং ব্যবহারকারীর দায়িত্ব সম্পর্কে জানুন।"
        />
      </Head>

      <div className="mx-4 md:mx-20 py-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
            📜 শর্তাবলি
          </h1>

          {/* Card 1: Agreement Notice */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">চুক্তির সম্মতি</h2>
            <p className="text-gray-700">
              <strong>Lixci.com</strong> ব্যবহার করে আপনি নিচের শর্তসমূহে সম্মতি প্রদান করছেন:
            </p>
          </div>

          {/* Card 2: Terms List */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">প্রধান শর্তাবলি</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>আমরা উভয় ধরনের পণ্য বিক্রয় করি – ফিজিক্যাল এবং ডিজিটাল।</li>
              <li>সকল অর্ডার ক্যাশ অন ডেলিভারি (COD) ভিত্তিতে প্রক্রিয়াকরণ করা হয়।</li>
              <li>যেসব পণ্য সাময়িকভাবে স্টকে নেই, সেগুলোর জন্য প্রি-অর্ডার নেওয়া হয়।</li>
              <li>ভুল বা বিভ্রান্তিকর তথ্য প্রদান করলে অর্ডার বাতিল বা অ্যাকাউন্টে সীমাবদ্ধতা আরোপ করা হতে পারে।</li>
            </ul>
          </div>

          {/* Card 3: Updates Clause */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">শর্তাবলি হালনাগাদ</h2>
            <p className="text-gray-700">
              আমরা সেবার মান উন্নয়নের জন্য এই শর্তাবলি যেকোনো সময় হালনাগাদ করার অধিকার রাখি। ওয়েবসাইট ব্যবহার অব্যাহত রাখার অর্থ হলো আপনি সংশোধিত শর্তাবলি মেনে নিয়েছেন।
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
