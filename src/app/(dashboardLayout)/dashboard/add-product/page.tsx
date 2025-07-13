"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
    
  FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import UMForm from "@/components/UMForm/UMForm";
import { UMInput } from "@/components/UMForm/UMInput";

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

export default function AddProduct() {
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

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

  const addImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageUrl = (index: number) => {
    if (imageUrls.length > 1) {
      const newImageUrls = [...imageUrls];
      newImageUrls.splice(index, 1);
      setImageUrls(newImageUrls);
      form.setValue(
        "images",
        form.getValues("images").filter((_, i) => i !== index)
      );
    } else {
      toast.error("At least one image is required");
    }
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
                  <UMInput
                    label="Parent Category ID"
                    name="parentCategory"
                    type="text"
                    placeholder="Parent Category ID"
                  />
                </div>
                <div>
                  <UMInput
                    label="Sub Category"
                    name="subCategory"
                    type="text"
                    placeholder="Sub Category ID"
                  />
                </div>
              </div>

              <div>
                <UMInput
                  label="Details"
                  name="details"
                  type="text"
                  placeholder="Product Details"
                />
              </div>
            </div>

            {/* Product Images */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Product Images</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addImageUrl}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Image
                </Button>
              </div>
              <div className="space-y-4">
                {imageUrls.map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`images.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Enter image URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImageUrl(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
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
};