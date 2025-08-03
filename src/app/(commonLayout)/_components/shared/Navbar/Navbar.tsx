// components/Navbar.tsx
"use client";
import React, { useState, useEffect } from "react";
import MegaMenu from "./MegaMenu";
import Logo from "../../../../../../public/assets/umshop.jpg";
import { Heart, User, Percent, LogIn, Search, X } from "lucide-react";
import SearchBar from "./SearchBar";
import ContainerLayout from "../../layouts/ContainerLayout";
import Image from "next/image";
import CartDrawer from "./cartDrawer";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import { selectUser } from "@/redux/features/auth/authSlice";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const user = useAppSelector(selectUser);
  const [mounted, setMounted] = useState(false);
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav
      className={`bg-gray-800 text-white shadow-md z-50 relative ${className}`}
    >
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
            <CartDrawer />
            {mounted &&
              (!user ? (
                <Link
                  href="/login"
                  className="hover:text-white transition-colors duration-200"
                >
                  <LogIn className="h-5 w-5" />
                </Link>
              ) : (
                <Link
                  href={`${
                    user.role === "admin"
                      ? "/admin-dashboard/profile"
                      : "/user-dashboard/profile"
                  }`}
                  className="hover:text-white transition-colors duration-200"
                >
                  <User className="h-5 w-5" />
                </Link>
              ))}
          </div>
        </div>
      </div>

      <ContainerLayout>
        {/* Main Navbar */}
        <div className="container mx-auto flex items-center justify-between px-2 py-3 md:py-4 max-w-7xl">
          {/* Logo and MegaMenu */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo"
                width={140}
                height={140}
                className="rounded"
              />
            </Link>
            {/* Mega Menu for desktop */}
            <div className="hidden md:block">
              <MegaMenu />
            </div>
          </div>

          {/* Desktop SearchBar */}
          <div className="hidden md:block flex-1">
            <SearchBar />
          </div>

          {/* Mobile menu */}
          <div className="flex items-center space-x-1 md:hidden">
            <Heart className="h-6 w-6 text-white" />
            <CartDrawer />
            {mounted &&
              (!user ? (
                <Link
                  href="/login"
                  className="hover:text-white transition-colors duration-200"
                >
                  <LogIn className="h-5 w-5" />
                </Link>
              ) : (
                <Link
                  href={`${
                    user.role === "admin"
                      ? "/admin-dashboard/profile"
                      : "/user-dashboard/profile"
                  }`}
                  className="hover:text-white transition-colors duration-200"
                >
                  <User className="h-5 w-5" />
                </Link>
              ))}

            {!showMobileSearchBar ? (
              <Search
                className="h-6 w-6 text-white cursor-pointer"
                onClick={() => setShowMobileSearchBar(true)}
              />
            ) : (
              <X
                className="h-6 w-6 text-white cursor-pointer"
                onClick={() => setShowMobileSearchBar(false)}
              />
            )}
            {/* Mobile Mega Menu */}
            {!showMobileSearchBar && <MegaMenu />}
          </div>

          {/* Desktop Nav Links */}
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

      {/* Mobile SearchBar shown below navbar */}
      {showMobileSearchBar && (
        <div className="md:hidden bg-gray-800 px-4 pb-3">
          <SearchBar />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
