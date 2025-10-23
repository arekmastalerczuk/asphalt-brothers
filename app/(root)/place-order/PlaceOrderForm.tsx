"use client";

import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/order.actions";
import React from "react";

const PlaceOrderForm = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await createOrder();

    if (res.redirectTo) router.push(res.redirectTo);
  };

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? (
          <Loader className="mr-2 size-4 animate-spin" />
        ) : (
          <Check className="mr-2 size-4" />
        )}
        Place Order
      </Button>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PlaceOrderButton />
    </form>
  );
};
export default PlaceOrderForm;
