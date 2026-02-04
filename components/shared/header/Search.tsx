import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/product.actions";
import { SearchIcon } from "lucide-react";

const Search = async () => {
  const categories = await getAllCategories();

  return (
    <form action="/search" method="GET">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Select name="category" defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" key="all">
              All
            </SelectItem>
            {categories.map((item) => (
              <SelectItem key={item.category} value={item.category}>
                {item.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name="q"
          type="text"
          placeholder="Search..."
          className="md:w-[100px] lg:w-[300px]"
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
        <button type="submit" className="sr-only">
          Search
        </button>
      </div>
    </form>
  );
};
export default Search;
