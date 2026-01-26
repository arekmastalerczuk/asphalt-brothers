"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { toast } from "sonner";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { Product } from "@/types";
import { productDefaultValues } from "@/lib/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { UploadButton } from "@/lib/uploadthing";

type Props = {
  type: "create" | "update";
  product?: Product;
  productId?: string;
};

const ProductForm = ({ type, product, productId }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(
      type === "update" ? updateProductSchema : insertProductSchema,
    ),
    defaultValues:
      product && type === "update" ? product : productDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    values,
  ) => {
    // On Create
    if (type === "create") {
      const res = await createProduct(values);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      router.push("/admin/products");
    }

    // On Update
    if (type === "update") {
      if (!productId) {
        router.push("/admin/products");
        return;
      }

      const res = await updateProduct({
        ...values,
        id: productId,
      });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      router.push("/admin/products");
    }
  };

  const images = form.watch("images");

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex flex-col items-start gap-5 md:flex-row">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "name"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "slug"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter slug" {...field} />
                    <Button
                      type="button"
                      className="mt-2 bg-gray-500 transition-colors duration-300 hover:bg-gray-600"
                      onClick={() => {
                        form.setValue(
                          "slug",
                          slugify(form.getValues("name"), {
                            lower: true,
                          }),
                        );
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "category"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Brand */}
          <FormField
            control={form.control}
            name="brand"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "brand"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "price"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    step="0.01"
                    min={0}
                    type="number"
                    placeholder="Enter price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Stock */}
          <FormField
            control={form.control}
            name="stock"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "stock"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" min={0} step={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="upload-field flex flex-col gap-5 md:flex-row">
          {/* Images */}
          <FormField
            name="images"
            control={form.control}
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <Card className="rounded-md">
                  <CardContent className="mt-2 flex min-h-48 items-start space-y-2">
                    <div className="flex space-x-2">
                      {images.map((image) => (
                        <div key={image} className="overflow-hidden rounded-sm">
                          <Image
                            alt="product image"
                            width={80}
                            height={80}
                            src={image}
                            className="size-20 object-cover object-center transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                    <FormControl className="ml-4">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res: { url: string }[]) => {
                          form.setValue("images", [...images, res[0].url]);
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(error.message);
                        }}
                      />
                    </FormControl>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="upload-field">{/* isFeatured */}</div>
        <div>
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "description"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "Submitting..."
            : `${type === "create" ? "Create" : "Update"} product`}
        </Button>
      </form>
    </Form>
  );
};
export default ProductForm;
