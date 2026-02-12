import { Metadata } from "next";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { auth } from "@/auth";
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

  const session = await auth();

  let client_secret = null;

  // Check if order is not paid and using stripe
  if (!order.isPaid && order.paymentMethod === "Stripe") {
    // Init Stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "usd",
      metadata: { orderId: order.id },
    });

    client_secret = paymentIntent.client_secret;
  }

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
      stripeClientSecret={client_secret}
      isAdmin={session?.user?.role === "admin" || false}
    />
  );
};
export default OrderDetailsPage;
