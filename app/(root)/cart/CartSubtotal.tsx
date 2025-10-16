"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Cart } from "@/types";
import { ArrowRight, Loader } from "lucide-react";

type Props = {
  cart?: Cart;
};

const CartSubtotal = ({ cart }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (!cart || cart.items.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="gap-4 p-4">
        <p className="pb-3 text-lg">
          Subtotal ({cart.items.reduce((acc, curr) => acc + curr.quantity, 0)}):{" "}
          <span className="ml-1 text-lg font-bold">
            {formatCurrency(cart.itemsPrice)}
          </span>
        </p>
        <Button
          className="w-full"
          disabled={isPending}
          onClick={() => {
            startTransition(() => router.push("/shipping-address"));
          }}
        >
          {isPending ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
          <span className="md:hidden lg:inline">Proceed to Checkout</span>
          <span className="hidden md:inline lg:hidden">Checkout</span>
        </Button>
      </CardContent>
    </Card>
  );
};
export default CartSubtotal;
