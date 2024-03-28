"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import React, { useEffect, useState } from "react";

import { ActionDialog } from "@/components/action-dialog";
import { Course } from "@prisma/client";

interface AlertDialogModalProps {
  isOpen: boolean;
  data: Course,
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertDialogModal: React.FC<AlertDialogModalProps> = ({
  isOpen,
  onClose,
  data,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className="bg-red-500 hover:bg-red-400"
          disabled={loading}
        >
          Continue
        </AlertDialogAction>
      </div>
  );
};
