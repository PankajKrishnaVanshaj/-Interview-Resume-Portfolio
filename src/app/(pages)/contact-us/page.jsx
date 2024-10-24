"use client";
import React from "react";
import Header from "@/components/Header";
import { useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/contact", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("Contact submitted successfully!");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error submitting the contact form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <>
      <div className="mx-5 md:mx-20 lg:mx-36 mt-3">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Left side: Contact Information and Social Media Links */}
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md shadow-primary">
            <h2 className="text-3xl font-bold text-primary mb-4 flex justify-center">
              About Me
            </h2>

            {/* Social Media Links */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">
                Social Media
              </h3>
              <p className="text-gray-600 mb-6">
                Here you can find my contact details and social media links.
              </p>
              <div className="flex flex-col space-y-4">
                <a
                  href="https://www.facebook.com/PankajKrishnaVanshaj"
                  target="_blank"
                  className="flex items-center text-gray-600 hover:text-primary py-2"
                  rel="noopener noreferrer"
                >
                  <Facebook className="mr-2" /> Facebook
                </a>
                <a
                  href="https://www.instagram.com/pankajkrishnavanshaj"
                  target="_blank"
                  className="flex items-center text-gray-600 hover:text-primary py-2"
                  rel="noopener noreferrer"
                >
                  <Instagram className="mr-2" /> Instagram
                </a>

                {/* Add more social media links as needed */}
              </div>
            </div>
          </div>

          {/* Right side: Contact Form */}
          <div>
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-inner shadow-primary">
              <h1 className="text-3xl font-bold mb-2 text-center text-primary">
                Contact Us
              </h1>
              <p className="text-center text-gray-600 mb-8">
                We&apos;d love to hear from you! Please fill out the form below
                to get in touch.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject:
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message:
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
