/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox"; // Keep Checkbox import for other potential uses if any, or remove if not used elsewhere
import {
  Minus,
  Plus,
  X,
  Percent,
  ChevronRight,
  CheckCircle2,
  Edit,
} from "lucide-react";

// Define a type for a cart item (re-used for order summary display)
interface CartItem {
  id: string;
  title: string;
  image: string;
  color: string;
  model: string;
  price: number;
  oldPrice?: number;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  // Dummy form states for shipping and payment
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "Jane Cooper",
    mobileNumber: "(213) 555-1234",
    email: "jane.cooper@gmail.com",
    district: "Harrisburg", // Now a select option
    upazila: "Central", // Now a select option
    detailedAddress: "567 Cherry Lane Apt 812", // Now a textarea
  });

  // paymentMethod now defaults to "cash_on_delivery"
  const [paymentMethod, setPaymentMethod] =
    useState<string>("cash_on_delivery");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  // The `acceptTerms` state is removed as the checkbox is removed
  const [additionalComments, setAdditionalComments] = useState<string>("");

  // Dummy cart data for order summary demonstration
  const cartItems: CartItem[] = [
    {
      id: "iphone14",
      title: "Apple iPhone 14 128GB",
      image: "https://placehold.co/80x80/E0E0E0/333333?text=iPhone",
      color: "White",
      model: "128 GB",
      price: 899.0,
      quantity: 1,
    },
    {
      id: "ipadpro",
      title: "Tablet Apple iPad Pro M2",
      image: "https://placehold.co/80x80/D0D0D0/333333?text=iPad",
      color: "Black",
      model: "256 GB",
      price: 989.0,
      oldPrice: 1099.0,
      quantity: 1,
    },
    {
      id: "smartwatch",
      title: "Smart Watch Series 7",
      image: "https://placehold.co/80x80/C0C0C0/333333?text=Watch",
      color: "White",
      model: "44 mm",
      price: 429.0,
      quantity: 2,
    },
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const saving = 110.0; // Dummy saving
  const taxCollected = 73.4; // Dummy tax
  const shippingCost = "Calculated at checkout"; // As per image

  const estimatedTotal = subtotal - saving + taxCollected;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the order information to your backend
    alert("Order submitted successfully!");
    console.log("Order Details:", {
      shippingInfo,
      paymentMethod,
      cardDetails: paymentMethod === "credit_card" ? cardDetails : "N/A",
      additionalComments,
      total: estimatedTotal,
      cartItems,
    });
  };

  return (
    <div className="font-inter antialiased bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-6">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Shipping Address and Payment */}
          <div className="lg:w-2/3 bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8">
            <form onSubmit={handleSubmitOrder} className="space-y-8">
              {/* Shipping Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      value={shippingInfo.fullName}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mobileNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mobile Number
                    </label>
                    <Input
                      id="mobileNumber"
                      type="tel"
                      value={shippingInfo.mobileNumber}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          mobileNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email (Optional)
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="district"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        District
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setShippingInfo({ ...shippingInfo, district: value })
                        }
                        value={shippingInfo.district}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Populate with actual districts for Bangladesh */}
                          <SelectItem value="Brahmanbaria">
                            Brahmanbaria
                          </SelectItem>
                          <SelectItem value="Comilla">Comilla</SelectItem>
                          <SelectItem value="Dhaka">Dhaka</SelectItem>
                          <SelectItem value="Chittagong">Chittagong</SelectItem>
                          {/* Add more districts as needed */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label
                        htmlFor="upazila"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Upazila
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setShippingInfo({ ...shippingInfo, upazila: value })
                        }
                        value={shippingInfo.upazila}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Upazila" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Populate with actual upazilas based on selected district */}
                          <SelectItem value="Brahmanbaria Sadar">
                            Brahmanbaria Sadar
                          </SelectItem>
                          <SelectItem value="Akhaura">Akhaura</SelectItem>
                          <SelectItem value="Kasba">Kasba</SelectItem>
                          {/* Add more upazilas as needed */}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="detailedAddress"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Detailed Address Information
                    </label>
                    <Input
                      id="detailedAddress"
                      type="textarea" // This creates a textarea
                      value={shippingInfo.detailedAddress}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          detailedAddress: e.target.value,
                        })
                      }
                      placeholder="Street, Building, Apartment, etc."
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6 bg-gray-200" />

              {/* Payment Method */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment
                </h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="cash_on_delivery"
                      id="cash_on_delivery"
                    />
                    <label
                      htmlFor="cash_on_delivery"
                      className="text-gray-700 font-medium"
                    >
                      Cash on delivery
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <label
                      htmlFor="credit_card"
                      className="text-gray-700 font-medium flex items-center"
                    >
                      Credit or debit card
                      <img
                        src="https://placehold.co/40x20/000000/FFFFFF?text=VISA"
                        alt="Visa"
                        className="ml-3 h-4"
                      />
                      <img
                        src="https://placehold.co/40x20/000000/FFFFFF?text=MC"
                        alt="MasterCard"
                        className="ml-1 h-4"
                      />
                      <img
                        src="https://placehold.co/40x20/000000/FFFFFF?text=AE"
                        alt="Amex"
                        className="ml-1 h-4"
                      />
                    </label>
                  </div>
                  {paymentMethod === "credit_card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                      <div className="md:col-span-2">
                        <label htmlFor="cardNumber" className="sr-only">
                          Card number
                        </label>
                        <Input
                          id="cardNumber"
                          placeholder="Card number"
                          value={cardDetails.cardNumber}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              cardNumber: e.target.value,
                            })
                          }
                          required={paymentMethod === "credit_card"}
                        />
                      </div>
                      <div>
                        <label htmlFor="expiry" className="sr-only">
                          MM/YY
                        </label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              expiry: e.target.value,
                            })
                          }
                          required={paymentMethod === "credit_card"}
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="sr-only">
                          CVC
                        </label>
                        <Input
                          id="cvc"
                          placeholder="CVC"
                          value={cardDetails.cvc}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              cvc: e.target.value,
                            })
                          }
                          required={paymentMethod === "credit_card"}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <label
                      htmlFor="paypal"
                      className="text-gray-700 font-medium"
                    >
                      PayPal
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="google_pay" id="google_pay" />
                    <label
                      htmlFor="google_pay"
                      className="text-gray-700 font-medium"
                    >
                      Google Pay
                    </label>
                  </div>
                </RadioGroup>

                <div className="mt-6">
                  <label
                    htmlFor="comments"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Additional comments
                  </label>
                  <Input
                    id="comments"
                    type="textarea"
                    value={additionalComments}
                    onChange={(e) => setAdditionalComments(e.target.value)}
                    placeholder="Add any special instructions here..."
                  />
                </div>

                {/* Removed the "I accept the Terms and Conditions" checkbox */}

                <Button
                  type="submit"
                  className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-colors duration-200 shadow-md flex items-center justify-center mt-6"
                >
                  Pay ${estimatedTotal.toFixed(2)}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit sticky top-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Order summary
              </h2>
            </div>
            <div className="flex items-center justify-between mb-4">
              {cartItems.slice(0, 3).map((item, _index) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain rounded-md"
                />
              ))}
              {cartItems.length > 3 && (
                <span className="text-gray-600 text-sm">
                  +{cartItems.length - 3} more
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-purple-700"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items):</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Saving:</span>
                <span className="font-semibold text-red-500">
                  -${saving.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax collected:</span>
                <span className="font-semibold">
                  ${taxCollected.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-semibold">{shippingCost}</span>
              </div>
            </div>

            <Separator className="my-6 bg-gray-200" />

            <div className="flex justify-between items-center text-lg font-semibold text-gray-900 mb-6">
              <span>Estimated total:</span>
              <span>${estimatedTotal.toFixed(2)}</span>
            </div>

            <div className="bg-orange-100 text-orange-800 p-3 rounded-md text-sm flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 mr-2" /> Congratulations! You
              have earned 256 bonuses
            </div>

            <Separator className="my-6 bg-gray-200" />

            {/* Apply Promo Code Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="promo-code">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                  <Percent className="mr-2 h-5 w-5" /> Apply promo code
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="flex space-x-2">
                    <Input placeholder="Promo code" className="flex-grow" />
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Apply
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </aside>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="text-purple-600 hover:underline flex items-center justify-center"
          >
            <ChevronRight className="rotate-180 mr-2 h-4 w-4" /> Continue
            shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
