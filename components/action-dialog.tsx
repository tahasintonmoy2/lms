"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface ActionDialogProps {
  data: Course;
  onClose: () => void;
  isOpen: boolean;
  onConfirm: () => void;
}

export const ActionDialog = ({
  data,
  onConfirm,
  onClose,
  isOpen,
}: ActionDialogProps) => {
  const formSchema = z.object({
    title: z.string().min(3, {
      message: `Please type "${data.title}" to delete`,
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting } = form.formState;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription className="font-semibold">
            To delete, just type{" "}
            <span className="text-blue-600">"{data.title}"</span> in the below
            box. This action cannot be undo.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onConfirm)}
              onReset={() => form.reset()}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormControl>
                        <Input disabled={isSubmitting} {...field} />
                      </FormControl>
                      <FormMessage className="font-semibold text-red-600" />
                    </FormItem>
                    <DialogFooter className="mt-4">
                      <>
                        <DialogClose
                          onClick={() => form.reset()}
                          className="mr-3 hover:bg-slate-200 px-3 rounded-md transition"
                        >
                          Cancel
                        </DialogClose>
                        <Button
                          className="bg-red-500 hover:bg-red-400"
                          disabled={field.value !== data.title || isSubmitting}
                        >
                          Delete
                        </Button>
                      </>
                    </DialogFooter>
                  </>
                )}
              />
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
