"use client";
import { ConfirmModal } from "@/components/models/confirm-modal";
import { Button } from "@/components/ui/button";
import { getError } from "@/lib/get-error-message";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface ChapterActionsProps {
  disabled: boolean;
  isPublished: boolean;
  courseId: string;
  chapterId: string;
}

const ChapterActions = ({
  disabled,
  isPublished,
  courseId,
  chapterId,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoadig, setIsLoading] = useState(false);

  const onPublish = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast.success("Chapter unpublished");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success("Chapter published");
      }

      router.refresh();
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted");
      router.push(`/teacher/courses/${courseId}`);
      router.refresh();
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onPublish}
        disabled={disabled || isLoadig}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button disabled={isLoadig} variant="destructive" size="sm">
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
