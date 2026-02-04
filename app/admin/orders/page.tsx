import { Metadata } from "next";
import Link from "next/link";
import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteDialog from "@/components/shared/DeleteDialog";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { getAllOrders, deleteOrder } from "@/lib/actions/order.actions";
import { requireAdmin } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: "Admin Orders",
};

type Props = {
  searchParams: Promise<{ page: string; query: string }>;
};

const AdminOrdersPage = async (props: Props) => {
  await requireAdmin();

  const { page = "1", query = "" } = await props.searchParams;

  const orders = await getAllOrders({ page: Number(page), query });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h1 className="h2-bold">Admin Orders</h1>
        {query && (
          <div className="flex items-center gap-x-3">
            <p className="text-sm">
              Filtered by <span className="italic">&quot;{query}&quot;</span>
            </p>

            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/orders">Remove filter</Link>
            </Button>
          </div>
        )}
      </div>
      {orders?.data.length > 0 && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted-foreground group">
                <TableHead className="text-primary-foreground group-hover:text-primary rounded-tl-md text-lg font-bold transition-colors duration-300">
                  ID
                </TableHead>
                <TableHead className="text-primary-foreground group-hover:text-primary text-lg font-bold transition-colors duration-300">
                  Buyer
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
              {orders?.data?.map((order) => {
                const {
                  id,
                  user,
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
                    <TableCell>{user.name}</TableCell>
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
                    <TableCell className="flex items-center justify-center space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/order/${id}`}
                          className="flex items-center gap-2"
                        >
                          Details <Eye className="size-5" />
                        </Link>
                      </Button>
                      <DeleteDialog id={id} action={deleteOrder} />
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
      )}
      {orders?.data.length === 0 && <p>No orders found.</p>}
    </div>
  );
};
export default AdminOrdersPage;
