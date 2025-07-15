/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star,
  Heart,
  Plus,
  Minus,
  CheckCircle2,
  MapPin,
  ChevronDown,
  CheckCircle,
  XCircle,
  ChevronRight,
  ShoppingCart,
  ChevronLeft,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useAppDispatch } from "@/redux/hook";
import { addToCart } from "@/redux/features/cartSlice";
import { toast } from "sonner";

// Define the new Product interface based on your provided JSON structure
interface ProductVariant {
  sku: string;
  color: string;
  size: string;
  price: number;
  stock: number;
  // images: string[]; // Removed images from variant interface
}

interface Product {
  _id: string;
  title: string;
  parentCategory: { _id: string; name: string; slug: string };
  subCategory: { _id: string; name: string; slug: string };
  variants: ProductVariant[]; // Changed from variant_color and size
  details: string;
  images: string[]; // Top-level images will always be used
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

// Helper for star ratings (re-used)
const renderStars = (
  rating: number,
  reviewCount: number,
  size: "sm" | "md" = "md"
) => {
  const stars = [];
  const starSizeClass = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`${starSizeClass} ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    );
  }
  return (
    <div className="flex items-center text-sm text-gray-500">
      <div className="flex mr-1">{stars}</div>
      {reviewCount > 0 && <span>({reviewCount} reviews)</span>}
    </div>
  );
};

const ProductDetailsPage: React.FC<{ product: Product | null }> = ({
  product,
}) => {
  const dispatch = useAppDispatch();

  // State for selected variant attributes
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("general-info");

  // Embla Carousel state
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Loading state for this component
  const [isLoading, setIsLoading] = useState(true); // Start as true

  // Derived state: currently selected variant
  const selectedVariant = product?.variants.find(
    (variant) =>
      variant.size === selectedSize && variant.color === selectedColor
  );

  // Derived state: unique sizes and colors available for this product
  const availableSizes = Array.from(
    new Set(product?.variants.map((v) => v.size) || [])
  );
  const availableColors = Array.from(
    new Set(product?.variants.map((v) => v.color) || [])
  );

  // Embla Carousel Callbacks
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const handleThumbnailClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Initialize selected size/color and loading state when product prop changes
  useEffect(() => {
    if (product) {
      // Set initial selected size and color to the attributes of the first variant
      if (product.variants.length > 0) {
        setSelectedSize(product.variants[0].size);
        setSelectedColor(product.variants[0].color);
      }
      setIsLoading(false); // Product data loaded, turn off skeleton
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on product change
    } else {
      setIsLoading(true); // Product is null, show skeleton
    }
  }, [product]); // Depend on product prop

  // Embla Carousel effect
  useEffect(() => {
    if (!emblaApi || isLoading) return; // Don't initialize Embla if loading

    const onEmblaSelect = () => onSelect();

    onSelect(); // Initial sync
    emblaApi.on("select", onEmblaSelect);
    emblaApi.on("reInit", onEmblaSelect); // Use onEmblaSelect for reInit too

    return () => {
      emblaApi.off("select", onEmblaSelect);
      emblaApi.off("reInit", onEmblaSelect);
    };
  }, [emblaApi, onSelect, isLoading]);

  // Removed useEffect that updated images based on selected variant.
  // Images will now always come from product.images.

  // Early return for "Product not found" or initial loading
  if (!product && !isLoading) {
    // If product is null and not loading, it's not found
    return (
      <div className="container mx-auto p-8 text-center">
        Product not found.
      </div>
    );
  }

  const addToCartHandler = () => {
    if (!selectedVariant) {
      toast.error("Please select a valid product variant.");
      return;
    }
    const cartItem = {
      id: product!._id,
      sku: selectedVariant.sku, // Use SKU as cart item ID
      name: product!.title,
      price: selectedVariant.price,
      image: product!.images[0], // Always use the first top-level product image
      color: selectedVariant.color,
      model: selectedVariant.size, // Use size as model for cart display
      quantity: quantity,
    };
    dispatch(addToCart(cartItem));
    toast.success("Product added to cart");
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setQuantity((prev) => {
      if (type === "increment") return prev + 1;
      if (type === "decrement" && prev > 1) return prev - 1;
      return prev;
    });
  };

  // Current price is now from selectedVariant
  const currentPrice = selectedVariant
    ? selectedVariant.price
    : product?.variants[0]?.price || 0;

  // Dummy data for reviews (only if product is available)
  const reviews = product
    ? [
        {
          id: 1,
          author: "Rafael Marquez",
          date: "June 28, 2024",
          rating: 5,
          color: "Blue",
          model: "128GB",
          pros: "The phone has a new A15 Bionic chip, which makes it lightning-fast and responsive. The camera system has also been upgraded, and it now includes a 12-megapixel ultra-wide lens and a 12-megapixel wide lens.",
          cons: "Premium device, and it comes with a high price tag. Does not have a headphone jack.",
          likes: 0,
          dislikes: 0,
        },
        {
          id: 2,
          author: "Daniel Adams",
          date: "May 6, 2024",
          rating: 4,
          color: "Black",
          model: "256GB",
          pros: "The phone has a new A15 Bionic chip, which makes it lightning-fast and responsive. The camera system has also been upgraded, and it now includes a 12-megapixel ultra-wide lens and a 12-megapixel wide lens. The battery life is excellent, and it can easily last a whole day of heavy use.",
          cons: "Consequuntur magni, voluptatem sequi, tempora. Architecto beatae, quis autem.",
          likes: 0,
          dislikes: 0,
        },
        {
          id: 3,
          author: "Emily White",
          date: "April 10, 2024",
          rating: 5,
          color: "Starlight",
          model: "512GB",
          pros: "Stunning display, great performance, and amazing photos. Very happy with this purchase!",
          cons: "None so far.",
          likes: 0,
          dislikes: 0,
        },
      ]
    : [];

  // Review statistics (simulated)
  const reviewStats = product
    ? {
        overallRating: 4.1,
        totalReviews: 68,
        starDistribution: { 5: 37, 4: 16, 3: 9, 2: 4, 1: 3 },
      }
    : {
        overallRating: 0,
        totalReviews: 0,
        starDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };

  const maxStars = Math.max(...Object.values(reviewStats.starDistribution));

  // Images to display are now always from the top-level product.images
  const imagesToDisplay = product?.images || [];

  return (
    <div className="font-inter antialiased min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Tabs for General Info, Product Details, Reviews */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-fit md:inline-flex bg-gray-100 rounded-md p-1 mb-6">
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
              Reviews ({reviewStats.totalReviews})
            </TabsTrigger>
          </TabsList>

          {/* General Info Tab Content */}
          <TabsContent
            value="general-info"
            className="bg-white rounded-lg p-6 md:p-8"
          >
            {isLoading ? (
              // Skeleton for General Info Tab
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Image Slider Skeleton */}
                <div className="lg:w-1/2 flex flex-col items-center">
                  <Skeleton className="w-full max-w-lg h-96 rounded-lg mb-4" />
                  <div className="flex mt-4 space-x-2 justify-center">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="w-16 h-16 rounded-md" />
                    ))}
                  </div>
                </div>
                {/* Right Column: Product Details Skeleton */}
                <div className="lg:w-1/2 space-y-6">
                  <Skeleton className="h-10 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-1/2 mb-4" />
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-8 w-2/3 mb-6" />
                  <Skeleton className="h-12 w-full mb-6" />
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-10 w-24 rounded-md" />
                    <Skeleton className="h-10 w-28 rounded-md" />
                    <Skeleton className="h-10 w-20 rounded-md" />
                  </div>
                  <Skeleton className="h-8 w-24 mb-2" />
                  <div className="flex space-x-2 mb-6">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                  </div>
                  <Skeleton className="h-12 w-full mb-6" />
                  <div className="flex flex-wrap gap-4 mb-6">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-0.5 w-full my-6" />
                  <Skeleton className="h-24 w-full mb-6" />
                  <Skeleton className="h-0.5 w-full my-6" />
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-0.5 w-full my-6" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </div>
            ) : (
              // Actual content when not loading
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Product Image Slider */}
                <div className="lg:w-1/2 flex flex-col items-center">
                  <div className="relative w-full max-w-lg mx-auto">
                    <div className="overflow-hidden" ref={emblaRef}>
                      <div className="flex -ml-4">
                        {imagesToDisplay.map((img: string, index: number) => (
                          <div key={index} className="flex-none w-full pl-4">
                            <div className="relative h-96 flex items-center justify-center border p-1 rounded-lg">
                              <img
                                src={img}
                                alt={`${product!.title} - Image ${index + 1}`}
                                className="max-h-full max-w-full object-contain"
                                onError={(
                                  e: React.SyntheticEvent<
                                    HTMLImageElement,
                                    Event
                                  >
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
                    {imagesToDisplay.map((img: string, index: number) => (
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product!.title}
                  </h1>
                  <div className="flex justify-between items-center mb-4">
                    {renderStars(4, 68)} {/* Static rating for demo */}
                    <span className="text-sm text-gray-500">V00273124</span>
                  </div>

                  {/* Size Variants */}
                  <div className="mb-4">
                    <p className="text-gray-700 font-semibold mb-2">Size</p>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map((size: string) => (
                        <Button
                          key={size}
                          variant={
                            selectedSize === size ? "default" : "outline"
                          }
                          onClick={() => setSelectedSize(size)}
                          className={`rounded-md ${
                            selectedSize === size
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
                      Color:{" "}
                      <span className="font-normal">{selectedColor}</span>
                    </p>
                    <div className="flex space-x-2">
                      {availableColors.map((color: string) => (
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
                  <div className="flex flex-col items-start gap-4 md:flex-row md:items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-gray-900">
                      ${currentPrice.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-3 md:px-0">
                      <div className="flex border border-gray-300 rounded-md overflow-hidden">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuantityChange("decrement")}
                          className="h-10 w-10 rounded-none hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="flex items-center justify-center w-12 text-md font-semibold text-gray-800 border-x border-gray-300">
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
                      <Button
                        onClick={addToCartHandler}
                        className="px-6 py-2 bg-red-500 text-white font-semibold cursor-pointer rounded-md hover:bg-red-600 transition-colors duration-200 shadow-md flex items-center"
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" /> Add to cart
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-md border-gray-300 text-gray-600 hover:bg-gray-100"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Additional Info Badges */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                    <span className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />{" "}
                      +32 bonuses
                    </span>
                    <span className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />{" "}
                      Interest-free loan
                    </span>
                    <span className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />{" "}
                      Pay by installments
                    </span>
                    <span className="flex items-center text-green-600 font-semibold">
                      <CheckCircle2 className="h-4 w-4 mr-1" /> Available to
                      order
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
                        <span className="font-semibold text-green-600">
                          Free
                        </span>
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
                      <p>
                        Standard 1-year manufacturer&#39;s warranty included.
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
                      <p>
                        Accepts all major credit cards, PayPal, and
                        interest-free installment plans through selected
                        partners.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Product Details in general info tab */}
            <div className="py-5 px-10 md:px-5 w-full md:max-w-2/4">
              <div className="py-5">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Product details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-4">
                  {/* General Specs */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      General specs
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span>Title:</span>
                        <span className="font-medium text-gray-900">
                          {product?.title}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span>Size:</span>
                        <span className="font-medium text-gray-900">
                          {/* {product?.size} */}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span>Variant/color:</span>
                        <span className="font-medium text-gray-900">
                          {/* {product?.variant_color} */}
                        </span>
                        <span className="text-gray-500 cursor-pointer">?</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span>Details:</span>
                        <span className="font-medium text-gray-900">
                          {product?.details}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-800 font-semibold flex items-center mt-6"
                >
                  See all product details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
              {/* Product review in general tab */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                <Button
                  variant="outline"
                  className="text-purple-600 border-purple-600 hover:bg-purple-50 hover:text-purple-700"
                >
                  Leave a review
                </Button>
              </div>

              {/* Overall Rating Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="col-span-1 flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4">
                  <p className="text-5xl font-bold text-gray-900">
                    {reviewStats.overallRating}
                  </p>
                  {renderStars(Math.floor(reviewStats.overallRating), 0, "md")}
                  <p className="text-sm text-gray-600 mt-1">
                    {reviewStats.totalReviews} reviews
                  </p>
                </div>

                {/* Star Distribution Bars */}
                <div className="col-span-2 space-y-2">
                  {Object.entries(reviewStats.starDistribution)
                    .sort(([a], [b]) => parseInt(b) - parseInt(a))
                    .map(([stars, count]) => (
                      <div key={stars} className="flex items-center text-sm">
                        <span className="w-4 mr-2 text-gray-700">{stars}</span>
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-2" />
                        <div className="flex-grow bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-full rounded-full"
                            style={{ width: `${(count / maxStars) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-3 w-8 text-right text-gray-600">
                          {count}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <Separator className="my-6 bg-gray-200" />

              {/* Individual Reviews */}
              <div className="space-y-8">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-900 mr-2">
                          {review.author}
                        </span>
                        {renderStars(review.rating, 0, "sm")}{" "}
                        {/* Small stars for individual reviews */}
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      {review.color && (
                        <span className="mr-2">
                          Color:{" "}
                          <span className="font-semibold">{review.color}</span>
                        </span>
                      )}
                      {review.model && (
                        <span>
                          Model:{" "}
                          <span className="font-semibold">{review.model}</span>
                        </span>
                      )}
                    </div>
                    {review.pros && (
                      <p className="text-gray-700 mb-1 flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span className="font-semibold mr-1">Pros:</span>{" "}
                        {review.pros}
                      </p>
                    )}
                    {review.cons && (
                      <p className="text-gray-700 mb-3 flex items-start">
                        <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-1" />
                        <span className="font-semibold mr-1">Cons:</span>{" "}
                        {review.cons}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-sm hover:underline"
                      >
                        Reply
                      </Button>
                      <span className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-0 h-auto w-auto mr-1"
                        >
                          👍
                        </Button>{" "}
                        {review.likes}
                      </span>
                      <span className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-0 h-auto w-auto mr-1"
                        >
                          👎
                        </Button>{" "}
                        {review.dislikes}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#"
                className="text-purple-600 hover:text-purple-800 font-semibold flex items-center mt-6"
              >
                Show all reviews
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Details in general info tab */}
      <div className="py-5 px-10 md:px-5 w-full md:max-w-2/4">
        <div className="py-5">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Product details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-4">
            {/* General Specs */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                General specs
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span>Title:</span>
                  <span className="font-medium text-gray-900">
                    {product?.title}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span>Size:</span>
                  <span className="font-medium text-gray-900">
                    {/* {product?.size} */}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span>Variant/color:</span>
                  <span className="font-medium text-gray-900">
                    {/* {product?.variant_color} */}
                  </span>
                  <span className="text-gray-500 cursor-pointer">?</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span>Details:</span>
                  <span className="font-medium text-gray-900">
                    {product?.details}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <a
            href="#"
            className="text-purple-600 hover:text-purple-800 font-semibold flex items-center mt-6"
          >
            See all product details
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </div>
        {/* Product review in general tab */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
          <Button
            variant="outline"
            className="text-purple-600 border-purple-600 hover:bg-purple-50 hover:text-purple-700"
          >
            Leave a review
          </Button>
        </div>

        {/* Overall Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4">
            <p className="text-5xl font-bold text-gray-900">
              {reviewStats.overallRating}
            </p>
            {renderStars(Math.floor(reviewStats.overallRating), 0, "md")}
            <p className="text-sm text-gray-600 mt-1">
              {reviewStats.totalReviews} reviews
            </p>
          </div>

          {/* Star Distribution Bars */}
          <div className="col-span-2 space-y-2">
            {Object.entries(reviewStats.starDistribution)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .map(([stars, count]) => (
                <div key={stars} className="flex items-center text-sm">
                  <span className="w-4 mr-2 text-gray-700">{stars}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-2" />
                  <div className="flex-grow bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-full rounded-full"
                      style={{ width: `${(count / maxStars) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 w-8 text-right text-gray-600">
                    {count}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <Separator className="my-6 bg-gray-200" />

        {/* Individual Reviews */}
        <div className="space-y-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 mr-2">
                    {review.author}
                  </span>
                  {renderStars(review.rating, 0, "sm")}{" "}
                  {/* Small stars for individual reviews */}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {review.color && (
                  <span className="mr-2">
                    Color: <span className="font-semibold">{review.color}</span>
                  </span>
                )}
                {review.model && (
                  <span>
                    Model: <span className="font-semibold">{review.model}</span>
                  </span>
                )}
              </div>
              {review.pros && (
                <p className="text-gray-700 mb-1 flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="font-semibold mr-1">Pros:</span>{" "}
                  {review.pros}
                </p>
              )}
              {review.cons && (
                <p className="text-gray-700 mb-3 flex items-start">
                  <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="font-semibold mr-1">Cons:</span>{" "}
                  {review.cons}
                </p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-sm hover:underline"
                >
                  Reply
                </Button>
                <span className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-0 h-auto w-auto mr-1"
                  >
                    👍
                  </Button>{" "}
                  {review.likes}
                </span>
                <span className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-0 h-auto w-auto mr-1"
                  >
                    👎
                  </Button>{" "}
                  {review.dislikes}
                </span>
              </div>
            </div>
          ))}
        </div>
        <a
          href="#"
          className="text-purple-600 hover:text-purple-800 font-semibold flex items-center mt-6"
        >
          Show all reviews
          <ChevronRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
