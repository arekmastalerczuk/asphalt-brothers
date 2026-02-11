"use server";

import z from "zod";
import { createReviewSchema } from "../validators";
import { formatErrors } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

// Create & update review
export async function createAndUpdateReview(
  data: z.infer<typeof createReviewSchema>,
) {
  try {
    const session = await auth();

    if (!session) throw new Error("User is not authenticated");

    // Validate and store review
    const reviewData = createReviewSchema.parse({
      ...data,
      userId: session?.user?.id,
    });

    // Get product that is being reviewed
    const product = await prisma.product.findFirst({
      where: {
        id: reviewData.productId,
      },
    });

    if (!product) throw new Error("Product not found");

    // Check if user already reviewed that product
    const existingReview = await prisma.review.findFirst({
      where: {
        productId: reviewData.productId,
        userId: reviewData.userId,
      },
    });

    await prisma.$transaction(async (tx) => {
      if (existingReview) {
        // Update review
        await tx.review.update({
          where: {
            id: existingReview.id,
          },
          data: {
            title: reviewData.title,
            description: reviewData.description,
            rating: reviewData.rating,
          },
        });
      } else {
        // Create review
        await tx.review.create({
          data: reviewData,
        });
      }

      // Get average rating for this product
      const averageRating = await tx.review.aggregate({
        where: {
          productId: reviewData.productId,
        },
        _avg: {
          rating: true,
        },
      });

      // Get number of reviews for this product
      const numberOfReviews = await tx.review.count({
        where: {
          productId: reviewData.productId,
        },
      });

      // Update the rating and number of reviews in product table
      await tx.product.update({
        where: {
          id: reviewData.productId,
        },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews: numberOfReviews,
        },
      });
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: "Review updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}

// Get all reviews for a product
export async function getAllReviewsForProduct({
  productId,
}: {
  productId: string;
}) {
  const data = await prisma.review.findMany({
    where: {
      productId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { data };
}

// Get a review written by the current user
export async function getReviewByProductId({
  productId,
}: {
  productId: string;
}) {
  const session = await auth();

  if (!session) throw new Error("User is not authenticated");

  const userId = session?.user?.id;

  const productReview = await prisma.review.findFirst({
    where: {
      userId,
      productId,
    },
  });

  return { data: productReview };
}
