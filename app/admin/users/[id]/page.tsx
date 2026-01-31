import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import { requireAdmin } from "@/lib/auth-guard";
import UpdateUserForm from "./UpdateUserForm";

export const metadata: Metadata = {
  title: "Update User",
};

type Props = {
  params: Promise<{ id: string }>;
};

const AdminUpdateUserPage = async ({ params }: Props) => {
  await requireAdmin();
  const { id } = await params;

  const user = await getUserById(id);
  if (!user) notFound();

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <h1 className="h2-bold">Update User</h1>
      <UpdateUserForm user={user} />
    </div>
  );
};
export default AdminUpdateUserPage;
