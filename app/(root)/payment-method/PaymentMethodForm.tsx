"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { PaymentMethod } from "@/types";
import { paymentMethodSchema } from "@/lib/validators";
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateUserPaymentMethod } from "@/lib/actions/user.actions";
import { toast } from "sonner";

type Props = {
  preferredPaymentMethod: string | null;
};

const PaymentMethodForm = ({ preferredPaymentMethod }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<PaymentMethod>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const onSubmit = async (values: PaymentMethod) => {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(values);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      router.push("/place-order");
    });
  };

  return (
    <>
      <div className="mx-auto max-w-md space-y-4">
        <h1 className="h2-bold mt-4">Payment Method</h1>
        <p className="text-muted-foreground text-sm">
          Select your preferred payment method.
        </p>
        <Form {...form}>
          <form
            method="post"
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <FormField
                control={form.control}
                name="type"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<PaymentMethod, "type">;
                }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex flex-col space-y-2"
                      >
                        {PAYMENT_METHODS.map((method) => (
                          <FormItem
                            key={method}
                            className="flex items-center space-x-3"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={method}
                                checked={field.value === method}
                              />
                            </FormControl>
                            <FormLabel>{method}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  <ArrowRight className="size-4" />
                )}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
export default PaymentMethodForm;
