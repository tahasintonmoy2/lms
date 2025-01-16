"use client";

import axios from "axios";
import React, { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import "@mux/mux-player-react/themes/classic";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  playbackId,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      router.refresh();
    }
  };

  return (
    <div className="relative aspect-video overflow-hidden">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-slate-600">
          <Loader className="h-8 w-8 animate-spin text-secondary" />
          <p className="text-secondary">
            Please wait a few minutes, chapter is loading
          </p>
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-slate-600">
          <Lock className="h-8 w-8 text-secondary" />
          <p className="text-secondary">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          accentColor="#2563eb"
          theme="classic"
          className={cn("aspect-video", !isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          muted
          playbackId={playbackId}
        />
      )}
    </div>
  );
};
