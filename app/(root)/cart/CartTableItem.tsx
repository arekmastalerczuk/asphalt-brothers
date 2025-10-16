"use client";

import Link from "next/link";
import Image from "next/image";
import { useTransition } from "react";
import { Loader, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { formatCurrency } from "@/lib/utils";

type Props = { item: CartItem };

const CartTableItem = ({ item }: Props) => {
  const { productId, name, price, quantity, image, slug } = item;
  const [isPending, startTransition] = useTransition();

  return (
    <TableRow>
      <TableCell>
        <Link href={`/product/${slug}`} className="flex items-center gap-2">
          <Image
            src={image}
            alt={name}
            width={50}
            height={50}
            className="object-contain"
            priority
          />
          <span>{name}</span>
        </Link>
      </TableCell>
      <TableCell className="text-center">
        <Button
          disabled={isPending}
          variant="outline"
          type="button"
          onClick={() =>
            startTransition(async () => {
              const res = await removeItemFromCart(productId);
              if (!res.success) {
                toast.error(res.message);
              }
            })
          }
        >
          {isPending ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            <Minus className="size-4" />
          )}
        </Button>
        <span className="mx-2">{quantity}</span>
        <Button
          disabled={isPending}
          variant="outline"
          type="button"
          onClick={() =>
            startTransition(async () => {
              const res = await addItemToCart(item);
              if (!res.success) {
                toast.error(res.message);
              }
            })
          }
        >
          {isPending ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            <Plus className="size-4" />
          )}
        </Button>
      </TableCell>
      <TableCell className="text-right">{formatCurrency(price)}</TableCell>
    </TableRow>
  );
};
export default CartTableItem;
