import {
  Body,
  Container,
  Head,
  Html,
  Heading,
  Preview,
  Section,
  Tailwind,
  Row,
  Column,
  Text,
  Img,
} from "@react-email/components";
import { Order } from "@/types";
import { cn, formatCurrency, formatDateTime } from "@/lib/utils";
import sampleData from "@/db/sample-data";
import { randomUUID } from "crypto";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

PurchaseReceiptEmail.PreviewProps = {
  order: {
    id: randomUUID(),
    userId: "12345",
    user: {
      name: "John Doe",
      email: "test@example.com",
    },
    paymentMethod: "Stripe",
    shippingAddress: {
      fullName: "John Doe",
      streetAddress: "123 Test St",
      city: "Oklahoma City",
      postalCode: "11222",
      country: "US",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    totalPrice: "100",
    taxPrice: "10",
    shippingPrice: "10",
    itemsPrice: "80",
    orderitems: sampleData.products.map((product) => ({
      name: product.name,
      orderId: "123",
      productId: "456",
      slug: product.slug,
      quantity: product.stock,
      image: product.images[0],
      price: product.price.toString(),
    })),
    isDelivered: true,
    deliveredAt: new Date(),
    isPaid: true,
    paidAt: new Date(),
    paymentResult: {
      id: "123",
      status: "succeeded",
      pricePaid: "100",
      email_address: "test@example.com",
    },
  },
} satisfies OrderInformationProps;

type OrderInformationProps = { order: Order };

export default function PurchaseReceiptEmail({ order }: OrderInformationProps) {
  return (
    <Html>
      <Preview>View order receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="bg-white font-sans">
          <Container className="max-w-3xl">
            <Heading className="text-2xl">Purchase Receipt</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className="mr-4 text-nowrap whitespace-nowrap text-gray-500">
                    Order ID
                  </Text>
                  <Text className="mr4">{order.id.toString()}</Text>
                </Column>
                <Column>
                  <Text className="mr-4 text-nowrap whitespace-nowrap text-gray-500">
                    Purchase Date
                  </Text>
                  <Text className="mr-4 font-bold">
                    {formatDateTime(order.createdAt).dateOnly}
                  </Text>
                </Column>
                <Column>
                  <Text className="mr-4 text-nowrap whitespace-nowrap text-gray-500">
                    Price Paid
                  </Text>
                  <Text className="mr-4">
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className="my-8 rounded-lg border border-solid border-gray-500 p-4 md:p-6">
              {order.orderitems.map((item) => {
                const { productId, quantity, price, name, image } = item;

                return (
                  <Row key={productId} className="mt-4">
                    <Column className="w-20">
                      <Img
                        src={
                          image.startsWith("/")
                            ? `http://localhost:3000${image}`
                            : `${process.env.NEXT_PUBLIC_APP_URL}${image}`
                        }
                        alt={name}
                        width={80}
                        height={80}
                        className="mr-4 object-contain pl-2"
                      />
                    </Column>
                    <Column>
                      <Text>
                        {name} (x {quantity})
                      </Text>
                    </Column>
                    <Column align="right" className="pr-4">
                      <Text>{formatCurrency(price)}</Text>
                    </Column>
                  </Row>
                );
              })}
              <Row>
                <Column className="w-full">
                  <div className="my-4 border-t border-gray-300" />
                </Column>
              </Row>
              {[
                { name: "Items", price: order.itemsPrice },
                { name: "Tax", price: order.taxPrice },
                { name: "Shipping", price: order.shippingPrice },
                { name: "Total", price: order.totalPrice },
              ].map(({ name, price }) => (
                <Row key={name} className="">
                  <Column
                    align="right"
                    className={cn(name === "Total" && "font-bold")}
                  >
                    <Text>{name}:</Text>
                  </Column>
                  <Column align="right" width={90} className="pr-4 align-top">
                    <Text className={cn("", name === "Total" && "font-bold")}>
                      {formatCurrency(price)}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
