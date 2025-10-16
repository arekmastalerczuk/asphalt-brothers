import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CartTableItem from "./CartTableItem";
import { Cart } from "@/types";

type Props = {
  cart: Cart;
};

const CartTableItems = ({ cart }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.items.map((item) => (
          <CartTableItem key={item.productId} item={item} />
        ))}
      </TableBody>
    </Table>
  );
};
export default CartTableItems;
