"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getError } from "@/lib/get-error-message";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { Loader, PlusCircleIcon } from "lucide-react";
import { MdClose } from "react-icons/md";
import { toast } from "sonner";
import { ChaptersList } from "./chapters-list";

interface ChaptersFormPops {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChaptersForm = ({ 
  initialData,
  courseId
}: ChaptersFormPops) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const toggleCreating = () => setIsCreating((current) => !current);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created!");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error(getError(error));
      console.log(error);
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      router.refresh();
    } catch (error) {
      toast.error(getError(error));
      router.refresh();
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="mt-6 border bg-slate-100 relative rounded-md p-4">
      {isUpdating && (
        <div className="absolute w-full h-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course Chapters
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>
              <MdClose className="h-5 w-5 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add an chapters
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="focus-visible:ring-transparent focus:outline-none"
                        placeholder="c.g 'Introduction to the course...'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button 
              disabled={!isValid || isSubmitting} 
              type="submit"
            >
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-3",
            !initialData.chapters.length && "text-slate-400"
          )}
        >
          {!initialData.chapters.length && "No chapters"}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};
