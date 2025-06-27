/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Heart,
  RefreshCw,
  Plus,
  Minus,
  CheckCircle2,
  MapPin,
  ChevronDown,
  ShoppingCart,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import productsData from "../../../../../../public/product/product.json"; // Re-use ProductType from CategoriesData

// Helper for star ratings
const renderStars = (rating: number, reviewCount: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    );
  }
  return (
    <div className="flex items-center text-sm text-gray-500">
      <div className="flex mr-1">{stars}</div>
      <span>({reviewCount} reviews)</span>
    </div>
  );
};

const ProductDetailsPage: React.FC = () => {
  // For demonstration, let's pick a specific product (e.g., iPhone 14)
  const product: any | undefined = productsData.find((p) =>
    p.title.includes("XPS 15 Laptop")
  );

  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center">
        Product not found.
      </div>
    );
  }

  const [selectedModel, setSelectedModel] = useState<string>(product.size[0]);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.variant_color[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const handleThumbnailClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setQuantity((prev) => {
      if (type === "increment") return prev + 1;
      if (type === "decrement" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const currentPrice = product.price; // Simplified for demo

  return (
    <div className="font-inter antialiased min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Tabs for General Info, Product Details, Reviews */}
        <Tabs defaultValue="general-info" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-fit md:inline-flex bg-gray-200 rounded-md p-1 mb-6">
            <TabsTrigger
              value="general-info"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 rounded-md px-4 py-2 transition-colors duration-200"
            >
              General Info
            </TabsTrigger>
            <TabsTrigger
              value="product-details"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 rounded-md px-4 py-2 transition-colors duration-200"
            >
              Product details
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 rounded-md px-4 py-2 transition-colors duration-200"
            >
              Reviews (68)
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="general-info"
            className="bg-white rounded-lg p-6 md:p-8"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column: Product Image Slider */}
              <div className="lg:w-1/2 flex flex-col items-center">
                <div className="relative w-full max-w-lg mx-auto">
                  <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4">
                      {product.images.map((img: any, index: any) => (
                        <div key={index} className="flex-none w-full pl-4">
                          <div className="relative h-96 flex items-center justify-center rounded-lg">
                            <img
                              src={img}
                              alt={`${product.title} - Image ${index + 1}`}
                              className="max-h-full max-w-full object-contain"
                              onError={(
                                e: React.SyntheticEvent<HTMLImageElement, Event>
                              ) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://placehold.co/400x400/E0E0E0/333333?text=Image+Error`;
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Custom navigation arrows for Embla (can be styled as needed) */}
                  {emblaApi && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => emblaApi.scrollPrev()}
                        disabled={!emblaApi.canScrollPrev()}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full z-10 bg-white/80 hover:bg-white"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => emblaApi.scrollNext()}
                        disabled={!emblaApi.canScrollNext()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full z-10 bg-white/80 hover:bg-white"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="flex mt-4 space-x-2 justify-center">
                  {product.images.map((img: any, index: any) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                        index === selectedIndex
                          ? "border-purple-600"
                          : "border-transparent"
                      } hover:border-purple-400 transition-colors duration-200`}
                      onClick={() => handleThumbnailClick(index)}
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://placehold.co/64x64/E0E0E0/333333?text=Thumb`;
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Product Details */}
              <div className="lg:w-1/2">
                {/* Product Title & Model */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <div className="flex justify-between items-center mb-4">
                  {renderStars(4, 68)} {/* Static rating for demo */}
                  <span className="text-sm text-gray-500">V00273124</span>
                </div>

                {/* Model/Size Variants */}
                <div className="mb-4">
                  <p className="text-gray-700 font-semibold mb-2">Model</p>
                  <div className="flex flex-wrap gap-2">
                    {product.size.map((size: any) => (
                      <Button
                        key={size}
                        variant={selectedModel === size ? "default" : "outline"}
                        onClick={() => setSelectedModel(size)}
                        className={`rounded-md ${
                          selectedModel === size
                            ? "bg-purple-600 text-white hover:bg-purple-700"
                            : "border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Color Variants */}
                <div className="mb-6">
                  <p className="text-gray-700 font-semibold mb-2">
                    Color: <span className="font-normal">{selectedColor}</span>
                  </p>
                  <div className="flex space-x-2">
                    {product.variant_color.map((color: any) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color
                            ? "border-purple-600"
                            : "border-gray-300"
                        } transition-colors duration-200`}
                        style={{
                          backgroundColor: color
                            .toLowerCase()
                            .replace(/\s/g, ""),
                        }} // Simple color mapping
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      ></button>
                    ))}
                  </div>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-gray-900">
                    ${currentPrice.toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="flex border border-gray-300 rounded-md overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange("decrement")}
                        className="h-10 w-10 rounded-none hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="flex items-center justify-center w-12 text-lg font-semibold text-gray-800 border-x border-gray-300">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange("increment")}
                        className="h-10 w-10 rounded-none hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors duration-200 shadow-md flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2" /> Add to cart
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-md border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-md border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Additional Info Badges */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <span className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" /> +32
                    bonuses
                  </span>
                  <span className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />{" "}
                    Interest-free loan
                  </span>
                  <span className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" /> Pay
                    by installments
                  </span>
                  <span className="flex items-center text-green-600 font-semibold">
                    <CheckCircle2 className="h-4 w-4 mr-1" /> Available to order
                  </span>
                </div>

                <Separator className="my-6 bg-gray-200" />

                {/* Shipping Options */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Shipping options
                    </h3>
                    <Button
                      variant="ghost"
                      className="text-purple-600 hover:text-purple-800 text-sm flex items-center"
                    >
                      <MapPin className="h-4 w-4 mr-1" /> Find local store
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-gray-700">
                      <span>Pickup from the store</span>
                      <span className="font-semibold">Today</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-700">
                      <span>Pickup from postal offices</span>
                      <span className="font-semibold">Tomorrow</span>
                      <span className="font-semibold">$25.00</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-700">
                      <span>Delivery by courier</span>
                      <span className="font-semibold">2-3 days</span>
                      <span className="font-semibold">$35.00</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-gray-200" />

                {/* Warranty Information (Collapsible) */}
                <div className="mb-4">
                  <div className="flex justify-between items-center cursor-pointer pb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Warranty information
                    </h3>
                    <ChevronDown className="h-5 w-5 text-gray-500 transform transition-transform duration-200" />{" "}
                    {/* Add rotation on click */}
                  </div>
                  <div className="text-gray-600 text-sm mt-2">
                    {/* Content for warranty info - hidden/shown with state/animation */}
                    <p>
                      Standard 1-year manufacturer&lsquo;s warranty included.
                      Extended warranty options available at checkout.
                    </p>
                  </div>
                </div>

                <Separator className="my-6 bg-gray-200" />

                {/* Payment and Credit (Collapsible) */}
                <div>
                  <div className="flex justify-between items-center cursor-pointer pb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Payment and credit
                    </h3>
                    <ChevronDown className="h-5 w-5 text-gray-500 transform transition-transform duration-200" />{" "}
                    {/* Add rotation on click */}
                  </div>
                  <div className="text-gray-600 text-sm mt-2">
                    {/* Content for payment/credit info - hidden/shown with state/animation */}
                    <p>
                      Accepts all major credit cards, PayPal, and interest-free
                      installment plans through selected partners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="product-details">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-gray-700">
              <h2 className="text-2xl font-bold mb-4">
                Product Details for {product.title}
              </h2>
              <p className="mb-4">
                {product.details} This section would contain more in-depth
                specifications, features, and technical information about the
                product.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Display: Super Retina XDR display with ProMotion</li>
                <li>Processor: A16 Bionic chip with 6-core CPU</li>
                <li>
                  Camera: Pro camera system (48MP Main, 12MP Ultra Wide, 12MP
                  Telephoto)
                </li>
                <li>Battery Life: Up to 23 hours video playback</li>
                <li>
                  Durability: Ceramic Shield front cover, water and dust
                  resistant
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-gray-700">
              <h2 className="text-2xl font-bold mb-4">
                Customer Reviews for {product.title} (68)
              </h2>
              <p className="mb-4">
                This section would display actual customer reviews, ratings, and
                options to leave a new review.
              </p>
              {/* Example Review */}
              <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center mb-2">
                  {renderStars(5, 0)}{" "}
                  <span className="ml-2 text-gray-800 font-semibold">
                    John Doe
                  </span>
                </div>
                <p className="text-gray-700">
                  "Absolutely love this phone! The camera is incredible and the
                  battery life is fantastic. Highly recommend!"
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Reviewed on June 20, 2024
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center mb-2">
                  {renderStars(4, 0)}{" "}
                  <span className="ml-2 text-gray-800 font-semibold">
                    Jane Smith
                  </span>
                </div>
                <p className="text-gray-700">
                  "Great phone, fast and smooth. Only minor complaint is the
                  weight, but overall very satisfied."
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Reviewed on June 15, 2024
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
