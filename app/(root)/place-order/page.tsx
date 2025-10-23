import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { ShippingAddress } from "@/types";
import CheckoutSteps from "@/components/shared/CheckoutSteps";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import PlaceOrderForm from "./PlaceOrderForm";

export const metadata: Metadata = {
  title: "Place Order",
};

const PlaceOrderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) redirect("/cart");
  if (!user.address) redirect("/shipping-address");
  if (!user.paymentMethod) redirect("/payment-method");

  const userAddress = user.address as ShippingAddress;
  const { fullName, streetAddress, city, postalCode, country } = userAddress;

  return (
    <>
      <CheckoutSteps current={3} />
      <h1 className="h2-bold py-4">Place Order</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-3 overflow-x-auto md:col-span-2">
          <Card>
            <CardContent>
              <h2 className="pb-4 text-xl">Shipping Address</h2>
              <p>{fullName}</p>
              <p>
                {streetAddress}, {city} {postalCode}, {country}
              </p>
              <div className="mt-3">
                <Link href="/shipping-address">
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="pb-4 text-xl">Payment Method</h2>
              <p>{user.paymentMethod}</p>
              <div className="mt-3">
                <Link href="/payment-method">
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
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
                  {cart.items.map((item) => (
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
                <p>{formatCurrency(cart.itemsPrice)}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p>{formatCurrency(cart.taxPrice)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>{formatCurrency(cart.shippingPrice)}</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>{formatCurrency(cart.totalPrice)}</p>
              </div>
              <PlaceOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default PlaceOrderPage;
