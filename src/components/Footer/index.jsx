import Link from "next/link";
import {
  Facebook,
  ShoppingCart,
  Home,
  LogIn,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 shadow-md border-t mt-8 pb-20 md:pb-0">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200 justify-center">
        {/* Logo & About */}
        <div>
          <Link href="/" className="text-2xl font-bold text-gray-100">
            Lixci
          </Link>
          <p className="mt-2 text-sm text-gray-400 w-2/3">
            Lixci — আপনার নির্ভরযোগ্য অনলাইন শপিং পার্টনার।
            বিশ্বস্ত পণ্য, দ্রুত ডেলিভারি এবং সাশ্রয়ী দামে কেনাকাটার সেরা গন্তব্য।
            ঘরে বসেই সহজেই পছন্দের পণ্য কিনুন Lixci থেকে।
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full flex justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-200">কুইক লিংক</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacyPolicy" className="hover:text-primary transition">
                  প্রাইভেসি পলিসি
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-primary transition">
                  শিপিং পলিসি
                </Link>
              </li>
              <li>
                <Link href="/return-refund" className="hover:text-primary transition">
                  রিটার্ন পলিসি
                </Link>
              </li>
              <li>
                <Link href="/termsConditions" className="hover:text-primary transition">
                  নিয়ম ও শর্তাদি
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div>
            <h3 className="font-semibold text-lg text-gray-200">যোগাযোগ</h3>
            <p className="mt-2 text-sm text-gray-400">ইমেইল: service@lixci.com</p>
            <p className="text-sm text-gray-400">ফোন: +880 9611-656917</p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4 text-gray-400">
              <Link href="#" className=" flex  gap-1 hover:text-blue-500 transition">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Highlighted Buttons - Sticky Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-700 bg-gray-900">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-2">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-1 bg-gray-700 text-white px-3 py-2 rounded hover:bg-primary hover:text-white transition text-sm"
          >
            <Home className="w-4 h-4" />
            হোম
          </Link>
          <Link
            href="/cart"
            className="flex-1 flex items-center justify-center gap-1 bg-gray-700 text-white px-3 py-2 rounded hover:bg-primary hover:text-white transition text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            কার্ট
          </Link>
          <Link
            href="/signIn"
            className="flex-1 flex items-center justify-center gap-1 bg-gray-700 text-white px-3 py-2 rounded hover:bg-primary hover:text-white transition text-sm"
          >
            <LogIn className="w-4 h-4" />
            লগইন
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Lixci. All Rights Reserved.
      </div>
    </footer>
  );
}
