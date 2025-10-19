import * as z from "zod";
import {
  insertProductSchema,
  cartItemSchema,
  insertCartSchema,
  shippingAddressSchema,
} from "../lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CartItem = z.infer<typeof cartItemSchema>;

export type Cart = z.infer<typeof insertCartSchema>;

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
