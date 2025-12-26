'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  // 1. State for Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // 2. State for Status (idle, loading, success, error)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset Form
      } else {
        setStatus('error');
      }
    } catch (error) {
        console.log(error);
        setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        
        {/* Left: Contact Information */}
        <div className="space-y-8">
          <div>
            <span className="text-[#6BBF46] font-bold tracking-widest uppercase text-sm mb-2 block">Get in Touch</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#053B28] mb-6">Contact Haatwale</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Have a question about our products, shipping, or want to place a bulk order? We are here to help.
            </p>
          </div>

          <div className="space-y-8 pt-4">
            {/* Phone */}
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 bg-[#F5F9F5] rounded-full flex items-center justify-center text-[#6BBF46] shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[#053B28] text-lg">Phone</h3>
                <p className="text-gray-600 mt-1">+91 9105498001</p>
                <p className="text-sm text-gray-400">Mon-Sat 10am to 6pm</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 bg-[#F5F9F5] rounded-full flex items-center justify-center text-[#6BBF46] shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[#053B28] text-lg">Email</h3>
                <p className="text-gray-600 mt-1">hello@haatwale.com</p>
                <p className="text-sm text-gray-400">We reply within 24 hours</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 bg-[#F5F9F5] rounded-full flex items-center justify-center text-[#6BBF46] shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[#053B28] text-lg">Office</h3>
                <p className="text-gray-600 mt-1 leading-relaxed">
                  Village Haat Center, Chharayal Nayabad,<br />
                  Haldwani, Uttarakhand 263139, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-[#F5F9F5] p-8 md:p-12 rounded-[2rem] border border-[#E5EFE5]">
          <h2 className="text-2xl font-bold text-[#053B28] mb-8">Send us a message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Name</label>
                <input 
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6BBF46] focus:ring-1 focus:ring-[#6BBF46] transition-all bg-white" 
                  placeholder="Your Name" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email</label>
                <input 
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6BBF46] focus:ring-1 focus:ring-[#6BBF46] transition-all bg-white" 
                  placeholder="your@email.com" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Subject</label>
              <input 
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6BBF46] focus:ring-1 focus:ring-[#6BBF46] transition-all bg-white" 
                placeholder="How can we help?" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Message</label>
              <textarea 
                rows={5}
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6BBF46] focus:ring-1 focus:ring-[#6BBF46] transition-all bg-white resize-none" 
                placeholder="Write your message here..."
              ></textarea>
            </div>

            {/* Success/Error Message */}
            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-700 bg-green-100 p-3 rounded-lg">
                <CheckCircle size={20} /> Message sent successfully!
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-700 bg-red-100 p-3 rounded-lg">
                <AlertCircle size={20} /> Something went wrong. Try again.
              </div>
            )}

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-[#053B28] text-white font-bold py-4 rounded-xl hover:bg-[#6BBF46] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}