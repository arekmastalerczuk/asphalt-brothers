import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/actions/order.actions";

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

  return <div>OrderDetailsPage</div>;
};
export default OrderDetailsPage;
