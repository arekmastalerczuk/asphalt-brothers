import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductPrice from "@/components/shared/product/ProductPrice";
import ProductImages from "@/components/shared/product/ProductImages";
import AddToCart from "@/components/shared/product/AddToCart";
import { getMyCart } from "@/lib/actions/cart.actions";
import { FaStar } from "react-icons/fa";
import { auth } from "@/auth";
import ReviewList from "./ReviewList";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const ProductDetails = async ({ params }: Props) => {
  const session = await auth();
  const userId = session?.user?.id;

  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();
  const {
    id,
    name,
    brand,
    category,
    description,
    images,
    numReviews,
    price,
    rating,
    stock,
  } = product;

  const cart = await getMyCart();

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* IMAGES */}
          <div className="col-span-2">
            <ProductImages images={images} name={name} />
          </div>
          {/* DETAILS */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {brand} {category}
              </p>
              <h1 className="h3-bold">{name}</h1>
              <p className="flex items-center gap-x-1">
                {rating} <FaStar className="size-4" /> of {numReviews} Reviews
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ProductPrice
                  value={Number(price)}
                  className="w-24 rounded-full bg-green-100 px-4 py-2 text-green-700"
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="font-semibold">Description:</p>
              <p>{description}</p>
            </div>
          </div>
          {/* ACTION */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between">
                  <p>Price</p>
                  <ProductPrice value={Number(price)} />
                </div>
                <div className="mb-2 flex justify-between">
                  <p>Status</p>
                  {stock > 0 ? (
                    <Badge variant="outline" className="capitalize">
                      in stock
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="capitalize">
                      out of stock
                    </Badge>
                  )}
                </div>
                {stock > 0 && (
                  <div className="flex-center mt-8">
                    <AddToCart
                      item={{
                        productId: id,
                        name,
                        slug,
                        quantity: 1,
                        image: images[0],
                        price,
                      }}
                      cart={cart}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="h2-bold my-4">Customer Reviews</h2>
        <ReviewList userId={userId || ""} productId={id} productSlug={slug} />
      </section>
    </>
  );
};
export default ProductDetails;
