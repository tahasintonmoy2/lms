"use client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { getError } from "@/lib/get-error-message";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ml-10">
      <Button
        onClick={onClick}
        disabled={isLoading}
        size="sm"
        className="w-[27rem] md:w-auto"
      >
        Enroll ({formatPrice(price)})
      </Button>
    </div>
  );
};
