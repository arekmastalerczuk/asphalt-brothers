import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { MINIMUM_FOR_FREE_SHIPPING_PRICE } from "@/lib/constants";

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className="grid gap-4 p-4 md:grid-cols-4">
          <div className="flex flex-col items-center justify-start space-y-2">
            <ShoppingBag />
            <p className="text-sm font-bold">Free Shipping</p>
            <p className="text-muted-foreground text-center text-sm">
              Free shipping on orders above ${MINIMUM_FOR_FREE_SHIPPING_PRICE}
            </p>
          </div>
          <div className="flex flex-col items-center justify-start space-y-2">
            <DollarSign />
            <p className="text-sm font-bold">Money Back Guarantee</p>
            <p className="text-muted-foreground text-center text-sm">
              30-day money back guarantee
            </p>
          </div>
          <div className="flex flex-col items-center justify-start space-y-2">
            <WalletCards />
            <p className="text-sm font-bold">Flexible payment</p>
            <p className="text-muted-foreground text-center text-sm">
              Pay with credit card, PayPal or CashOnDelivery
            </p>
          </div>
          <div className="flex flex-col items-center justify-start space-y-2">
            <Headset />
            <p className="text-sm font-bold">24/7 Support</p>
            <p className="text-muted-foreground text-center text-sm">
              Get support ad any time
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default IconBoxes;
