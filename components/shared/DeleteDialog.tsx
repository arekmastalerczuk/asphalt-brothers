"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

type Props = {
  id: string;
  action: (id: string) => Promise<{ success: boolean; message: string }>;
};

const DeleteDialog = ({ id, action }: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteClick = () => {
    startTransition(async () => {
      const result = await action(id);
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          title="Delete"
          variant="destructive"
          className="ml-2 cursor-pointer"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete an order
            from server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteClick}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteDialog;
