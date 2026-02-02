import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllProducts, deleteProduct } from "@/lib/actions/product.actions";
import { formatCurrency, formatId } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/shared/Pagination";
import DeleteDialog from "@/components/shared/DeleteDialog";
import { Pencil } from "lucide-react";
import { requireAdmin } from "@/lib/auth-guard";

type Props = {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
    limit: string;
  }>;
};

const AdminProducts = async (props: Props) => {
  await requireAdmin();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const query = searchParams.query || "";
  const category = searchParams.category || "";

  const products = await getAllProducts({
    query,
    page,
    category,
  });

  return (
    <>
      <div className="flex-between">
        <div className="flex items-center gap-4">
          <h1 className="h2-bold">Products</h1>
          {query && (
            <div className="flex items-center gap-x-3">
              <p className="text-sm">
                Filtered by <span className="italic">&quot;{query}&quot;</span>
              </p>

              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/products">Remove filter</Link>
              </Button>
            </div>
          )}
        </div>
        <Button asChild>
          <Link href="/admin/products/create">+ Create Product</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">ID</TableHead>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="text-right font-bold">Price</TableHead>
            <TableHead className="font-bold">Category</TableHead>
            <TableHead className="font-bold">Stock</TableHead>
            <TableHead className="font-bold">Rating</TableHead>
            <TableHead className="w-[100px] font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.data.map((product) => {
            const { id, name, price, category, stock, rating } = product;

            return (
              <TableRow key={id}>
                <TableCell>{formatId(id)}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(price)}
                </TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{stock}</TableCell>
                <TableCell>{rating}</TableCell>
                <TableCell className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    title="Edit"
                    asChild
                  >
                    <Link href={`/admin/products/${id}`}>
                      <Pencil />
                    </Link>
                  </Button>
                  <DeleteDialog id={id} action={deleteProduct} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {products?.totalPages > 1 && (
        <Pagination page={page} totalPages={products.totalPages} />
      )}
    </>
  );
};
export default AdminProducts;
