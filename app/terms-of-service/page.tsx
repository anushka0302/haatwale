import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#053B28] mb-8">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-12">Last Updated: December 26, 2025</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">1. Overview</h2>
            <p>
              This website is operated by Haatwale. Throughout the site, the terms “we”, “us” and “our” refer to Haatwale. 
              By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">2. Accuracy of Information</h2>
            <p>
              We are not responsible if information made available on this site is not accurate, complete, or current. 
              The material on this site is provided for general information only. Any reliance on the material on this site is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">3. Products and Pricing</h2>
            <p>
              Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
              We have made every effort to display as accurately as possible the colors and images of our products that appear at the store.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">4. Governing Law</h2>
            <p>
              These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Uttarakhand, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">5. Contact Information</h2>
            <p>
              Questions about the Terms of Service should be sent to us at <span className="font-bold text-[#6BBF46]">hello@haatwale.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
