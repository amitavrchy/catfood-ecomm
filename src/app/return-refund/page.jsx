// pages/return-refund.js
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function ReturnRefundPolicy() {
    return (
        <>
            <Navbar />
            <div className="mx-20">
                <Head>
                    <title>Return & Refund Policy | Lixci</title>
                    <meta name="description" content="Read Lixci's return and refund policy. Learn about eligibility, refund process, and how to initiate a return." />
                </Head>

                <div className="mx-auto px-4 py-12 text-gray-800">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900">🔁 Return & Refund Policy</h1>

                    <p className="mb-4">
                        We accept returns within <strong>7 days of delivery</strong>, as long as the item is unused and in its original packaging.
                    </p>

                    <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                        <li>Refunds are issued via the original payment method.</li>
                        <li>Exchanges are available for eligible items.</li>
                        <li>Store credit is <strong>not</strong> offered at this time.</li>
                        <li>Return shipping costs are the responsibility of the buyer.</li>
                        <li>Digital goods are <strong>non-refundable</strong>.</li>
                    </ul>

                    <p>
                        If you'd like to initiate a return, please contact our support team with your order details. We’re here to help!
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}
