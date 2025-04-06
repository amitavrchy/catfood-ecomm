"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhone,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
    FaPaperPlane,
} from "react-icons/fa";

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
            <div className="text-center py-16 bg-blue-700 text-white rounded-lg mb-10">
                <h1 className="text-4xl font-bold">যোগাযোগ করুন</h1>
                <p className="text-lg mt-2">আপনার প্রশ্ন, মতামত অথবা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন।</p>
            </div>
            <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-xl">
                <Toaster position="top-right" reverseOrder={false} />

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-100 p-8 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">বার্তা পাঠান</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="আপনার নাম" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 border border-gray-300 rounded-md" required />
                            <input type="email" placeholder="আপনার ইমেইল" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-3 border border-gray-300 rounded-md" required />
                            <input type="text" placeholder="আপনার মোবাইল নম্বর" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 border border-gray-300 rounded-md" required />
                            <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full p-3 border border-gray-300 rounded-md">
                                <option value="">বিষয় নির্বাচন করুন</option>
                                <option value="Support">সাপোর্ট</option>
                                <option value="Sales">বিক্রয় সংক্রান্ত</option>
                                <option value="General">সাধারণ জিজ্ঞাসা</option>
                            </select>
                            <textarea placeholder="আপনার বার্তা" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full p-3 border border-gray-300 rounded-md h-28" required></textarea>
                            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md flex items-center gap-2 justify-center hover:bg-blue-700 transition">
                                <FaPaperPlane /> বার্তা পাঠান
                            </button>
                        </form>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                            📞 যোগাযোগের তথ্য
                        </h2>

                        <div className="space-y-4 text-gray-700">
                            <p className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-blue-500" />
                                <strong>ঠিকানা:</strong> ১২৩, ধানমন্ডি, ঢাকা, বাংলাদেশ
                            </p>

                            <p className="flex items-center gap-2">
                                <FaPhone className="text-green-500" />
                                <strong>ফোন:</strong> +৮৮০ ১২৩-৪৫৬-৭৮৯
                            </p>

                            <p className="flex items-center gap-2">
                                <FaEnvelope className="text-red-500" />
                                <strong>ইমেইল:</strong> support@example.com
                            </p>

                            <p className="flex items-center gap-2">
                                🕒 <strong>কার্যকাল:</strong> সোম - শুক্র, সকাল ৯টা থেকে সন্ধ্যা ৬টা
                            </p>
                        </div>

                        <div className="mt-6 rounded-xl overflow-hidden shadow-md border">
                            <iframe
                                className="w-full h-64"
                                src="https://maps.google.com/maps?q=Dhaka,%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <h2 className="text-2xl font-bold mb-4">আমাদের ফলো করুন</h2>
                    <div className="flex justify-center gap-6 text-2xl">
                        <a href="#" className="text-blue-600 hover:text-blue-800 transition"><FaFacebook /></a>
                        <a href="#" className="text-sky-400 hover:text-sky-600 transition"><FaTwitter /></a>
                        <a href="#" className="text-blue-800 hover:text-blue-900 transition"><FaLinkedin /></a>
                        <a href="#" className="text-pink-600 hover:text-pink-800 transition"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
