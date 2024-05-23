"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ActionHint } from "@/components/action-hint";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { getError } from "@/lib/get-error-message";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { ChevronDown, ChevronUp, PencilIcon } from "lucide-react";
import { MdClose } from "react-icons/md";
import { toast } from "sonner";

interface DescriptionFormPops {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

const DescriptionForm = ({ initialData, courseId }: DescriptionFormPops) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const toggleExpand = () => setIsExpand(!isExpand);

  const toggleEdit = () => setIsEditing((current) => !current);

  const expandHint = isExpand ? "Collapse" : "Expand";

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course description updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center">
        Course Description
        <div
          className={cn(
            "ml-32 lg:ml-[11.6rem]",
            !initialData.description && !isEditing && "ml-12 lg:ml-40",
            initialData.description && isEditing && "ml-16 lg:ml-32",
            !initialData.description && isEditing && "ml-12 lg:ml-28"
          )}
        >
          <button
            className={cn(
              "inline-flex items-center",
              !isExpand && "ml-0",
              isEditing && "ml-8 lg:ml-24"
            )}
            onClick={toggleEdit}
          >
            {isEditing ? (
              <>
                <MdClose className="h-5 w-5 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <PencilIcon className="h-4 w-4 mr-2" />
                <p
                  className={cn(
                    "text-sm",
                    !initialData.description && "block",
                    initialData.description && "hidden md:block"
                  )}
                >
                  Edit description
                </p>
              </>
            )}
          </button>
          {initialData.description && initialData.description.length > 65 && (
            <ActionHint description={expandHint} side="top" sideOffset={10}>
              <button
                onClick={toggleExpand}
                className={cn("ml-5", isEditing && "hidden")}
              >
                {isExpand ? (
                  <>
                    <ChevronUp className="h-5 w-5 mr-2" />
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-5 w-5 mr-2" />
                  </>
                )}
              </button>
            </ActionHint>
          )}
        </div>
      </div>
      {isExpand ? (
        <p className={cn("text-sm mt-2 tracking-wide", isEditing && "hidden")}>
          {initialData.description}
        </p>
      ) : (
        <p
          className={cn(
            "text-sm mt-2 truncate",
            !initialData.description && "text-slate-400",
            isEditing && "hidden"
          )}
        >
          {initialData.description || "No description"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        className="focus-visible:ring-transparent focus:outline-none h-44 resize-none"
                        placeholder="c.g 'This is Course About...'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default DescriptionForm;
