import { cn } from "@/lib/utils";

type Props = {
  value: number;
  className?: string;
};

const ProductPrice = ({ value, className }: Props) => {
  // Ensure two decimal places
  const stringValue = value.toFixed(2);

  // Get the int/float
  const [intValue, floatValue] = stringValue.split(".");
  return (
    <p className={cn("text-2xl font-medium", className)}>
      <span className="align-super text-xs">$</span>
      <span className="px-0.5">{intValue}</span>
      <span className="align-super text-xs">.{floatValue}</span>
    </p>
  );
};
export default ProductPrice;
