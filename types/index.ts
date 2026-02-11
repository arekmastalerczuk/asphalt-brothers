import * as z from "zod";
import {
  insertProductSchema,
  cartItemSchema,
  insertCartSchema,
  shippingAddressSchema,
  paymentMethodSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  paypalPaymentResultSchema,
  updateUserProfileSchema,
  updateProductSchema,
  createReviewSchema,
} from "../lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProduct = z.infer<typeof insertProductSchema>;

export type UpdateProduct = z.infer<typeof updateProductSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;

export type Cart = z.infer<typeof insertCartSchema>;

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;

export type OrderItem = z.infer<typeof insertOrderItemSchema>;

export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  orderitems: OrderItem[];
  user: { name: string; email: string };
};

export type PaymentResult = z.infer<typeof paypalPaymentResultSchema>;

export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;

export type Review = z.infer<typeof createReviewSchema> & {
  id: string;
  isVerifiedPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: { name: string };
};
