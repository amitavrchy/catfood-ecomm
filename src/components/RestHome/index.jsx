"use client";
import { FaTruck, FaBriefcase, FaMoneyBillWave, FaComments } from "react-icons/fa";

const policies = [
  {
    icon: <FaTruck size={28} className="text-gray-700" />,
    title: "Cancellation & Returns",
    description: "If products not matched",
  },
  {
    icon: <FaBriefcase size={28} className="text-gray-700" />,
    title: "Privacy Policy",
    description: "Check before dealing",
  },
  {
    icon: <FaMoneyBillWave size={28} className="text-gray-700" />,
    title: "EMI Policy",
    description: "We provide 0% EMI facilities*",
  },
  {
    icon: <FaComments size={28} className="text-gray-700" />,
    title: "Customer Support",
    description: "Call us at 09613800800",
  },
];

export default function PolicySection() {
  return (
    <>
      <section className="w-11/12 mx-auto bg-gradient-to-r from-gray-800 to-gray-900 py-16 px-6 md:px-20 rounded-2xl shadow-xl mt-10 text-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-gray-100">
            সেরা শপিং এক্সপেরিয়েন্স করতে চান? 
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            হাজার হাজার পণ্যের ভিতর আপনার পণ্যটি খুজে নিন। কিনুন সুলভ মূল্যে, সহজে ও দ্রুত ডেলিভারি পান। 
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="/products"
              className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-200 transition duration-300"
            >
              কেনাকাটা শুরু করুন
            </a>
            <a
              href="#"
              className="border border-white text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-800 transition duration-300"
            >
              App ডাউনলোড করুন
            </a>
          </div>
        </div>
      </section>
      <div className="w-11/12 mx-auto mt-10 bg-white border rounded-md py-6 px-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {policies.map((policy, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {policy.icon}
              <h4 className="mt-3 font-semibold text-gray-800">{policy.title}</h4>
              <p className="text-sm text-gray-500">{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
