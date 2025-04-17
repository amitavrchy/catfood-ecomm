import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="mx-4 md:mx-20">
        <Head>
          <title>Privacy Policy | Lixci</title>
          <meta
            name="description"
            content="Read Lixci's privacy policy to understand what data we collect and how we use it."
          />
        </Head>

        <div className="mx-auto px-4 py-12 text-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">🔒 Privacy Policy</h1>

          <p className="mb-4">
            At <strong>Lixci</strong>, we respect your privacy. We collect only the necessary information to fulfill your orders, including:
          </p>

          <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
            <li>Name</li>
            <li>Phone number</li>
            <li>Shipping address</li>
          </ul>

          <p className="mb-4">
            We do <strong>not</strong> collect email or payment information at this time. Your information is shared only with our trusted courier partners strictly for delivery purposes.
          </p>

          <p className="mb-4">
            We do <strong>not</strong> use cookies or tracking tools on our website.
          </p>

          <p>
            If you wish to delete your data, you can contact our support team and request removal. We take your privacy seriously and are happy to assist.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
