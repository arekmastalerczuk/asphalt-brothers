import * as z from "zod";
import { formatNumberWithDecimal } from "./utils";
import { PAYMENT_METHODS } from "./constants";

// helper function for currency validation
const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places",
  );

// schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  price: currency,
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
});

// schema for signing users in
export const signInFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// schema for signing up a users
export const signUpFormSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
    name: z.string().min(3, "Name must be at least 3 characters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

// --- Cart Schemas ---
// Cart item schema
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Product slug is required"),
  quantity: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "Product image is required"),
  price: currency,
});

// Cart schema
export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  taxPrice: currency,
  shippingPrice: currency,
  totalPrice: currency,
  sessionCartId: z.string().min(1, "Session cart ID is required"),
  userId: z.string().optional().nullable(),
});

// Shipping address schema
export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  streetAddress: z.string().min(3, "Address must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
  country: z.string().min(3, "Country must be at least 3 characters"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// Schema for payment method
export const paymentMethodSchema = z.object({
  type: z
    .string()
    .min(1, "Payment method is required")
    .refine((data) => PAYMENT_METHODS.includes(data), {
      message: "Invalid payment method",
      path: ["type"],
    }),
});

// Schema for inserting order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  shippingAddress: shippingAddressSchema,
  paymentMethod: z
    .string()
    .refine((data) => PAYMENT_METHODS.includes(data), "Invalid payment method"),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
});

// Schema for inserting an order item
export const insertOrderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().nonnegative("Quantity must be a positive number"),
  price: currency,
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Product slug is required"),
  image: z.string().min(1, "Product image is required"),
});
