"use client";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";

interface Props {
  data: Product[];
}

const ProductCarousel = ({ data }: Props) => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
      className="mb-12 w-full"
    >
      <CarouselContent>
        {data.map((product: Product) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div className="relative mx-auto">
                <Image
                  src={`/images/${product.banner}`}
                  alt={product.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-auto w-full object-contain"
                />
                <div className="absolute inset-0 flex items-end justify-start">
                  <h2 className="rounded-tr-2xl bg-white/80 px-6 py-2 text-xl font-medium italic dark:bg-gray-700/80 dark:text-white">
                    {product.name}
                  </h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default ProductCarousel;
