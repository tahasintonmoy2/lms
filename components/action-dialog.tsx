"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Course } from "@prisma/client";
import React from "react";

interface ActionDialogProps {
  description?: string;
  data: Course;
  onClose: () => void;
  isOpen: boolean;
  children?: React.ReactNode;
}

export const ActionDialog = ({
  data,
  onClose,
  isOpen,
  children,
}: ActionDialogProps) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }

    if (isOpen) {
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-blue-600">
            Are you sure you want to permanently delete '{data.title}'?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            course and remove your course data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>{children}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
