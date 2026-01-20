import { requireAdmin } from "@/lib/auth-guard";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  await requireAdmin();

  redirect("/admin/overview");
};
export default AdminPage;
