import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <div className="mx-4 md:mx-20">
        <Head>
          <title>Terms & Conditions | Lixci</title>
          <meta
            name="description"
            content="Read the terms and conditions of using Lixci.com. Learn about ordering, product types, and user responsibilities."
          />
        </Head>

        <div className="mx-auto px-4 py-12 text-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">📜 Terms & Conditions</h1>

          <p className="mb-4">
            By using <strong>Lixci.com</strong>, you agree to the following terms:
          </p>

          <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
            <li>We sell both physical and digital products.</li>
            <li>Orders are processed as Cash on Delivery (COD).</li>
            <li>Pre-orders are available for items that are temporarily out of stock.</li>
            <li>
              Providing false or misleading information may result in order cancellation or account restriction.
            </li>
          </ul>

          <p>
            We reserve the right to update these terms as needed to improve service quality. Continued use of the site implies acceptance of any changes.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
