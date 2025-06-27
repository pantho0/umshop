"use client";
import React from "react";
import MegaMenu from "./MegaMenu";
import Logo from "../../../../../../public/assets/umshop.jpg";
import {
  Search,
  Heart,
  User,
  ShoppingCart,
  DollarSign,
  ChevronDown,
  Percent,
} from "lucide-react";
import ContainerLayout from "../../layouts/ContainerLayout";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md z-50 relative">
      {/* Top Bar */}
      <div className="bg-gray-900 py-2 text-sm text-gray-300 hidden md:block">
        <div className="container mx-auto flex justify-end items-center px-4 max-w-7xl">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Percent className="h-4 w-4 mr-1 text-red-400" />
              Only this month:{" "}
              <span className="font-semibold text-red-300 ml-1">
                Super Sale 20%
              </span>
            </span>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              <Heart className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              <User className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
            </a>
            <div className="flex items-center">
              <span className="mr-1">Eng</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="mr-1">USD ($)</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <ContainerLayout>
        {/* Main Navbar */}
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4 max-w-7xl">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="Logo"
              width={140}
              height={140}
              className="rounded"
            />
            {/* Mega Menu Integration */}
            <div className="hidden md:block">
              <MegaMenu />
            </div>
          </div>

          {/* Search Bar  */}
          <div className="hidden md:flex flex-grow mx-8 max-w-xl relative">
            <input
              type="text"
              placeholder="Search the products"
              className="w-full py-2 pl-4 pr-10 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Mobile menu  */}
          <div className="flex items-center space-x-4 md:hidden">
            <Search className="h-6 w-6 text-white" />
            <Heart className="h-6 w-6 text-white" />
            <User className="h-6 w-6 text-white" />
            <ShoppingCart className="h-6 w-6 text-white" />
            {/* Mobile Mega Menu  */}
            <MegaMenu />
          </div>

          {/* Other Nav Links */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Best Sellers
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Today&apos;s Deals
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              New Arrivals
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Gift Cards
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Help Center
            </a>
          </div>
        </div>
      </ContainerLayout>
    </nav>
  );
};

export default Navbar;
