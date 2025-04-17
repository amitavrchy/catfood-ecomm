import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function ShippingPolicy() {
  return (
    <>
      <Navbar />
      <div className="mx-4 md:mx-20">
        <Head>
          <title>Shipping Policy | Lixci</title>
          <meta
            name="description"
            content="Learn about our shipping process, delivery times, fees, and pre-order options at Lixci."
          />
        </Head>

        <div className="mx-auto px-4 py-12 text-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">🚚 Shipping Policy</h1>

          <p className="mb-4">
            We ship across Bangladesh using trusted courier partners like{" "}
            <strong>SteadFast, RedEx, Pathao</strong>, and others.
          </p>

          <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
            <li>
              <strong>Delivery Time:</strong> 2–3 working days
            </li>
            <li>
              <strong>Shipping Fees:</strong> Applied at checkout (no free shipping currently, except during special promotions)
            </li>
            <li>
              <strong>Tracking:</strong> Available for all orders
            </li>
            <li>
              <strong>Pre-orders:</strong> Allowed for out-of-stock items
            </li>
          </ul>

          <p>
            We work hard to ensure timely and secure delivery of your purchases. If you face any delivery issues, please don’t hesitate to contact our support team.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
