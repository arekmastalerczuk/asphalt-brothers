"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Review } from "@/types";
import ReviewForm from "./ReviewForm";
import { getAllReviewsForProduct } from "@/lib/actions/review.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, UserIcon } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Rating from "@/components/shared/product/Rating";

type Props = {
  userId: string;
  productId: string;
  productSlug: string;
};

const ReviewList = ({ userId, productId, productSlug }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      const res = await getAllReviewsForProduct({ productId });
      setReviews(res.data);
    };
    loadReviews();
  }, [productId]);

  // Reload reviews after created or updated
  const reload = async () => {
    const res = await getAllReviewsForProduct({ productId });
    setReviews([...res.data]);
  };

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {userId ? (
        <ReviewForm
          userId={userId}
          productId={productId}
          onReviewSubmitted={reload}
        />
      ) : (
        <div>
          <p>
            Please{" "}
            <Link
              href={`/sign-in?callbackUrl=/product/${productSlug}`}
              className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
            >
              sign in
            </Link>{" "}
            to write a review.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex-between">
                <CardTitle>{review.title}</CardTitle>
              </div>
              <CardDescription>{review.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground flex space-x-4 text-sm">
                <Rating value={review.rating} />
                <div className="flex items-center">
                  <UserIcon className="mr-1 size-3" />
                  {review.user?.name || "User"}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 size-3" />
                  {formatDateTime(review.createdAt).dateTime}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ReviewList;
