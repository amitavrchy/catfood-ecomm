import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <Head>
        <title>Privacy Policy | Lixci</title>
        <meta
          name="description"
          content="Read Lixci's privacy policy to understand what data we collect and how we use it."
        />
      </Head>

      <div className="mx-4 md:mx-20 py-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
            🔒 প্রাইভেসি নীতিমালা
          </h1>

          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">তথ্য সংগ্রহ</h2>
            <p className="mb-4">
              Lixci-তে আমরা আপনার গোপনীয়তাকে সম্মান করি। অর্ডার সম্পূর্ণ করতে আমরা শুধুমাত্র প্রয়োজনীয় কিছু তথ্য সংগ্রহ করি, যেমন:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>নাম</li>
              <li>ফোন নম্বর</li>
              <li>শিপিং ঠিকানা</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">তথ্য ব্যবহারের উদ্দেশ্য</h2>
            <p className="text-gray-700">
              বর্তমানে আমরা ইমেইল বা পেমেন্ট সম্পর্কিত কোনো তথ্য সংগ্রহ করি না। আপনার তথ্য কেবল ডেলিভারির উদ্দেশ্যে আমাদের কুরিয়ার পার্টনারদের সঙ্গে শেয়ার করা হয়।
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">কুকি ও ট্র্যাকিং</h2>
            <p className="text-gray-700">
              আমরা কোনো কুকি বা ট্র্যাকিং টুল ব্যবহার করি না।
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">তথ্য মুছে ফেলার অনুরোধ</h2>
            <p className="text-gray-700">
              গ্রাহকরা চাইলে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করে তাঁদের তথ্য মুছে ফেলার অনুরোধ করতে পারেন।
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
