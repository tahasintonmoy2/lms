"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CreateNewCourseForm } from "@/components/create-course-form";

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
