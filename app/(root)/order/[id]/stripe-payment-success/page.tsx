import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";
import { getOrderById } from "@/lib/actions/order.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment_intent: string }>;
};

const SuccessPage = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { payment_intent: paymentIntentId } = await searchParams;

  // Fetch order
  const order = await getOrderById(id);
  if (!order) notFound();

  // Retrieve payment intent
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  // Check if payment intent is valid
  if (
    paymentIntent.metadata.orderId == null ||
    paymentIntent.metadata.orderId !== order.id.toString()
  )
    notFound();

  // Check if payment intent is success
  const isSuccess = paymentIntent.status === "succeeded";

  if (!isSuccess) redirect(`/order/${order.id}`);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      <div className="mt-8 flex flex-col items-center gap-8">
        <h1 className="h1-bold">Thanks for your purchase</h1>
        <p>We are processing your order.</p>
        <Button asChild>
          <Link href={`/order/${order.id}`}>View Order</Link>
        </Button>
      </div>
    </div>
  );
};
export default SuccessPage;
