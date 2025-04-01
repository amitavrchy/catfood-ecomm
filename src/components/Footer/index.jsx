import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 shadow-md border-t mt-8">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-200">
        {/* Logo & About */}
        <div>
          <Link href="/" className="text-2xl font-bold text-primary">
            ই-শপ
          </Link>
          <p className="mt-2 text-sm text-gray-400 w-2/3">
            আপনার কেনাকাটার জন্যে বিশ্বাসযোগ্য ও সেরা প্ল্যাটফর্ম। 
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg text-gray-200">কুইক লিংক</h3>
          <ul className="mt-2 space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary transition">
                হোম
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-primary transition">
                পণ্য
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition">
                আমাদের সম্পর্কে
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition">
                যোগাযোগ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h3 className="font-semibold text-lg text-gray-200">যোগাযোগ</h3>
          <p className="mt-2 text-sm text-gray-400">ইমেইল: support@eshop.com</p>
          <p className="text-sm text-gray-400">ফোন: +1 (234) 567-890</p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 text-gray-400">
            <Link href="#" className="hover:text-blue-500 transition">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-blue-400 transition">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-pink-500 transition">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} E-Shop. All Rights Reserved.
      </div>
    </footer>
  );
}
