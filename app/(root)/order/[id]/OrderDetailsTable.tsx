"use client";

import Link from "next/link";
import Image from "next/image";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Order } from "@/types";
import {
  createPaypalOrder,
  approvePaypalOrder,
} from "@/lib/actions/order.actions";
import { toast } from "sonner";

type Props = {
  order: Order;
  paypalClientId: string;
};

const OrderDetailsTable = ({ order, paypalClientId }: Props) => {
  const {
    id,
    shippingAddress,
    orderitems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let status;

    if (isPending) {
      status = "Loading PayPal...";
    } else if (isRejected) {
      status = "Error loading PayPal";
    }

    return status;
  };

  const handleCreatePaypalOrder = async () => {
    const response = await createPaypalOrder(id);
    if (!response.success) {
      toast.error(response.message);
    }

    return response.data;
  };

  const handleApprovePaypalOrder = async (data: { orderID: string }) => {
    const response = await approvePaypalOrder(id, {
      paypalOrderId: data.orderID,
    });

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <h1 className="h2-bold my-4">Order {formatId(id)}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          <Card>
            <CardContent className="gap-4 p-4">
              <h2 className="pb-4 text-xl">Payment Method</h2>
              <p className="mb-4">{paymentMethod}</p>
              {isPaid ? (
                <Badge variant="secondary">
                  Paid at: {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Paid</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="gap-4 p-4">
              <h2 className="pb-4 text-xl">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p className="mb-4">
                {shippingAddress.streetAddress}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge variant="secondary">
                  Delivered at: {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Delivered</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="gap-4 p-4">
              <h2 className="pb-4 text-xl">Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderitems.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatCurrency(item.price)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4 overflow-x-auto md:col-span-1">
          <Card>
            <CardContent className="gap-4 space-y-4 p-4">
              <h2 className="pb-4 text-xl">Costs</h2>
              <div className="flex justify-between">
                <p>Items</p>
                <p>{formatCurrency(itemsPrice)}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p>{formatCurrency(taxPrice)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>{formatCurrency(shippingPrice)}</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>{formatCurrency(totalPrice)}</p>
              </div>
              {/* PayPal payment */}
              {!isPaid && paymentMethod === "PayPal" && (
                <div>
                  <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <PrintLoadingState />
                    <PayPalButtons
                      createOrder={handleCreatePaypalOrder}
                      onApprove={handleApprovePaypalOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default OrderDetailsTable;
