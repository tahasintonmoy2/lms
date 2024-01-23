"use client";
import { AlertDialogModal } from "@/components/models/alert-dialog-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getError } from "@/lib/get-error-message";
import { Course } from "@prisma/client";
import axios from "axios";
import { Copy, Edit, MoreVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface CellActionProps {
  data: Course;
  courseId: string;
}

const CellAction: React.FC<CellActionProps> = ({
 data,
 courseId
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const promise = () => new Promise((resolve) => setTimeout(resolve, 900));

  const url = window.location.origin;

  const baseUrl = `${url}/courses/${data.id}`;

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id),
      toast.success("Course ID Copy to clipboard");
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.promise(promise, {
        loading: "Please wait few minutes",
        success: () => {
          return "Course deleted";
        },
      });
      router.refresh();
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertDialogModal
        data={data}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-8 w-8 p-0 focus-visible:ring-transparent"
            variant="ghost"
          >
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-xl">
          <DropdownMenuItem onClick={() => onCopy(baseUrl)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/teacher/courses/${courseId}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
