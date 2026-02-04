import Pagination from "@/components/shared/Pagination";
import ProductCard from "@/components/shared/product/ProductCard";
import { getAllProducts } from "@/lib/actions/product.actions";
import { Metadata } from "next";

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

const SearchPage = async ({ searchParams }: Props) => {
  const {
    q = "",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await searchParams;

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
    limit: 9,
  });

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">{/* TODO: FILTERS */}</div>
      <div className="space-y-4 md:col-span-4">
        <div className="grid gap-4 md:grid-cols-3">
          {products.data.length === 0 && <p>No products found.</p>}
          {products.data.map((product) => (
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
