"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("বার্তা সফলভাবে পাঠানো হয়েছে!");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    };

    return (
        <>
            <Navbar />

            <div className="text-center px-5 py-16 bg-gradient-to-r from-gray-900 to-slate-600 text-white rounded-lg mb-10">
                <h1 className="text-4xl font-bold">যোগাযোগ করুন</h1>
                <p className="text-lg mt-2">আপনার প্রশ্ন, মতামত অথবা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন।</p>
            </div>

            <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-xl">
                <Toaster position="top-right" reverseOrder={false} />

                <div className="grid md:grid-cols-2 gap-8">
                    {/* 📬 Message Form */}
                    <div className="bg-gray-100 p-8 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">বার্তা পাঠান</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="আপনার নাম"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="email"
                                placeholder="আপনার ইমেইল"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="আপনার মোবাইল নম্বর"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                            <select
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md"
                            >
                                <option value="">বিষয় নির্বাচন করুন</option>
                                <option value="Support">সাপোর্ট</option>
                                <option value="Sales">বিক্রয় সংক্রান্ত</option>
                                <option value="General">সাধারণ জিজ্ঞাসা</option>
                            </select>
                            <textarea
                                placeholder="আপনার বার্তা"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md h-28"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-[#439DDF] text-white p-3 rounded-md flex items-center gap-2 justify-center hover:bg-blue-700 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21.75 3.75l-17.25 7.5 6.75 2.25 2.25 6.75 7.5-17.25z"
                                    />
                                </svg>
                                বার্তা পাঠান
                            </button>
                        </form>
                    </div>

                    {/* 📍 Contact Info */}
                    <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg border border-gray-200">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-gray-800 flex items-center gap-2 flex-wrap">
                            📞 যোগাযোগের তথ্য
                        </h2>

                        <div className="space-y-4 text-gray-700 text-sm md:text-base">
                            <p className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-blue-500 mt-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M16.5 21v-2.25A2.25 2.25 0 0014.25 16.5h-4.5A2.25 2.25 0 007.5 18.75V21m9-9.75l-4.5-4.5m0 0L7.5 11.25M12 6.75v6" />
                                </svg>
                                <span><strong>ঠিকানা:</strong> ফকির বাড়ি, ব্লক - বি, লেন - ১, বিল্ডিং - ৩, মিরপুর ১০, ঢাকা</span>
                            </p>

                            <p className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-green-500 mt-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M2.25 6.75C2.25 6.33579 2.58579 6 3 6H21C21.4142 6 21.75 6.33579 21.75 6.75V17.25C21.75 17.6642 21.4142 18 21 18H3C2.58579 18 2.25 17.6642 2.25 17.25V6.75Z" />
                                </svg>
                                <span><strong>হেল্পলাইন:</strong> +880 9611-656917</span>
                            </p>

                            <p className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-red-500 mt-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span><strong>ইমেইল:</strong> service@lixci.com</span>
                            </p>

                            <p className="flex items-start gap-2">
                                🕒 <span><strong>কার্যকাল:</strong> সোম - শুক্র, সকাল ৯টা থেকে সন্ধ্যা ৬টা</span>
                            </p>
                        </div>

                        <div className="mt-6 rounded-xl overflow-hidden shadow-md border">
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    className="w-full h-full"
                                    src="https://maps.google.com/maps?q=Dhaka,%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
