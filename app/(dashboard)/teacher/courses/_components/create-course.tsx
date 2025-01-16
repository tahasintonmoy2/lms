"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CreateNewCourseForm } from "@/components/create-course-form";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

type CreateCourseType = {
  children: React.ReactNode;
};

export const CreateCourse = ({ 
  children
}: CreateCourseType) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="lg:flex lg:items-center">
          <DialogTitle>Create new course</DialogTitle>
          <DialogDescription>
            What would you like to name your course? <br />
            Don&apos;t worry, you can change this later.
          </DialogDescription>
        </DialogHeader>
        <CreateNewCourseForm
          onClick={
            <>
              <DialogClose>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </>
          }
        />
      </DialogContent>
    </Dialog>
  );
};
