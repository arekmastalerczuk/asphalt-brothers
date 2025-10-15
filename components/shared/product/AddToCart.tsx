"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Plus, Minus, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cart, CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";

type Props = {
  item: CartItem;
  cart?: Cart;
};
const AddToCart = ({ item, cart }: Props) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      // Handle success add to cart
      toast.success(res.message, {
        action: {
          label: "Go to Cart",
          onClick: () => router.push("/cart"),
        },
      });
      return;
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      // Handle success remove from cart
      toast.success(res.message, {
        action: {
          label: "Go to Cart",
          onClick: () => router.push("/cart"),
        },
      });
      return;
    });
  };

  // Check if item is in the cart
  const existItem =
    cart && cart.items.find((i) => i.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          <Minus className="size-4" />
        )}
      </Button>
      <span className="px-2">{existItem.quantity}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          <Plus className="size-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <Plus className="size-4" />
      )}
      Add to Cart
    </Button>
  );
};
export default AddToCart;
