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
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PencilIcon } from "lucide-react";
import {MdClose} from "react-icons/md"
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { getError } from "@/lib/get-error-message";

interface PriceFormPops {
  initialData: Course,
  courseId: string
}

const formSchema = z.object({
  price: z.coerce.number(),
});

export const PriceForm = ({
  initialData,
  courseId,
}: PriceFormPops) => {
  const [isEditing, setIsEditing] = useState(false)
  const router =  useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });

  const toggleEdit = () => setIsEditing((current)=> !current)

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Price updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error(getError(error));
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Price
        <Button variant="ghost" onClick={toggleEdit}>
        {isEditing ? (
            <>
            <MdClose className="h-5 w-5 mr-2"/>
            Cancel
            </>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.price && "text-slate-400"
        )}>
          {initialData.price ? 
            formatPrice(initialData.price)
           :"No price set"
          }
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
               name="price"
               render={({ field }) =>{
                return <FormItem>
                   <FormControl>
                     <Input
                       type="number"
                       step={0}
                       disabled={isSubmitting}
                       className="focus-visible:ring-transparent focus:outline-none"
                       placeholder="Set price of your course..."
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

