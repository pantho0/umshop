"use client";

import { useEffect, useState } from "react";
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
import UmSelect from "@/components/UMForm/UmSelect";

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
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
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
                      { value: "__placeholder__", label: "Select Parent Category" },
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
                      { value: "__placeholder__", label: "Select Sub Category" },
                      ...subCategories.map((cat) => ({
                        value: cat._id,
                        label: cat.name,
                      })),
                    ]}
                    disabled={!selectedParentCategory}
                  />
                </div>
              </div>
              <div>
                <UmSelect
                  label="Sub Category"
                  name="subCategory"
                  defaultValue=""
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
}
