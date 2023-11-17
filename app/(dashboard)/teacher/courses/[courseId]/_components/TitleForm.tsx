"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {useState} from 'react';
import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PencilIcon } from "lucide-react";
import { MdClose } from "react-icons/md";

interface TitleFormPops {
  initialData:{
    title: string
  },
  courseId: string
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const TitleForm = ({
  initialData,
  courseId,
}: TitleFormPops) => {
  const [isEditing, setIsEditing] = useState(false)
  const router =  useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const toggleEdit = () => setIsEditing((current)=> !current)

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Title has updated!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Title
        <Button variant="ghost" onClick={toggleEdit}>
        {isEditing ? (
            <>
            <MdClose className="h-5 w-5 mr-2"/>
            Cancel
            </>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="mt-2">{initialData.title}</p>
      )}
      {isEditing && (
        <Form {...form}>
            <form 
             onSubmit={form.handleSubmit(onSubmit)}
             className="space-y-4 mt-4"
            >
              <FormField
               control={form.control}
               name="title"
               render={({ field }) =>{
                return <FormItem>
                   <FormControl>
                     <Input
                       disabled={isSubmitting}
                       className="focus-visible:ring-transparent focus:outline-none"
                       placeholder="c.g 'Advanced iOS Development'"
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

export default TitleForm