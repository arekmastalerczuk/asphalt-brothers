import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cart } from "@/types";
import CartTableItems from "./CartTableItems";

type Props = {
  cart?: Cart;
};

const CartTable = ({ cart }: Props) => {
  return (
    <>
      {!cart || cart.items.length === 0 ? (
        <div>
          <span>Cart is empty. </span>
          <Button variant="link" className="p-1 text-base" asChild>
            <Link href="/">Continue shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto md:col-span-3">
          <CartTableItems cart={cart} />
        </div>
      )}
    </>
  );
};
export default CartTable;
