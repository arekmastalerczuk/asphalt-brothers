import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import ShippingAddressForm from "./ShippingAddressForm";
import { ShippingAddress } from "@/types";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect("/cart");

  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) throw new Error("No user ID");

  const user = await getUserById(userId);
  const { address } = user;

  return (
    <div>
      <ShippingAddressForm address={address as ShippingAddress} />
    </div>
  );
};
export default ShippingAddressPage;
