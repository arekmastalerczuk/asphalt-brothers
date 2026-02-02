"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const AdminSearch = () => {
  const pathname = usePathname();
  const formActionUrl = pathname.includes("/admin/products")
    ? "/admin/products"
    : pathname.includes("/admin/orders")
      ? "/admin/orders"
      : "/admin/users";

  const searchParams = useSearchParams();
  const [queryValue, setQueryValue] = useState(searchParams.get("query") || "");

  useEffect(() => {
    setQueryValue(searchParams.get("query") || "");
  }, [searchParams]);

  return (
    <form action={formActionUrl} method="GET">
      <Input
        type="search"
        name="query"
        placeholder="Search..."
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className="w-[100px] md:w-[200px] lg:w-[300px]"
      />
      <button type="submit" className="sr-only">
        Search
      </button>
    </form>
  );
};
export default AdminSearch;
