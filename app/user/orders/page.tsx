import { Metadata } from "next";
import Link from "next/link";
import { Eye } from "lucide-react";
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
import Pagination from "@/components/shared/Pagination";

export const metadata: Metadata = {
  title: "My Orders",
};

type Props = {
  searchParams: Promise<{ page: string }>;
};

const Orders = async (props: Props) => {
  const { page } = await props.searchParams;

  const orders = await getMyOrders({ page: Number(page) || 1 });

  return (
    <div className="space-y-4">
      <h1 className="h2-bold">My Orders</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted-foreground group">
              <TableHead className="text-primary-foreground group-hover:text-primary rounded-tl-md text-lg font-bold transition-colors duration-300">
                ID
              </TableHead>
              <TableHead className="text-primary-foreground group-hover:text-primary text-lg font-bold transition-colors duration-300">
                Date
              </TableHead>
              <TableHead className="text-primary-foreground group-hover:text-primary text-lg font-bold transition-colors duration-300">
                Total
              </TableHead>
              <TableHead className="text-primary-foreground group-hover:text-primary text-lg font-bold transition-colors duration-300">
                Paid
              </TableHead>
              <TableHead className="text-primary-foreground group-hover:text-primary text-lg font-bold transition-colors duration-300">
                Delivered
              </TableHead>
              <TableHead className="text-primary-foreground group-hover:text-primary rounded-tr-md text-lg font-bold transition-colors duration-300">
                Actions
              </TableHead>
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
                    <Link
                      href={`/order/${id}`}
                      className="flex items-center gap-2"
                    >
                      Details <Eye className="size-5" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {orders &&
          typeof orders.totalPages === "number" &&
          orders.totalPages > 1 && (
            <Pagination
              page={Number(page) || 1}
              totalPages={orders?.totalPages}
            />
          )}
      </div>
    </div>
  );
};
export default Orders;
