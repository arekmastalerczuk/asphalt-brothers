import { Metadata } from "next";
import Link from "next/link";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { getMyOrders } from "@/lib/actions/order.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "My Orders",
};

const Orders = async (props: { searchParams: Promise<{ page: string }> }) => {
  const { page } = await props.searchParams;
  const orders = await getMyOrders({ page: Number(page) || 1 });

  return (
    <div className="space-y-4">
      <h2 className="h2-bold">My Orders</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">ID</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Total</TableHead>
              <TableHead className="font-bold">Paid</TableHead>
              <TableHead className="font-bold">Delivered</TableHead>
              <TableHead className="font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data?.map((order) => {
              const {
                id,
                createdAt,
                totalPrice,
                isPaid,
                paidAt,
                isDelivered,
                deliveredAt,
              } = order;

              return (
                <TableRow key={id}>
                  <TableCell>{formatId(id)}</TableCell>
                  <TableCell>{formatDateTime(createdAt).dateTime}</TableCell>
                  <TableCell>{formatCurrency(totalPrice)}</TableCell>
                  <TableCell>
                    {isPaid && paidAt
                      ? formatDateTime(paidAt).dateTime
                      : "Not paid"}
                  </TableCell>
                  <TableCell>
                    {isDelivered && deliveredAt
                      ? formatDateTime(deliveredAt).dateTime
                      : "Not delivered"}
                  </TableCell>
                  <TableCell>
                    <Link href={`/order/${id}`}>View</Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Orders;
