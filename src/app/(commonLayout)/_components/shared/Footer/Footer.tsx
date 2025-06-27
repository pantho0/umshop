/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Separator } from "@/components/ui/separator"; // Assuming Shadcn Separator is available
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Logo from "../../../../../../public/assets/umshop.jpg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Top Section: Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10">
          {/* Column 1: Logo and Contact */}
          <div className="flex flex-col">
            <Image src={Logo} alt="Logo" className="w-3/4 rounded-md" />
            <p className="text-gray-400 mb-4">Got question? Contact us 24/7</p>
            <div className="relative">
              <select className="w-full bg-gray-700 border border-gray-600 text-white py-3 px-4 pr-10 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Help and consultation</option>
                <option>Customer Support</option>
                <option>Technical Assistance</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  About company
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Our team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  News
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Account */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Your account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Shipping rates & policies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Refunds & replacements
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Delivery info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Order tracking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Taxes & fees
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer service */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Customer service
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Payment methods
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Money back guarantee
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Product returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Support center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Term and conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <Separator className="bg-gray-700 my-8" />

        {/* Bottom Section: Categories and Copyright */}
        <div className="flex flex-col space-y-6">
          {/* Categories Row */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400">
            {[
              "Computers",
              "Smartphones",
              "TV, Video",
              "Speakers",
              "Cameras",
              "Printers",
              "Video Games",
              "Headphones",
              "Wearable",
              "HDD/SSD",
              "Smart Home",
              "Apple Devices",
              "Tablets",
              "Monitors",
              "Scanners",
              "Servers",
              "Heating and Cooling",
              "E-readers",
              "Data Storage",
              "Networking",
              "Power Strips",
              "Plugs and Outlets",
              "Detectors and Sensors",
              "Accessories",
            ].map((category, index) => (
              <React.Fragment key={index}>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  {category}
                </a>
                {index < 24 && <span className="text-gray-600">/</span>}{" "}
                {/* Add separator except for the last item */}
              </React.Fragment>
            ))}
          </div>

          {/* Copyright and Payment Methods */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 pt-4">
            <p className="mb-4 md:mb-0">
              © All rights reserved. Made by Createx Studio
            </p>
            <div className="flex items-center space-x-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbl_ZwXJ8ga6BbBJpmbSwZGkV-MaG_-8fGeA&s"
                alt="Visa"
                className="h-6 object-contain"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwqeK4YwRLe6_Jo3S708Zc7OR8kgSsdPQiVQ&s"
                alt="MasterCard"
                className="h-6 object-contain"
              />
              <img
                src="https://png.pngtree.com/element_our/png/20180723/paypal-logo-icon-png_44635.jpg"
                alt="PayPal"
                className="h-6 object-contain"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvS18hxdcdFNDr8f6YUSV-ly3BXwvYmC_XNA&s"
                alt="Google Pay"
                className="h-6 object-contain"
              />
              <img
                src="https://download.logo.wine/logo/Apple_Pay/Apple_Pay-Logo.wine.png"
                alt="Apple Pay"
                className="h-6 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
