"use client";

import Image from "next/image";
import { Apple, Play } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppDownloadPage() {
    return (
        <>
            <Navbar />
            <div className="bg-base-100 text-base-content">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            প্লেস্টোর ও অ্যাপ স্টোরে আমাদের মোবাইল অ্যাপ আসছে!
                        </h1>
                        <p className="mb-6 text-lg">
                            সবচেয়ে ভালো ইন্টারফেস, স্মুথ অভিজ্ঞতা ও নানা ফিচারের জন্যে আমাদের অ্যাপ এর জন্য অপেক্ষা করুন। খুব শীঘ্রই এটি গুগল প্লে স্টোর ও অ্যাপ স্টোরে এভেইলেবল হবে!
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="btn btn-primary flex items-center gap-2"
                            >
                                <Apple className="w-5 h-5" />
                                অ্যাপ স্টোর
                            </a>
                            <a
                                href="#"
                                className="btn btn-outline flex items-center gap-2"
                            >
                                <Play className="w-5 h-5" />
                                গুগল প্লে স্টোর
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center"
                    >
                        <Image
                            src="/app-preview.png"
                            alt="App Preview"
                            width={400}
                            height={600}
                            className="rounded-2xl shadow-xl"
                        />
                    </motion.div>
                </div>

                {/* Features Section */}
                <div className="bg-base-200 py-16 px-4">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-8">অ্যাপ কেনো ব্যাবহার করবেন?</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                { title: "দ্রুত এবং নিরাপদ", desc: "খুব দ্রুত ও নিরাপদ কেনাকাটার অভিজ্ঞতা পান" },
                                { title: "ইউজার ফ্রেন্ডলি", desc: "স্মুথ, ক্লিন এবং সহজে ব্যাবহার যোগ্য ইন্টারফেস" },
                                { title: "২৪/৭ সাপোর্ট", desc: "সর্বদা আপনাদের পাশে, যখনই আমাদের দরকার" },
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-base-100 rounded-xl shadow hover:shadow-lg transition-all">
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center py-16 bg-gradient-to-r from-primary to-secondary text-white">
                    <h2 className="text-3xl font-bold mb-4">এক্সপ্লোর করতে প্রস্তুত?</h2>
                    <p className="mb-6">এখনই ডাউনলোড করুন ও পূর্ণ অভিজ্ঞতা পান!</p>
                    <div className="flex justify-center gap-4">
                        <a href="#" className="flex flex-col justify-center items-center gap-3 btn btn-neutral">
                            <Apple className="w-5 h-5" />
                            অ্যাপ স্টোর
                        </a>
                        <a href="#" className="flex flex-col justify-center items-center gap-3 btn btn-neutral">
                            <Play className="w-5 h-5" />
                            গুগল প্লে স্টোর
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
