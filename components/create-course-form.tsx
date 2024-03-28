"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getError } from "@/lib/get-error-message";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Name is required",
  }),
});

type CreateCourseType = {
  onClick: React.ReactNode;
};

export const CreateNewCourseForm = ({ onClick }: CreateCourseType) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course created");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      className="focus-visible:ring-transparent focus:outline-none w-96"
                      placeholder="c.g 'Advanced iOS Development'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-semibold" />
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex items-center">
              <div className="lg:ml-[13rem] mt-3 ml-36">{onClick}</div>
              <Button
                className="ml-3 mt-3"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Contiune
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
