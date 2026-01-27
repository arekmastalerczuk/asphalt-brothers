import { Metadata } from "next";
import { getProductById } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth-guard";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = {
  title: "Update Product",
};

type Props = {
  params: Promise<{ id: string }>;
};

const AdminProductUpdatePage = async ({ params }: Props) => {
  await requireAdmin();

  const { id } = await params;

  const product = await getProductById(id);

  if (!product) return notFound();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-y-8">
      <h1 className="h2-bold">Update Product</h1>
      <ProductForm type="update" product={product} productId={product.id} />
    </div>
  );
};
export default AdminProductUpdatePage;
