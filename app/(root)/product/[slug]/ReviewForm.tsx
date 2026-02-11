"use client";

import { useState } from "react";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createReviewSchema } from "@/lib/validators";
import { reviewFormDefaultValues } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAndUpdateReview } from "@/lib/actions/review.actions";

type Props = {
  userId: string;
  productId: string;
  onReviewSubmitted?: () => void;
};

const ReviewForm = ({ userId, productId, onReviewSubmitted }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createReviewSchema>>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: reviewFormDefaultValues,
  });

  // Open form handler
  const handleOpenForm = () => {
    form.setValue("productId", productId);
    form.setValue("userId", userId);
    setOpen(true);
  };

  // Submit form handler
  const onSubmit: SubmitHandler<z.infer<typeof createReviewSchema>> = async (
    values,
  ) => {
    const res = await createAndUpdateReview({ ...values, productId });

    if (!res.success) {
      toast.error(res.message);
    }

    setOpen(false);
    onReviewSubmitted?.();
    toast.success("Review submitted successfully");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={handleOpenForm}>Write a review</Button>
      <DialogContent className="max-w-[425px]">
        <Form {...form}>
          <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Write a review</DialogTitle>
              <DialogDescription>
                Share your experience with this product.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof createReviewSchema>,
                    "title"
                  >;
                }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof createReviewSchema>,
                    "description"
                  >;
                }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write description..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof createReviewSchema>,
                    "rating"
                  >;
                }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <SelectItem key={idx} value={(idx + 1).toString()}>
                            {idx + 1}{" "}
                            {(() => {
                              const stars = [];
                              for (let i = 1; i <= idx + 1; i++) {
                                stars.push(<Star key={i} className="size-4" />);
                              }
                              return stars;
                            })()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="mt-4 w-full"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Submitting..."
                  : "Submit review"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default ReviewForm;
