import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  current: number;
};

const CheckoutSteps = ({ current = 0 }: Props) => {
  const steps = [
    "User Login",
    "Shipping Address",
    "Payment Method",
    "Place Order",
  ];

  return (
    <div className="flex-between mb-10 flex-col space-y-2 space-x-2 md:flex-row">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={cn(
              "w-56 rounded-full p-2 text-center text-sm",
              index === current && "bg-secondary",
            )}
          >
            {step}
          </div>
          {step !== steps[steps.length - 1] && (
            <hr className="mx-2 w-16 border-t border-gray-300" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
export default CheckoutSteps;
