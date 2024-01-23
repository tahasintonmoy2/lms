"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface ShareDialogProps {
  children: React.ReactNode;
}

export const ShareDialog = ({
  children
}: ShareDialogProps) => {
  const params = useParams();
  const [isCopy, setIsCopy] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const url = window.location.origin;

  const baseUrl = `${url}/courses/${params.courseId}/chapters/${params.chapterId}`;

  const onCopy = () => {
    window.navigator.clipboard.writeText(baseUrl);
    setIsCopy(true);

    toast("Course link copy to clipboard");

    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };

  const copyLabel = isCopy ? "Copied" : "Copy";

  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
          </DialogHeader>
          <div className="flex items-center bg-[#f2f2f2] border border-slate-300 py-2 px-2 rounded-md">
            <input
              className="bg-transparent w-72 pl-1"
              placeholder="Share URL"
              value={`${baseUrl}`}
              readOnly
            />
            <button
              onClick={onCopy}
              className="ml-5 bg-primary rounded-full text-white py-1 px-2"
            >
              {copyLabel}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
