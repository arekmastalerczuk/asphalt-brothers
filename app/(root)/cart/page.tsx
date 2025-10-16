import { getMyCart } from "@/lib/actions/cart.actions";
import CartTable from "./CartTable";
import CartSubtotal from "./CartSubtotal";

export const metadata = {
  title: "Shopping Cart",
};

const CartPage = async () => {
  const cart = await getMyCart();

  return (
    <>
      <h1 className="h2-bold py-4">Shopping Cart</h1>
      <div className="grid gap-y-8 md:grid-cols-4 md:gap-x-8">
        <CartTable cart={cart} />
        <CartSubtotal cart={cart} />
      </div>
    </>
  );
};
export default CartPage;
