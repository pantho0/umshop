import { z } from "zod";

// Helper to validate MongoDB ObjectId
const objectIdSchema = z.string();

// Schema for the Variant
const variantSchema = z.object({
  sku: z.string(),
  color: z.array(z.string()),
  size: z.string(),
  price: z.number().nonnegative("Price must be a non-negative number"),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
});

// Main Product Schema
export const addProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  parentCategory: objectIdSchema,
  subCategory: objectIdSchema,
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
  slug: z.string().optional(),
  details: z.string().min(1, "Details are required"),
  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .min(1, "At least one image is required"),
});
