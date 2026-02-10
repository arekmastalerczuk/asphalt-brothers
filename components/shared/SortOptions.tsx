"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ClockArrowDown,
  DollarSign,
  MoveDown,
  MoveUp,
  Star,
} from "lucide-react";

const SORT_ORDERS = [
  {
    value: "newest",
    element: (
      <div className="flex items-center gap-1">
        <ClockArrowDown />
        <span>Newest</span>
      </div>
    ),
  },
  {
    value: "lowest",
    element: (
      <div className="flex items-center gap-1">
        <DollarSign className="h-4 w-4" />
        <MoveUp />
        <span>Lowest</span>
      </div>
    ),
  },
  {
    value: "highest",
    element: (
      <div className="flex items-center gap-1">
        <DollarSign className="h-4 w-4" />
        <MoveDown />
        <span>Highest</span>
      </div>
    ),
  },
  {
    value: "rating",
    element: (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4" />
        <MoveDown />
        <span>Rating</span>
      </div>
    ),
  },
];

type Props = {
  sort: string;
};

const SortOptions = ({ sort }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-x-2">
      <span className="text-sm">Sort by: </span>
      <Select value={sort} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_ORDERS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.element}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortOptions;
