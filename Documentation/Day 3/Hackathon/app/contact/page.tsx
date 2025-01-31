'use client'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { useState, FormEvent } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Add form validation and submission logic
    };

    return (
      <>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">Get In Touch With Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question or need assistance? We're here to help! Reach out to our friendly team through any of the methods below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2B9DC3]" 
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2B9DC3]" 
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2B9DC3]" 
                  rows={5}
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button className="w-full sm:w-auto bg-[#2B9DC3] hover:bg-[#2589ab] text-white px-8 py-3 rounded-lg transition-colors">
                Send Message
              </button>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Address</h3>
                <p className="text-gray-600">
                  123 Furniture Street<br />
                  City, State 12345
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Phone</h3>
                <p className="text-gray-600">(123) 456-7890</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-gray-600">info@comforty.com</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 mb-12">
        <div className="relative aspect-[10/2] w-full rounded-lg overflow-hidden">
          <Image 
            src="/images/frame.jpg"
            alt="Contact Us Banner"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </div>

      <div className="bg-white">
        <Footer variant="light" />
      </div>
    </>
    )
}