import { updateOrderToPaid } from "@/lib/actions/order.actions";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/db/prisma";

export async function POST(req: NextRequest) {
  // Build the webhook event
  const event = await Stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  // Check for successful payment
  if (event.type === "charge.succeeded") {
    const { object } = event.data;
    const orderId = object.metadata.objectId;

    // Check if order exists and is already paid to prevent duplicate processing
    const order = await prisma.order.findFirst({
      where: { id: orderId },
      select: { isPaid: true, paymentResult: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.isPaid) {
      return NextResponse.json({
        message: "Order already processed - duplicate webhook",
        orderId,
      });
    }

    // Update order status
    await updateOrderToPaid({
      orderId,
      paymentResult: {
        id: object.id,
        status: "COMPLETED",
        email_address: object.billing_details.email!,
        pricePaid: (object.amount / 100).toFixed(),
      },
    });

    return NextResponse.json({
      message: "updateOrderToPaid was successful",
    });
  }

  return NextResponse.json({
    message: "Event is not charge.succeeded",
  });
}
