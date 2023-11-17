"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {useState} from 'react';
import axios from "axios";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PencilIcon } from "lucide-react";
import {MdClose} from "react-icons/md"
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";

interface DescriptionFormPops {
  initialData: Course,
  courseId: string
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

const DescriptionForm = ({
  initialData,
  courseId,
}: DescriptionFormPops) => {
  const [isEditing, setIsEditing] = useState(false)
  const router =  useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const toggleEdit = () => setIsEditing((current)=> !current)

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course has updated!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Description
        <Button variant="ghost" onClick={toggleEdit}>
        {isEditing ? (
            <>
            <MdClose className="h-5 w-5 mr-2"/>
            Cancel
            </>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.description && "text-slate-400"
        )}>
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
               render={({ field }) =>{
                return <FormItem>
                   <FormControl>
                     <Textarea
                       disabled={isSubmitting}
                       className="focus-visible:ring-transparent focus:outline-none"
                       placeholder="c.g 'This is Course About...'"
                       {...field} />
                   </FormControl>
                   <FormMessage/>
                 </FormItem>
               }}
              />
              <div className="flex items-center gap-x-2">
                  <Button
                  disabled={!isValid || isSubmitting}
                  type="submit">
                    Save
                  </Button>
              </div>
            </form>
        </Form>
      )}
    </div>
  )
}

export default DescriptionForm