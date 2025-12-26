import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#053B28] mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-12">Last Updated: December 26, 2025</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">1. Introduction</h2>
            <p>
              Welcome to Haatwale. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we look after your personal data when you visit our website and tells you about your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">2. Information We Collect</h2>
            <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Identity Data:</strong> Name, username, or similar identifier.</li>
              <li><strong>Contact Data:</strong> Billing address, delivery address, email address, and telephone numbers.</li>
              <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of products you have purchased from us.</li>
              <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, and location.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we use your personal data to process your orders, 
              deliver your products, and manage our relationship with you. We do not sell your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. 
              Payment information is processed securely via third-party gateways and is never stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at: <br/>
              <span className="font-bold text-[#6BBF46]">hello@haatwale.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}