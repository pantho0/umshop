/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hook";
import { useSearchParams } from "next/navigation";
import { clearCart } from "@/redux/features/cartSlice";

const PaymentSuccessContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  console.log(orderDetails);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const orderId = searchParams.get("order_id");
    const savedOrderData = localStorage.getItem(`order_${orderId}`);

    if (savedOrderData && sessionId && orderId) {
      const parsedOrder = JSON.parse(savedOrderData);
      const verifyAndCreateOrder = async () => {
        try {
          const response = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session_id: sessionId,
              orderData: parsedOrder,
            }),
          });

          const data = await response.json();

          if (data.success) {
            setOrderDetails(data);
            dispatch(clearCart());
            localStorage.removeItem(`order_${orderId}`);
          } else {
            setError(data.message || "Payment verification failed");
          }
        } catch (err: any) {
          setError(
            `${
              err
                ? err.message
                : "Failed to process your order. Please contact support."
            }`
          );
        } finally {
          setLoading(false);
        }
      };

      verifyAndCreateOrder();
    } else {
      setError("Order information not found or session is invalid.");
      setLoading(false);
    }
  }, [dispatch, searchParams]);

  if (loading) {
    return <div className="text-center p-8">Finalizing your order...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <h1>Error</h1>
        <p>{error}</p>
        <Link href="/products">
          <Button>Go to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="font-inter antialiased min-h-screen flex items-center justify-center bg-gray-100">
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

const PaymentSuccessPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;
