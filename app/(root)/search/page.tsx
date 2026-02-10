import Pagination from "@/components/shared/Pagination";
import ProductCard from "@/components/shared/product/ProductCard";
import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/product.actions";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Search",
  description: "Search products",
};

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
  params: Promise<{
    pathname: string;
  }>;
};

const PRICES_RANGE = [
  { name: "$1 - $50", value: "1-50" },
  { name: "$51 - $100", value: "51-100" },
  { name: "$101 - $200", value: "101-200" },
  { name: "$201 - $500", value: "201-500" },
  { name: "$501 - $1000", value: "501-1000" },
  { name: "$1001+", value: "1001+" },
];

const RATINGS = [4, 3, 2, 1];

const SORT_ORDERS = ["newest", "lowest", "highest", "rating"];

const SearchPage = async ({ searchParams }: Props) => {
  const {
    q = "",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await searchParams;

  // Construct filter url
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, sort, price, rating, page };
    if (c) {
      params.category = c;
      params.page = "1"; // Reset to page 1 when changing category
    }
    if (s) {
      params.sort = s;
      params.page = "1"; // Reset to page 1 when changing sort
    }
    if (p) {
      params.price = p;
      params.page = "1"; // Reset to page 1 when changing price
    }
    if (r) {
      params.rating = r;
      params.page = "1"; // Reset to page 1 when changing rating
    }
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
    limit: 9,
  });

  const categories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        {/* Category Links */}
        <div className="mb-1 text-lg">Category</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ c: "all" })}
                className={`${(category === "all" || category === "") && "font-bold"} text-sm`}
              >
                Any
              </Link>
            </li>
            {categories.map((item) => (
              <li key={item.category}>
                <Link
                  href={getFilterUrl({ c: item.category })}
                  className={`${category === item.category && "font-bold"} text-sm`}
                >
                  {item.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Price Links */}
        <div className="mt-6 mb-1 text-lg">Price</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ p: "all" })}
                className={`${price === "all" && "font-bold"} text-sm`}
              >
                Any
              </Link>
            </li>
            {PRICES_RANGE.map((item) => (
              <li key={item.name}>
                <Link
                  href={getFilterUrl({ p: item.value })}
                  className={`${item.value === price && "font-bold"} text-sm`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Rating Links */}
        <div className="mt-6 mb-1 text-lg">Rating</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ r: "all" })}
                className={`${rating === "all" && "font-bold"} text-sm`}
              >
                Any
              </Link>
            </li>
            {RATINGS.map((item) => (
              <li key={item}>
                <Link
                  href={getFilterUrl({ r: item.toString() })}
                  className={`${item.toString() === rating && "font-bold"} flex items-center gap-x-1 text-sm`}
                >
                  {item}+{" "}
                  {Array.from({ length: item }).map((_, i) => {
                    return item === Number(rating) ? (
                      <FaStar key={i} className="size-4" />
                    ) : (
                      <FaRegStar key={i} className="size-4" />
                    );
                  })}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="space-y-4 md:col-span-4">
        <div className="flex flex-col">
          <div className="flex-between flex-col md:flex-row">
            {/* Show selected filters */}
            <div className="flex items-center gap-x-4 text-sm">
              {q !== "all" && q !== "" && (
                <div>
                  <span className="font-bold">Query: </span>
                  <span>{q}</span>
                </div>
              )}
              {category !== "all" && (
                <div>
                  <span className="font-bold">Category: </span>
                  <span>{category}</span>
                </div>
              )}
              {price !== "all" && (
                <div>
                  <span className="font-bold">Price: </span>
                  <span>${price}</span>
                </div>
              )}
              {rating !== "all" && (
                <div>
                  <span className="font-bold">Rating: </span>
                  <span className="inline-flex items-center gap-x-1">
                    {rating}+
                    <FaStar className="size-4" />
                  </span>
                </div>
              )}
              {(q !== "all" && q !== "") ||
              category !== "all" ||
              price !== "all" ||
              rating !== "all" ? (
                <Button variant="outline" className="ml-2" asChild>
                  <Link href="/search">Clear</Link>
                </Button>
              ) : null}
            </div>
            {/* Sorting */}
            <div className="flex items-center gap-x-2">
              <span className="text-sm">Sort by: </span>
              <ul className="flex items-center gap-x-2">
                {SORT_ORDERS.map((item) => (
                  <li key={item}>
                    <Link
                      href={getFilterUrl({ s: item })}
                      className={`${sort === item && "font-bold"} text-sm`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-x-2">
            <h1 className="h2-bold">Search results</h1>
            {products.dataCount > 0 && (
              <span className="text-sm italic">
                ({products.dataCount}) products found
              </span>
            )}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {products.data.length === 0 && <p>No products found.</p>}
          {products.data.length > 0 &&
            products.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        {products &&
          typeof products.totalPages === "number" &&
          products.totalPages > 1 && (
            <Pagination
              page={Number(page) || 1}
              totalPages={products.totalPages}
            />
          )}
      </div>
    </div>
  );
};
export default SearchPage;
