"use client";

import { useState } from "react";
import { Review } from "@/types";
import Link from "next/link";
import ReviewForm from "./ReviewForm";

type Props = {
  userId: string;
  productId: string;
  productSlug: string;
};

const ReviewList = ({ userId, productId, productSlug }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const reload = () => {
    console.log("review submitted");
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
      <div className="flex flex-col gap-4">{/* Reviews */}</div>
    </div>
  );
};
export default ReviewList;
