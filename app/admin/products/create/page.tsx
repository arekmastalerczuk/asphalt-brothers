import { Metadata } from "next";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = {
  title: "Create Product",
};

const CreateProduct = () => {
  return (
    <>
      <h1 className="h2-bold">Create Product</h1>
      <div className="my-8">
        <ProductForm type="create" />
      </div>
    </>
  );
};
export default CreateProduct;
