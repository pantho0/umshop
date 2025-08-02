"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const PaymentSuccessPage: React.FC = () => {
  return (
    <div className="font-inter antialiased min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-md bg-white rounded-lg border border-gray-200 p-6 md:p-8 text-center shadow-lg">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Thank you for your order!
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Your payment was successful.
        </p>
        <Link href="/products">
          <Button className="w-full bg-purple-600 cursor-pointer text-white font-semibold py-3 rounded-md hover:bg-purple-700 transition-colors duration-200 shadow-md">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
