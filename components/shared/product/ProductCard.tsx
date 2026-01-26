import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./ProductPrice";
import { type Product } from "@/types";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { name, slug, images, brand, rating, price, stock } = product;
  return (
    <Card className="flex w-full max-w-sm flex-col justify-between">
      <CardHeader className="place-items-center p-0">
        <Link href={`/product/${slug}`}>
          <Image
            src={images[0]}
            alt={name}
            width={300}
            height={300}
            className="h-full w-full object-contain object-center"
            priority
          />
        </Link>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        <p className="text-xs">{brand}</p>
        <Link href={`/product/${slug}`}>
          <h2 className="text-sm font-bold">{name}</h2>
        </Link>
        <div className="flex-between">
          <p>{rating} stars</p>
          {stock > 0 ? (
            <ProductPrice value={Number(price)} />
          ) : (
            <p className="text-destructive">Out of stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
