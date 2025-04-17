"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const testimonials = [
    { user: "সজীব হাসান", quote: "এখানকার পণ্যগুলোর গুণগত মান অসাধারণ! বারবার কেনা যায়।" },
    { user: "রিনা আক্তার", quote: "দ্রুত ডেলিভারি এবং চমৎকার কাস্টমার সার্ভিস। খুব সন্তুষ্ট!" },
];

export default function AboutUsPage() {
    return (
        <>
            <Navbar />
            <div className="text-center py-16 bg-gradient-to-r from-gray-900 to-slate-600 text-white rounded-lg shadow-md mb-10">
                <h1 className="text-4xl font-extrabold">আমাদের সম্পর্কে</h1>
                <p className="text-lg mt-2">আমরা পণ্য সরবরাহ করি বিশ্বাস, মান এবং সহজলভ্যতার সাথে।</p>
            </div>


            <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
                {/* Company Overview */}
                <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-xl shadow-lg mb-10 border border-gray-200">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">আমাদের যাত্রা</h2>
                    <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
                        Lixci-তে স্বাগতম — স্মার্ট শপিংয়ের সহজ ঠিকানা।

                        ২০২২ সালে ঢাকায় শুরু হওয়া Lixci-এর লক্ষ্য খুবই স্পষ্ট — মানসম্পন্ন পণ্য ও দরকারি ডিজিটাল সেবা সহজে এবং নির্ভরযোগ্যভাবে আপনাদের কাছে পৌঁছে দেওয়া।

                        আমরা চাই, আপনার অনলাইন শপিং অভিজ্ঞতা হোক ঝামেলামুক্ত, দ্রুত ও আপনার দৈনন্দিন জীবনের সাথে মানানসই।
                        হোক সেটা ঘরের দরকারি কিছু জিনিস, কিংবা বিশেষ কোনো পরিষেবা — Lixci সবসময় সেরা সুবিধা, স্বচ্ছতা আর যত্ন নিয়ে পাশে আছে।
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-8">
                        <div className="max-w-xs p-6 bg-white text-gray-800 rounded-lg shadow-md border border-gray-300 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-3">🚀 আমাদের মিশন</h3>
                            <p className="text-sm">
                                প্রযুক্তির সাহায্যে মানুষ ও ব্যবসায়িক প্রতিষ্ঠানের জীবন আরও সহজ ও কার্যকর করা।
                            </p>
                        </div>

                        <div className="max-w-xs p-6 bg-white text-gray-800 rounded-lg shadow-md border border-gray-300 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-3">🌱 আমাদের উন্নতি</h3>
                            <p className="text-sm">
                                ক্ষুদ্র একটি উদ্যোগ থেকে আজ একটি বৃহৎ ই-কমার্স প্ল্যাটফর্মে পরিণত হয়েছি, যা সম্ভব হয়েছে আপনাদের ভালোবাসায়।
                            </p>
                        </div>

                        <div className="max-w-xs p-6 bg-white text-gray-800 rounded-lg shadow-md border border-gray-300 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-3">💡 আমাদের মূল্যবোধ</h3>
                            <p className="text-sm">
                                আমরা <strong>বিশ্বস্ততা, উদ্ভাবন এবং গ্রাহকসেবার</strong> উপর সর্বোচ্চ গুরুত্ব দেই।
                            </p>
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="bg-gray-50 p-8 rounded-lg shadow-md mb-10">
                    <h2 className="text-2xl font-bold mb-6 text-center">আমাদের মূলনীতি</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <div className="text-4xl mx-auto mb-4">🤝</div>
                            <h3 className="text-lg font-bold mb-2">বিশ্বস্ততা</h3>
                            <p className="text-gray-600">আমরা আমাদের গ্রাহকদের সাথে সব সময় সৎ এবং স্বচ্ছ সম্পর্ক বজায় রাখি।</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <div className="text-4xl mx-auto mb-4">💡</div>
                            <h3 className="text-lg font-bold mb-2">উদ্ভাবন</h3>
                            <p className="text-gray-600">সব সময় নতুন ধারণা এবং প্রযুক্তি দিয়ে পণ্য ও সেবা উন্নত করি।</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <div className="text-4xl mx-auto mb-4">👥</div>
                            <h3 className="text-lg font-bold mb-2">গ্রাহক প্রাধান্য</h3>
                            <p className="text-gray-600">প্রতিটি পদক্ষেপে আমরা গ্রাহকের অভিজ্ঞতা ও চাহিদাকে অগ্রাধিকার দেই।</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
