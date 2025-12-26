import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#053B28] mb-8">Refund Policy</h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h3 className="font-bold text-[#053B28] mb-2">Perishable Goods Notice</h3>
            <p className="text-sm">
              Since we deal in organic food products, we generally do not accept returns due to hygiene and safety reasons. 
              However, we offer replacements or refunds in specific cases detailed below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">1. Eligibility for Refunds</h2>
            <p className="mb-4">You are eligible for a full refund or replacement if:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The product received is <strong>damaged or leaked</strong>.</li>
              <li>The product received is <strong>expired</strong>.</li>
              <li>You received the <strong>wrong item</strong>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">2. How to Request a Refund</h2>
            <p>
              To start a return/refund request, you can contact us at <span className="font-bold text-[#6BBF46]">hello@haatwale.com</span> within <strong>24 hours</strong> of receiving the order. 
              Please attach photos of the damaged or wrong product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">3. Refunds Process</h2>
            <p>
              If your return is accepted, we will initiate a refund to your original payment method. 
              Please remember it can take 5-7 business days for your bank or credit card company to process and post the refund.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}