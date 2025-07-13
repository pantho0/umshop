"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import UMForm from "@/components/UMForm/UMForm";
import { UMInput } from "@/components/UMForm/UMInput";
import UmSelect from "@/components/UMForm/UmSelect";
import { uploadSingleImage } from "@/services/product";
import Image from "next/image";

const variantSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  color: z.string().min(1, "Color is required"),
  size: z.string().min(1, "Size is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  stock: z.number().min(0, "Stock cannot be negative").int(),
});

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  parentCategory: z.string().min(1, "Parent category is required"),
  subCategory: z.string().min(1, "Sub-category is required"),
  details: z.string().min(1, "Product details are required"),
  images: z
    .string()
    .url("Please enter a valid URL")
    .array()
    .min(1, "At least one image is required"),
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
});

type Variant = z.infer<typeof variantSchema>;

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function AddProduct() {
  const [images, setImages] = useState<string[]>([]);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [selectedParentCategory, setSelectedParentCategory] =
    useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      parentCategory: "",
      subCategory: "",
      details: "",
      images: [],
      variants: [
        {
          sku: "",
          color: "",
          size: "",
          price: 0,
          stock: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Ref for file input to clear it after upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const image = await convertBase64(file);
      console.log(image);
      const res = await uploadSingleImage(image as string);
      console.log(res);
      setImages((prev) => [...prev, res]);
      toast.success("Image uploaded successfully");
      // Clear the file input after upload
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  // Remove image by index
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Fetch Parent Categories on component mount
  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/parent-categories/`
        );
        const data = await response.json();
        if (data.success) {
          setParentCategories(data.data);
        } else {
          toast.error(data.message || "Failed to fetch parent categories");
        }
      } catch (error) {
        console.error("Error fetching parent categories:", error);
        toast.error("Error fetching parent categories");
      }
    };
    fetchParentCategories();
  }, []);

  // Fetch Subcategories when selectedParentCategory changes
  useEffect(() => {
    if (selectedParentCategory) {
      const fetchSubCategories = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sub-categories/${selectedParentCategory}`
          );
          const data = await response.json();
          if (data.success) {
            setSubCategories(data.data);
          } else {
            toast.error(data.message || "Failed to fetch subcategories");
          }
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          toast.error("Error fetching subcategories");
        }
      };
      fetchSubCategories();
    } else {
      setSubCategories([]); // Clear subcategories if no parent is selected
    }
  }, [selectedParentCategory]);

  const addVariant = () => {
    append({
      sku: "",
      color: "",
      size: "",
      price: 0,
      stock: 0,
    });
  };

  const removeVariant = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast.error("At least one variant is required");
    }
  };

  const handleParentCategoryChange = (value: string) => {
    setSelectedParentCategory(value);
    form.setValue("parentCategory", value);
    form.setValue("subCategory", ""); // Reset subcategory when parent changes
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
    toast.success("Product added successfully!");
    // Here you would typically make an API call to save the product
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <UMForm onSubmit={onSubmit}>
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <UMInput
                    label="Title"
                    name="title"
                    type="text"
                    placeholder="Product Title"
                  />
                </div>
                <div>
                  <UmSelect
                    label="Parent Category"
                    name="parentCategory"
                    defaultValue="__placeholder__"
                    options={[
                      {
                        value: "__placeholder__",
                        label: "Select Parent Category",
                      },
                      ...parentCategories.map((cat) => ({
                        value: cat._id,
                        label: cat.name,
                      })),
                    ]}
                    onValueChange={handleParentCategoryChange}
                  />
                </div>
                <div>
                  <UmSelect
                    label="Sub Category"
                    name="subCategory"
                    defaultValue="__placeholder__"
                    options={[
                      {
                        value: "__placeholder__",
                        label: "Select Sub Category",
                      },
                      ...subCategories.map((cat) => ({
                        value: cat._id,
                        label: cat.name,
                      })),
                    ]}
                    disabled={!selectedParentCategory}
                  />
                </div>
              </div>
            </div>

            <div className="my-4">
              <UMInput
                label="Details"
                name="details"
                type="text"
                placeholder="Product Details"
              />
            </div>
            <div>
              {/* Uploaded Images Preview */}
              {images.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    flexWrap: "wrap",
                    marginTop: 16,
                  }}
                >
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <Image
                        src={
                          typeof img === "string"
                            ? img
                            : img.secure_url || img.url || img
                        }
                        alt={`uploaded-${idx}`}
                        width={100}
                        height={100}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "1px solid #eee",
                        }}
                      />
                      <button
                        type="button"
                        style={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          background: "rgba(255,255,255,0.8)",
                          border: "none",
                          borderRadius: "50%",
                          cursor: "pointer",
                          padding: 4,
                        }}
                        onClick={() => removeImage(idx)}
                        aria-label="Remove image"
                      >
                        <Trash2 size={16} color="#d32f2f" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Product Images */}
            <div className="my-4">
              <div className="">
                <Input type="file" onChange={uploadImage} ref={fileInputRef} />
              </div>
            </div>

            {/* Product Variants */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Product Variants</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addVariant}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Variant
                </Button>
              </div>

              <div className="space-y-6">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Variant {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVariant(index)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <UMInput
                        label="SKU"
                        name={`variants.${index}.sku`}
                        type="text"
                        placeholder="Enter SKU"
                        {...field}
                      />

                      <UMInput
                        label="Color"
                        name={`variants.${index}.color`}
                        type="text"
                        placeholder="Enter color"
                        {...field}
                      />
                      <UMInput
                        label="Size"
                        name={`variants.${index}.size`}
                        type="text"
                        placeholder="Enter size"
                        {...field}
                      />
                      <UMInput
                        label="Price"
                        name={`variants.${index}.price`}
                        type="number"
                        placeholder="Enter price"
                        {...field}
                      />
                      <UMInput
                        label="Stock"
                        name={`variants.${index}.stock`}
                        type="number"
                        placeholder="Enter stock"
                        {...field}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full mt-6">
              Add Product
            </Button>
          </UMForm>
        </CardContent>
      </Card>
    </div>
  );
}
