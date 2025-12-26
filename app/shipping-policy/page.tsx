import React from 'react';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#053B28] mb-8">Shipping Policy</h1>
        
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">1. Processing Time</h2>
            <p>
              All orders are processed within <strong>1-2 business days</strong>. Orders are not shipped or delivered on Sundays or holidays.
              If we are experiencing a high volume of orders (especially during harvest season), shipments may be delayed by a few days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">2. Shipping Rates & Estimates</h2>
            <p className="mb-4">Shipping charges for your order will be calculated and displayed at checkout.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden text-sm">
                <thead className="bg-[#053B28] text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Shipping Method</th>
                    <th className="py-3 px-4 text-left">Estimated Delivery</th>
                    <th className="py-3 px-4 text-left">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4">Standard Shipping</td>
                    <td className="py-3 px-4">5-7 Business Days</td>
                    <td className="py-3 px-4">Free (Orders above ₹999)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Expedited Shipping</td>
                    <td className="py-3 px-4">2-3 Business Days</td>
                    <td className="py-3 px-4">₹150</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">3. Shipment Confirmation & Order Tracking</h2>
            <p>
              You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). 
              The tracking number will be active within 24 hours.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#053B28] mb-4">4. Damages</h2>
            <p>
              Haatwale is not liable for any products damaged or lost during shipping. However, if you received your order damaged, 
              please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}