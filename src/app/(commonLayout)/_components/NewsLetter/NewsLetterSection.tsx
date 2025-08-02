/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Instagram, Facebook, Youtube, Send, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewsletterSection: React.FC = () => {
  // Dummy data for recent posts/videos
  const recentPosts = [
    {
      time: "6:16",
      title: "5 New Cool Gadgets You Must See on Cartzilla - Cheap Budget",
      image: "https://placehold.co/100x70/E0E0E0/333333?text=Gadget+1",
    },
    {
      time: "10:20",
      title: "5 Super Useful Gadgets on Cartzilla You Must Have in 2023",
      image: "https://placehold.co/100x70/D0D0D0/333333?text=Gadget+2",
    },
    {
      time: "8:40",
      title: "Top 5 New Amazing Gadgets on Cartzilla You Must See",
      image: "https://placehold.co/100x70/C0C0C0/333333?text=Gadget+3",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Newsletter subscribed!");
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <section className="bg-[#F5F7FA] py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Left Section: Newsletter Sign-up */}
        <div className="flex flex-col justify-center">
          <h2 className="text-xl md:text-3xl font-semibold text-gray-900 mb-3">
            Sign up to our newsletter
          </h2>
          <p className="text-gray-600 text-base mb-6">
            Receive our latest updates about our products & promotions
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 mb-6"
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              required
            />
            <Button
              type="submit"
              size={"lg"}
              className=" bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors duration-200 shadow-md"
            >
              Subscribe
            </Button>
          </form>
          <div className="flex justify-center md:justify-start space-x-3">
            <a
              href="#"
              className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200 text-gray-700"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200 text-gray-700"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200 text-gray-700"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200 text-gray-700"
            >
              <Send className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Right Section: Recent Posts/Videos */}
        <div className="flex flex-col">
          {recentPosts.map((post, index) => (
            <a
              href="#"
              key={index}
              className="flex items-center bg-white rounded-lg shadow-sm p-3 mb-4 last:mb-0 hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-24 h-16 object-cover rounded-md mr-4 flex-shrink-0"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/100x70/E0E0E0/333333?text=Image+Error`;
                }}
              />
              <div className="flex-grow">
                <p className="text-xs text-gray-500 mb-1">{post.time}</p>
                <h3 className="text-xs md:text-sm font-semibold text-gray-800 leading-tight">
                  {post.title}
                </h3>
              </div>
            </a>
          ))}
          <a
            href="#"
            className="text-purple-600 hover:text-purple-800 font-semibold flex items-center mt-6 self-start transition-colors duration-200"
          >
            View all
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
