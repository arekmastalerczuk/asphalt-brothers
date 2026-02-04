"use server";

import { UTApi } from "uploadthing/server";
import { convertToPlainObject, formatErrors } from "../utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";
import { prisma } from "@/db/prisma";
import { Prisma } from "../generated/prisma";
import { revalidatePath } from "next/cache";
import { CreateProduct, UpdateProduct } from "@/types";
import { insertProductSchema, updateProductSchema } from "../validators";

// Get latest products
export async function getLatestProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: LATEST_PRODUCTS_LIMIT,
  });

  return convertToPlainObject(products);
}

//  Get single product by it's slug
export async function getProductBySlug(slug: string) {
  const foundProduct = await prisma.product.findFirst({
    where: {
      slug,
    },
  });

  return convertToPlainObject(foundProduct);
}

// Get single product by it's ID
export async function getProductById(productId: string) {
  const foundProduct = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });

  return convertToPlainObject(foundProduct);
}

// Get all products
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
}) {
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== ""
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const foundProduct = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!foundProduct) throw new Error("Product not found");

    // Delete images from UploadThing if they exist
    if (foundProduct.images && foundProduct.images.length > 0) {
      const utapi = new UTApi();

      // Extract file keys from URLs
      const fileKeys = foundProduct.images
        .filter((imageUrl: string) => imageUrl.includes("utfs.io"))
        .map((imageUrl: string) => {
          // Extract the file key from the URL
          const urlParts = imageUrl.split("/");
          return urlParts[urlParts.length - 1];
        });

      // Delete files from UploadThing only if we have valid file keys
      if (fileKeys.length > 0) {
        try {
          await utapi.deleteFiles(fileKeys);
        } catch (uploadError) {
          console.error(
            "Failed to delete files from UploadThing:",
            uploadError,
          );
          // Continue with product deletion even if file deletion fails
        }
      }
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}

// Create a product
export async function createProduct(data: CreateProduct) {
  try {
    // validate the product
    const product = insertProductSchema.parse(data);

    await prisma.product.create({
      data: product,
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}

// Update a product
export async function updateProduct(data: UpdateProduct) {
  try {
    const product = updateProductSchema.parse(data);

    const foundProduct = await prisma.product.findFirst({
      where: {
        id: product.id,
      },
    });

    if (!foundProduct) throw new Error("Product not found");

    // Delete old images from UploadThing if images are being updated
    if (
      foundProduct.images &&
      foundProduct.images.length > 0 &&
      product.images
    ) {
      const utapi = new UTApi();

      // Find images that are in the old product but not in the new one
      const oldImageUrls = foundProduct.images.filter(
        (imageUrl: string) =>
          imageUrl.includes("utfs.io") && !product.images.includes(imageUrl),
      );

      if (oldImageUrls.length > 0) {
        const fileKeys = oldImageUrls.map((imageUrl: string) => {
          const urlParts = imageUrl.split("/");
          return urlParts[urlParts.length - 1];
        });

        try {
          await utapi.deleteFiles(fileKeys);
        } catch (uploadError) {
          console.error(
            "Failed to delete old files from UploadThing:",
            uploadError,
          );
          // Continue with product update even if file deletion fails
        }
      }
    }

    // update the product
    await prisma.product.update({
      where: {
        id: product.id,
      },
      data: product,
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}

// Get all categories
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ["category"],
    _count: true,
  });

  return data;
}

// Get featured products
export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  return convertToPlainObject(data);
}
