"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PencilIcon, PlusCircle, VideoIcon } from "lucide-react";
import { MdClose } from "react-icons/md";
import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/flie-upload";
import MuxPlayer from "@mux/mux-player-react";

interface ChapterVideoFormPops {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormPops) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter Video uploaded!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
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
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && (
            <>
              <MdClose className="h-5 w-5 mr-2" />
              Cancel
            </>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an Video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Change Video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex justify-center items-center h-60 bg-slate-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-slate-600" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 overflow-hidden">
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
              className="aspect-video"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endPoint="videoChapter"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            <p>Upload chapter video</p>
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
};
