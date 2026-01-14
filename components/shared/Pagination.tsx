"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { createUrlQuery } from "@/lib/utils";

type Props = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (btnType: "prev" | "next") => {
    const pageValue = btnType === "prev" ? Number(page) - 1 : Number(page) + 1;

    const newUrl = createUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div className="mt-4 flex gap-2">
      <Button
        variant="outline"
        size="lg"
        className="w-28"
        disabled={Number(page) <= 1}
        onClick={() => handleClick("prev")}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-28"
        disabled={Number(page) >= totalPages}
        onClick={() => handleClick("next")}
      >
        Next
      </Button>
    </div>
  );
};
export default Pagination;
