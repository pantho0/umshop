/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Percent, ChevronRight, CheckCircle2, Edit } from "lucide-react";
import UMForm from "@/components/UMForm/UMForm";
import { FieldValues } from "react-hook-form";
import { UMInput } from "@/components/UMForm/UMInput";
import { allDistict, upazilasOf } from "@bangladeshi/bangladesh-address";
import UmSelect from "@/components/UMForm/UmSelect";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useConfirmOrder } from "@/hooks/order.hook";
import { IOrder } from "@/interface";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cartSlice";

// Define a type for a cart item (re-used for order summary display)
interface CartItem {
  id: string;
  sku: string;
  name: string;
  price: number;
  image: string;
  color: string;
  model: string;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  // paymentMethod now defaults to "cash_on_delivery"
  const [paymentMethod, setPaymentMethod] =
    useState<string>("cash_on_delivery");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  // The `acceptTerms` state is removed as the checkbox is removed
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazilla, setSelectedUpazilla] = useState("");
  const { mutate: handleConfirmOrder } = useConfirmOrder();

  const [mounted, setMounted] = useState(false);
  const cartItems: CartItem[] = useAppSelector((state) => state.persisted.cart);
  const dispatch = useAppDispatch();

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = 0; // As per image

  const estimatedTotal = subtotal + shippingCost;

  const handleSubmitOrder = (data: FieldValues) => {
    const toastId = toast.loading("Confirming your order");
    const orderData = {
      ...data,
      paymentMethod,
      status: "Pending",
      orderedItems: cartItems,
      grandTotal: estimatedTotal,
    };
    console.log(orderData);
    handleConfirmOrder(orderData as IOrder, {
      onSuccess: () => {
        toast.success("Order Confirmed", { id: toastId, duration: 2000 });
        // dispatch(clearCart());
      },
      onError: (err) => {
        toast.error(err.message, { id: toastId, duration: 2000 });
      },
    });
  };

  const districts = allDistict();
  const upazilla = upazilasOf(selectedDistrict);

  useEffect(() => {
    setMounted(true);
    scrollTo(0, 0);
  }, []);

  return (
    <>
      {mounted && (
        <div className="font-inter antialiased bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-6">
              Checkout
            </h1>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column: Shipping Address and Payment */}
              <div className="lg:w-2/3 bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8">
                <UMForm onSubmit={handleSubmitOrder} className="space-y-8">
                  {/* Shipping Information */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Shipping Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <UMInput
                          type="text"
                          name="fullName"
                          label="Full Name"
                          placeholder="Full Name"
                        />
                      </div>
                      <div>
                        <UMInput
                          type="text"
                          name="mobileNumber"
                          label="Mobile Number"
                          placeholder="Mobile Number"
                        />
                      </div>
                      <div>
                        <UMInput
                          type="text"
                          name="email"
                          label="Email (Optional)"
                          placeholder="Email (Optional)"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <UmSelect
                            label="Select District"
                            name="district"
                            defaultValue="__placeholder__"
                            options={[
                              {
                                value: "__placeholder__",
                                label: "Select your district",
                              },
                              ...districts.map((dist: string) => ({
                                value: dist,
                                label: dist,
                              })),
                            ]}
                            onValueChange={(val) => {
                              setSelectedDistrict(val);
                            }}
                          />
                        </div>
                        <div>
                          <UmSelect
                            label="Upazilla"
                            name="upazilla"
                            defaultValue="__placeholder__"
                            options={[
                              {
                                value: "__placeholder__",
                                label: "Select your upazilla",
                              },
                              ...upazilla.map((upa) => ({
                                value: upa.upazila,
                                label: upa.upazila,
                              })),
                            ]}
                            onValueChange={(val) => {
                              setSelectedUpazilla(val);
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <UMInput
                          type="text"
                          name="detailsInformation"
                          label="Details Information"
                          placeholder="Details Information"
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

                    <Button
                      type="submit"
                      className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-colors duration-200 shadow-md flex items-center justify-center mt-6"
                    >
                      {paymentMethod === "cash_on_delivery"
                        ? "Confirm Order"
                        : `Pay ${estimatedTotal.toFixed(2)}`}
                    </Button>
                  </div>
                </UMForm>
              </div>

              {/* Right Column: Order Summary */}
              <aside className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit sticky top-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Order summary
                  </h2>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-full max-w-sm mx-10"
                  >
                    <CarouselContent className="-ml-2">
                      {cartItems.map((item, index) => (
                        <CarouselItem
                          key={index}
                          className="pl-2 basis-1/3 md:basis-1/4 lg:basis-1/3"
                        >
                          <div className="p-1">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-contain rounded-md"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items):</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    {/* <span>Saving:</span>
                    <span className="font-semibold text-red-500">
                      -${saving.toFixed(2)}
                    </span> */}
                  </div>
                  <div className="flex justify-between">
                    {/* <span>Tax collected:</span>
                    <span className="font-semibold">
                      ${taxCollected.toFixed(2)}
                    </span> */}
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
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Thanks for shopping
                  with us
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
      )}
    </>
  );
};

export default CheckoutPage;
