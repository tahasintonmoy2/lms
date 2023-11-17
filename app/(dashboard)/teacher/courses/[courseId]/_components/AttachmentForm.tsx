"use client"

import { useRouter } from "next/navigation";
import {useState} from 'react';
import axios from "axios";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { File, Loader, PlusCircle } from "lucide-react";
import {MdClose} from "react-icons/md"
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/flie-upload";

interface AttachmentPops {
  initialData: Course & { attachments:Attachment[] },
  courseId: string
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentPops) => {
  const [isEditing, setIsEditing] = useState(false)
  const router =  useRouter()
  const toggleEdit = () => setIsEditing((current)=> !current)

  const [deletingId, setDeletingId] = useState<string | null>(null)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course attachment has updated!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  }

  const onDeleteAttachment =async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment Deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachment
        <Button variant="ghost" onClick={toggleEdit}>
        {isEditing &&  (
            <>
            <MdClose className="h-5 w-5 mr-2"/>
            Cancel
            </>
          )}
          {!isEditing && (
              <>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Add an File
              </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-400">
              No attachment found yet
            </p>
          )} 
          {initialData.attachments.length > 0 && (
              <div className="space-y-2">
                 {initialData.attachments.map((attachment) => (
                   <div
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-blue-600 rounded-md"
                   >
                      <File className="h-6 w-6 mr-2 flex-shrink-0"/>
                      <p className="line-clamp-1">
                        {attachment.name}
                      </p>
                      {deletingId === attachment.id && (
                        <div>
                          <Loader className="h-5 w-5 animate-spin"/>
                        </div>
                      )}                      
                      {deletingId !== attachment.id && (
                        <div
                          role="button"
                          onClick={()=> onDeleteAttachment(attachment.id)}
                        >
                          <MdClose className="h-5 w-5 mr-2"/>
                        </div>
                      )}
                   </div>
                 ))}
              </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload 
            endPoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            <p>
              Add anything your students might need to complete the course.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}