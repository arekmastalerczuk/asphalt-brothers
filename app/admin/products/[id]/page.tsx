import { Metadata } from "next";
import { getProductById } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = {
  title: "Update Product",
};

type Props = {
  params: {
    id: string;
  };
};

const AdminProductUpdatePage = async ({ params }: Props) => {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) return notFound();

  return (
    <div className="mx-auto max-w-5xl gap-y-8">
      <h1 className="font-bold">Update Product</h1>
      <ProductForm type="update" product={product} productId={product.id} />
    </div>
  );
};
export default AdminProductUpdatePage;
