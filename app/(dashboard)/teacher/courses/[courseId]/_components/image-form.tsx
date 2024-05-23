"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ImageIcon, PencilIcon, PlusCircle } from "lucide-react";
import { MdClose } from "react-icons/md";
import { Course } from "@prisma/client";
import { FileUpload } from "@/components/flie-upload";
import { getError } from "@/lib/get-error-message";

interface ImageFormPops {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imgUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({
  initialData,
  courseId
}: ImageFormPops) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Image uploaded!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && (
            <>
              <MdClose className="h-5 w-5 mr-2" />
              Cancel
            </>
          )}
          {!isEditing && !initialData.imgUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an Image
            </>
          )}
          {!isEditing && initialData.imgUrl && (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Change Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imgUrl ? (
          <div className="flex justify-center items-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-700" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              src={initialData.imgUrl}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endPoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imgUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            <p>16:9 aspect ratio recommended</p>
          </div>
        </div>
      )}
    </div>
  );
};
