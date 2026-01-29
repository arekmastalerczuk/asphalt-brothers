import { Metadata } from "next";
import { requireAdmin } from "@/lib/auth-guard";
import { deleteUser, getAllUsers } from "@/lib/actions/user.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteDialog from "@/components/shared/DeleteDialog";
import Pagination from "@/components/shared/Pagination";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Users",
};

type Props = {
  searchParams: Promise<{ page: string }>;
};

const AdminUsersPage = async ({ searchParams }: Props) => {
  await requireAdmin();

  const { page = "1" } = await searchParams;

  const users = await getAllUsers({ page: Number(page) });
  console.log(users.data);

  return (
    <div className="space-y-2">
      <h1 className="h2-bold">Users</h1>
      {users?.data.length === 0 && <p>No users found.</p>}
      {users?.data.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Id</TableHead>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Email</TableHead>
                <TableHead className="font-bold">Role</TableHead>
                <TableHead className="w-[100px] font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.map((user) => {
                const { id, name, email, role } = user;

                return (
                  <TableRow key={id}>
                    <TableCell>{formatId(id)}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>
                      {role === "admin" ? (
                        <Badge>Admin</Badge>
                      ) : (
                        <Badge variant="secondary">User</Badge>
                      )}
                    </TableCell>
                    <TableCell className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        title="Edit"
                        asChild
                      >
                        <Link href={`/admin/users/${id}`}>
                          <Pencil />
                        </Link>
                      </Button>
                      <DeleteDialog id={id} action={deleteUser} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {users?.totalPages > 1 && (
            <Pagination page={Number(page)} totalPages={users?.totalPages} />
          )}
        </>
      )}
    </div>
  );
};
export default AdminUsersPage;
