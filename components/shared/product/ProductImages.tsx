"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  name: string;
};

const ProductImages = ({ images, name }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(images);

  return (
    <div className="space-y-4">
      <Image
        src={images[currentIndex]}
        alt={name}
        width={500}
        height={500}
        className="min-h-[300px] object-cover object-center"
        priority
      />
      <div className="flex gap-x-2">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className={cn(
                "cursor-pointer rounded-md border p-4 hover:border-orange-600",
                index === currentIndex && "border-orange-600",
              )}
            >
              <Image
                src={image}
                alt="product image"
                width={100}
                height={100}
                onClick={() => setCurrentIndex(index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductImages;
