import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/actions/order.actions";
import OrderDetailsTable from "./OrderDetailsTable";
import { ShippingAddress } from "@/types";

export const metadata: Metadata = {
  title: "Order Details",
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const OrderDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) notFound();

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
    />
  );
};
export default OrderDetailsPage;
